
import { ipcMain, ipcRenderer } from 'electron';
import { mainWindow } from '../index';
import { loadFromJSONFile } from './Utils'

const path = require('path');
var slugify = require('slugify');
const child_process = require('child_process');

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
    const glcPath = path.resolve(glcDir, './glc.exe');
    console.log(glcPath);
    var child = child_process.spawn(glcPath, ['/c /q'], {
        encoding: 'utf8',
        shell: true
    });
    child.on('close', (code) => {
        switch (code) {
            case 0:
                console.log('Gamescan is done. Exit code: ' + code);
                fetchAppsFromSource();
                break;
            default: 
                reject({'error_code': code});
        }
    });
}

ipcMain.on("fetchAppsFromSource", (event, args) => {
    fetchAppsFromSource();
});

ipcMain.on("scanForGames", (event, args) => {
    scanForGames();
});
