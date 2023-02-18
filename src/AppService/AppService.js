
import { ipcMain as fromRendererProcess, app as electronApp } from 'electron';
import { each, find, reject, contains } from 'underscore';
import { mainWindow } from '../index';
import { loadFromJSONFile, storeToJSONFile, isProductionEnv, encodePathForWindows } from '../Utils';
import { APP_PLATFORM_MANUAL, CUSTOM_PROTOCOL_LOADFILE, RAWG_APIKEY, SHOW_POPIN_NONE, SHOW_POPIN_SCAN } from '../Constants';
import axios from 'axios';
import App from '../Model/App';
import path from 'path';
import slugify from 'slugify';
import child_process from 'child_process';
import log from 'electron-log';

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const glcPathJSONdatabase = path.resolve(glcDir, './glc-games.json');
const appDataDir = electronApp.getPath('userData');
const libraryPathJSONdatabase = path.resolve(appDataDir, (isProductionEnv()? './library.json' : './dev-library.json'));
const configPathJSONdatabase = path.resolve(appDataDir, './config.json');

const loadMetadaFromJSONfile = async () => {
    let installedAppsFromFile = loadFromJSONFile(glcPathJSONdatabase);
    let installedApps = [];

    // we want to translate GLC app format into our format (even if they are almost similar from each other)
    if (typeof installedAppsFromFile.games != undefined) {
        each(installedAppsFromFile.games, item => {

            // (for now) we want ONLY installed apps
            if (item.installed) {               
                let app = new App({
                    id: item.id,
                    title: item.title,
                    icon: item.icon? (CUSTOM_PROTOCOL_LOADFILE + '://' + encodePathForWindows(item.icon)) : '',
                    launch: item.launch,
                    platform: item.platform,
                    installed: item.installed // true for now
                });
                installedApps.push(app);
            }
        });
    }

    return installedApps;
}

const fetchOnlineMetada = async (apps) => {

    const slugifyConf = {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
        locale: 'en',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      };

    try {
        apps = await Promise.all(apps.map(async (app, index) => {

            await new Promise(r => setTimeout(r, index * 500)); // 1 request every 500ms to avoid API timeout

            await axios.get(`https://api.rawg.io/api/games?key=${RAWG_APIKEY}&platforms=4&search_precise=true&search=${app.title}&page_size=5`, {timeout: 5000}).then((resp) => {
                let data = resp.data;
                let titleSlugified = slugify(app.title.replace(/[™©]/g, ""), slugifyConf); // for weird reason the remove option from slugify conf doesn't work... so we remove copyrights by hand
                
                if (data.results && data.results.length > 0) {
                    // we want to iterate on first items because the search engine is not always perfect...
                    for (let i=0; i < data.results.length - 1; i++) {
                        if (data.results[i].slug == titleSlugified || slugify(data.results[i].name, slugifyConf) == titleSlugified || data.results[i].name == app.title) {
                            app = {...app, 'background_image': data.results[i].background_image, 'rawgSlug': data.results[i].slug };
                            break;
                        }
                    }
                }
            }).catch((error) => {
                log.info(error);
            });
    
            return app;
        }));
    } catch (e) {
        log.info('Error fetching remote metadata : ' + e);
    }

    return apps;
}

const loadAppFromFile = () => {
    log.info('loadAppFromFile');
    // Read the library from file and send it to renderer
    mainWindow.webContents.send('getApps', loadLibraryDB());
}

// Launch glc.exe to scan the system for games
const scanForGames = async () => {

    mainWindow.webContents.send('togglePopin', {id: SHOW_POPIN_SCAN});

    let library = loadLibraryDB(); // Read from file

    let glcPath = path.resolve(glcDir, './glc.exe');
    // we might have space in the path and we need to handle it because otherwise, the path is broken
    const rootName = path.parse(glcPath).root; // "C:/"
    glcPath = `${rootName}"${glcPath.replace(rootName, '')}"`
    log.info(glcPath);
    var child = child_process.spawn(glcPath, ['/c /s /q'], {
        cwd: path.resolve(glcDir),
        encoding: 'utf8',
        shell: true
    });
    child.stderr.on('data', (data) => {
        log.info(data.toString().trim());
      });
    child.on('close', async (code) => {
        switch (code) {
            case 0:
                log.info('Gamescan is done. Exit code: ' + code);

                // Add new games to database, remove unstalled games BUT if a games was already detected
                // we use the library from old scan as reference to keep sorting & all changes
                let newLibrary = await loadMetadaFromJSONfile();

                newLibrary = addCustomApps(newLibrary); // add shortcuts like Steam big picture mode
                newLibrary = blackListApps(newLibrary); // reject some app detected we don't want to see
                let tempLibrary = [];
               
                // remove old apps not found in new scan
                each(library, item => {
                    if (item.platform === APP_PLATFORM_MANUAL || find(newLibrary, (newItem) => item.id === newItem.id)) {
                        tempLibrary.push(item);
                    } else {
                        // the item is not found in new library scan so we should remove it
                    }
                });

                // Add new items to the library
                each(newLibrary, item => {
                    let tempItem = find(library, (oldItem) => item.id === oldItem.id);
                    if (!tempItem) { // this is a new item that should be added to the library
                        tempLibrary.push(item);
                    }
                });
                library = tempLibrary;

                library = await fetchOnlineMetada(library);
                
                storeDatabase(library, () => {
                    log.info('Library stored, starting loadAppFromFile');
                    loadAppFromFile();
                    mainWindow.webContents.send('togglePopin', {id: SHOW_POPIN_NONE});
                });
                break;
            default: 
                log.error('error_code: ' + code);
        }
    });
}

const addCustomApps = (library) => {
    // ADD STEAM BIG PICTURE MODE
    // if we can find at least one game with the Steam platform, it must say that Steam big picture mode is available
    if(find(library, (item) => item.platform == 'Steam') && typeof find(library, (item) => item.id == 'steambigpicture') == 'undefined') {
        library.push(new App({
            "id": "steambigpicture",
            "title": "Steam Big Picture ©",
            "launch": "steam://open/bigpicture",
            "platform": APP_PLATFORM_MANUAL}));
    }
    return library;
}

const blackListApps = (library) => {
    return reject(library, (item) => contains(['appmanifest_228980.acf' /* Steamwork commons */], item.id));
}

export const loadLibraryDB = () => {
    return loadFromJSONFile(libraryPathJSONdatabase);
}

export const storeDatabase = (data, callback) => {
    storeToJSONFile(libraryPathJSONdatabase, data, callback);
}

fromRendererProcess.on("storeDatabase", (event, args) => {
    storeDatabase(args);
});

fromRendererProcess.on("getConfig", () => {
    mainWindow.webContents.send('getConfig', loadFromJSONFile(configPathJSONdatabase));
});

fromRendererProcess.on("storeConfig", (event, config) => {
    storeToJSONFile(configPathJSONdatabase, config);
});

fromRendererProcess.on("getApps", (event, args) => {
    loadAppFromFile();
});

fromRendererProcess.on("scanForGames", (event, args) => {
    scanForGames();
});

fromRendererProcess.on("fetchOnlineMetada", async (event, apps) => {
    mainWindow.webContents.send('fetchOnlineMetada', await fetchOnlineMetada(apps));
});