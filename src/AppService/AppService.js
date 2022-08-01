
import { ipcMain } from 'electron';
import { union, uniq, find } from 'underscore';
import { mainWindow } from '../index';
import { loadFromJSONFile, storeToJSONFile } from './Utils'
import { isProductionEnv } from '../Utils';
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

    installedApp = await Promise.all(installedApp.map(async (app) => {

        await axios.get(`https://api.rawg.io/api/games?key=${RAWG_APIKEY}&platforms=4&search_precise=true&search=${app.title}`).then((resp) => {
            let data = resp.data;
            if (data.results && data.results.length > 0) {
                app = {...app, 'background_image': data.results[0].background_image};
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
                // Add new games to database
                let newLibrary = await loadMetadaFromJSONfile();
                library = uniq(union(library, newLibrary), false, (item, key) => item.id);
                addCustomApps(library);
                // TODO remove games no more found (uninstalled games). See : https://stackoverflow.com/questions/13147278/using-underscores-difference-method-on-arrays-of-objects
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

export const loadLibraryDB = () => {
    return loadFromJSONFile(libraryPathJSONdatabase);
}

export const storeDatabase = (data, callback) => {
    storeToJSONFile(libraryPathJSONdatabase, data, callback);
}

ipcMain.on("fetchAppsFromSource", (event, args) => {
    fetchAppsFromSource();
});

ipcMain.on("scanForGames", (event, args) => {
    scanForGames();
});
