
import { ipcMain } from 'electron';
import { mainWindow } from '../index';
import { loadFromJSONFile } from './Utils'

const path = require('path');
var slugify = require('slugify');
const child_process = require('child_process');
const log = require('electron-log');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const glcPathJSONdatabase = path.resolve(glcDir, './glc-games.json');
const gamesPathJSONdatabase = path.resolve(glcDir, './games-database.json');

function loadMetadaFromJSONfile () {
    const slugifyConf = {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true,      // convert to lower case, defaults to `false`
        strict: true,     // strip special characters except replacement, defaults to `false`
        locale: 'en',       // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      };
    let installedApp = loadFromJSONFile(glcPathJSONdatabase);
    let gameDatabase = loadFromJSONFile(gamesPathJSONdatabase);
    
    installedApp = (typeof installedApp.games == undefined)? [] : installedApp.games;
    gameDatabase = (typeof gameDatabase !== 'object')? [] : gameDatabase;

    installedApp = installedApp.map((app) => {
        const titleSlug = slugify(app.title, slugifyConf);
        const itemFound = gameDatabase.find((item) => {
            let itemSlug = slugify(item.title, slugifyConf);
            return titleSlug === itemSlug;
        });

        if (typeof itemFound != 'undefined') {
            console.log('App found: ' + itemFound.title + '(' + itemFound.id + ')');
            return {...app, 'tgdbID': itemFound.id}
        }

        return app;
    })
    
    return installedApp;
}

function fetchAppsFromSource() {
    console.log('fetchAppsFromSource');
    // The glc.exe create a file named glc-games with the list of all games. We need to read it.
    mainWindow.webContents.send('fetchApps', loadMetadaFromJSONfile());
}

// Launch glc.exe to scan the system for games
function scanForGames () {
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
    child.on('close', (code) => {
        switch (code) {
            case 0:
                log.info('Gamescan is done. Exit code: ' + code);
                fetchAppsFromSource();
                break;
            default: 
                log.error('error_code: ' + code);
        }
    });
}

/*export const storeDatabase = () => {

}

export const toggleFavourite = (AppId) => {

}

export const toggleHide = (AppId) => {

}*/

ipcMain.on("fetchAppsFromSource", (event, args) => {
    fetchAppsFromSource();
});

ipcMain.on("scanForGames", (event, args) => {
    scanForGames();
});
