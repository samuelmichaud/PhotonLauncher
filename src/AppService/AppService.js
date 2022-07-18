
import { ipcMain } from 'electron';
import { mainWindow } from '../index'

const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

// Store the glc.exe directory for future reuse. Because the .exe generate files on its own folder
const glcDir = path.resolve(__dirname, './../');

// The glc.exe create a file named glc-games with the list of all games. We need to read it.
const loadGamesFromJSON = () => {
    let parsedData = [];
    try {
        let rawdata = fs.readFileSync(path.resolve(glcDir, './glc-games.json'));
        parsedData = JSON.parse(rawdata);
        parsedData = (typeof parsedData.games != undefined)? parsedData.games : [];
    } catch(e){}
  
    return parsedData;
}

ipcMain.on("fetchAppsFromSource", (event, args) => {
    mainWindow.webContents.send('fetchApps', loadGamesFromJSON());
});

ipcMain.on("scanForGames", (event, args) => {
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
                mainWindow.webContents.send('fetchApps', loadGamesFromJSON());
                break;
            default: 
                reject({'error_code': code});
        }
    });
});
