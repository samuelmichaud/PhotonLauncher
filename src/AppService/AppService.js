
import { ipcMain } from 'electron';
import { each, find, reject, contains } from 'underscore';
import { mainWindow } from '../index';
import { loadFromJSONFile, storeToJSONFile, isProductionEnv } from '../Utils';
import axios from 'axios';
import { RAWG_APIKEY } from '../Constants';

const path = require('path');
var slugify = require('slugify');
const child_process = require('child_process');
const log = require('electron-log');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const glcPathJSONdatabase = path.resolve(glcDir, './glc-games.json');
//const gamesPathJSONdatabase = path.resolve(glcDir, './games-database.json');
const libraryPathJSONdatabase = path.resolve(glcDir, (isProductionEnv()? './library.json' : './dev-library.json'));

async function loadMetadaFromJSONfile () {
    const slugifyConf = {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
        locale: 'en',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      };
    let installedApp = loadFromJSONFile(glcPathJSONdatabase);
    
    installedApp = (typeof installedApp.games == undefined)? [] : installedApp.games;

    //let gameDatabase = loadFromJSONFile(gamesPathJSONdatabase); // The glc.exe create a file named glc-games with the list of all games. We need to read it
    //gameDatabase = (typeof gameDatabase !== 'object')? [] : gameDatabase;
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
            
            /*
            // Search in local database from thegamedatabase.net
            const titleSlug = slugify(app.title, slugifyConf);
            const itemFound = gameDatabase.find((item) => {
                let itemSlug = slugify(item.title, slugifyConf);
                return titleSlug === itemSlug;
            });
    
            if (typeof itemFound != 'undefined') {
                console.log('App found: ' + itemFound.title + '(' + itemFound.id + ')');
                return {...app, 'tgdbID': itemFound.id}
            }*/
    
            return app;
        }));
    } catch (e) {
        log.info('Error fetching remote metadata');
    }
    
    return installedApp;
}

function fetchAppsFromSource() {
    log.info('fetchAppsFromSource');
    // Read the library from file and send it to renderer
    mainWindow.webContents.send('fetchApps', loadLibraryDB());
}

// Launch glc.exe to scan the system for games
async function scanForGames () {

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
                newLibrary = addCustomApps(newLibrary); // add shortcuts like Steam big picture mode
                newLibrary = blackListApps(newLibrary); // reject some app detected we don't want to see
                let tempLibrary = [];

                each(library, item => {
                    let tempItem = find(newLibrary, (newItem) => item.id === newItem.id);
                    if (tempItem) {
                        tempLibrary.push(item);
                    } else {
                        // the item is not found in new library scan so we should remove it
                    }
                });
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
                });
                break;
            default: 
                log.error('error_code: ' + code);
        }
    });
}

function addCustomApps(library) {
    // ADD STEAM BIG PICTURE MODE
    // if we can find at least one game with the Steam platform, it must say that Steam big picture mode is available
    if(find(library, (item) => item.platform == 'Steam') && typeof find(library, (item) => item.id == 'steambigpicture') == 'undefined') {
        library.push({
            "id": "steambigpicture",
            "title": "Steam Big Picture",
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

function blackListApps(library) {
    return reject(library, (item) => contains(['appmanifest_228980.acf' /* Steamwork commons */], item.id));
}

export const loadLibraryDB = () => {
    return loadFromJSONFile(libraryPathJSONdatabase);
}

export const storeDatabase = (data, callback) => {
    storeToJSONFile(libraryPathJSONdatabase, data, callback);
}

ipcMain.on("storeDatabase", (event, args) => {
    storeDatabase(args);
});

ipcMain.on("fetchAppsFromSource", (event, args) => {
    fetchAppsFromSource();
});

ipcMain.on("scanForGames", (event, args) => {
    scanForGames();
});
