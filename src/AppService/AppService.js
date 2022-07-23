
import { ipcMain, ipcRenderer } from 'electron';
import { mainWindow } from '../index';
import { loadFromJSONFile } from './Utils'

const path = require('path');
const child_process = require('child_process');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');
const glcPathJSONdatabase = path.resolve(glcDir, './glc-games.json');

function loadMetadaFromJSONfile (path) {
    let parsedData = loadFromJSONFile(path);
    return (typeof parsedData.games != undefined)? parsedData.games : [];
}

function fetchAppsFromSource() {
    console.log('fetchAppsFromSource');
    // The glc.exe create a file named glc-games with the list of all games. We need to read it.
    mainWindow.webContents.send('fetchApps', loadMetadaFromJSONfile(glcPathJSONdatabase));
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
