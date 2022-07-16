// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, shell } from 'electron'
const path = require('path');
const child_process = require('child_process');

contextBridge.exposeInMainWorld('ShadowLauncherApi', {
    launchExternalApp: (path: string) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        new Promise((resolve, reject) => {
            
            const glcDir = path.resolve(__dirname, './../../../', './GLC/');
            const glcPath = path.resolve(glcDir, './glc.exe');
            var child = child_process.spawn(glcPath, ['/c /q'], {
                encoding: 'utf8',
                shell: true
            });
            child.on('close', (code: any) => {
                switch (code) {
                    case 0:
                        console.log('Gamescan is done. Exit code: ' + code);
                        break;
                }
        
            });
        });
    }
})
