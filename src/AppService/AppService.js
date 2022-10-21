
import { ipcMain as fromRendererProcess } from 'electron';
import { each, find, reject, contains } from 'underscore';
import { mainWindow } from '../index';
import { loadFromJSONFile, storeToJSONFile, isProductionEnv } from '../Utils';
import axios from 'axios';
import { RAWG_APIKEY, SHOW_POPIN_NONE, SHOW_POPIN_SCAN } from '../Constants';

const path = require('path');
var slugify = require('slugify');
const child_process = require('child_process');
const log = require('electron-log');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const glcPathJSONdatabase = path.resolve(glcDir, './glc-games.json');
const libraryPathJSONdatabase = path.resolve(glcDir, (isProductionEnv()? './library.json' : './dev-library.json'));

const loadMetadaFromJSONfile = async () => {
    let installedApp = loadFromJSONFile(glcPathJSONdatabase); 
    return (typeof installedApp.games == undefined)? [] : installedApp.games;;
}

const fetchOnlineMetada = async (installedApp) => {

    const slugifyConf = {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
        locale: 'en',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      };

    try {
        installedApp = await Promise.all(installedApp.map(async (app) => {

            await axios.get(`https://api.rawg.io/api/games?key=${RAWG_APIKEY}&platforms=4&search_precise=true&search=${app.title}`, {timeout: 2000}).then((resp) => {
                let data = resp.data;
                let titleSlugified = slugify(app.title, slugifyConf);
                
                if (data.results && data.results.length > 0) {
                    // we want to iterate on first 5 items because the search engine is not always perfect...
                    for (let i=0; i < data.results.length && i < 5; i++) {
                        if (data.results[i].slug == titleSlugified || slugify(data.results[i].name, slugifyConf) == titleSlugified || data.results[i].name == app.title) {
                            app = {...app, 'background_image': data.results[i].background_image};
                            break;
                        }
                    }
                    
                }
            });
    
            return app;
        }));
    } catch (e) {
        log.info('Error fetching remote metadata');
    }

    return installedApp;
}

const fetchAppsFromSource = () => {
    log.info('fetchAppsFromSource');
    // Read the library from file and send it to renderer
    mainWindow.webContents.send('fetchApps', loadLibraryDB());
}

// Launch glc.exe to scan the system for games
const scanForGames = async () => {

    mainWindow.webContents.send('togglePopin', SHOW_POPIN_SCAN);

    let library = loadLibraryDB(); // Read from file

    let glcPath = path.resolve(glcDir, './glc.exe');
    // we might have space in the path and we need to handle it because otherwise, the path is broken
    const rootName = path.parse(glcPath).root; // "C:/"
    glcPath = `${rootName}"${glcPath.replace(rootName, '')}"`
    log.info(glcPath);
    var child = child_process.spawn(glcPath, ['/c /q'], {
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

                newLibrary = await fetchOnlineMetada(newLibrary);

                newLibrary = addCustomApps(newLibrary); // add shortcuts like Steam big picture mode
                newLibrary = blackListApps(newLibrary); // reject some app detected we don't want to see
                let tempLibrary = [];
               
                // remove old apps not found in new scan
                each(library, item => {
                    let tempItem = find(newLibrary, (newItem) => item.id === newItem.id);
                    if (tempItem) {
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
                
                storeDatabase(library, () => {
                    log.info('Library stored, starting fetchAppsFromSource');
                    fetchAppsFromSource();
                    mainWindow.webContents.send('togglePopin', SHOW_POPIN_NONE);
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
        library.push({
            "id": "steambigpicture",
            "title": "Steam Big Picture ©",
            "launch": "steam://open/bigpicture",
            "icon": "",
            "uninstaller": "",
            "platform": "Steam",
            "favourite": false,
            "hidden": false,
        });
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

fromRendererProcess.on("fetchAppsFromSource", (event, args) => {
    fetchAppsFromSource();
});

fromRendererProcess.on("scanForGames", (event, args) => {
    scanForGames();
});
