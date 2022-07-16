// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, shell } from 'electron'
const path = require('path');
const child_process = require('child_process');
const fs = require('fs');

contextBridge.exposeInMainWorld('ShadowLauncherApi', {
    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        return new Promise((resolve, reject) => {
            
            const glcDir = path.resolve(__dirname, './../../../', './GLC/');
            const glcPath = path.resolve(glcDir, './glc.exe');
            var child = child_process.spawn(glcPath, ['/c /q'], {
                encoding: 'utf8',
                shell: true
            });
            child.on('close', (code) => {
                switch (code) {
                    case 0:
                        console.log('Gamescan is done. Exit code: ' + code);

                        let rawdata = fs.readFileSync(path.resolve(glcDir, './glc-games.json'));
                        let parseData = JSON.parse(rawdata);
                        if (typeof parseData.games != undefined) {
                            resolve(parseData.games);
                        }
                        break;
                    default: 
                        reject({'error_code': code});
                }
            });
        });
    }
})
