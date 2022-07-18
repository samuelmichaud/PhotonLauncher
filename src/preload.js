// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, shell, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ShadowApi', {
    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        ipcRenderer.send('scanForGames');
    },
    fetchApps: (func) => {
        ipcRenderer.send('fetchAppsFromSource');
        ipcRenderer.on('fetchApps', (event, ...args) => func(...args));
    },
    quitApp: () => {
        ipcRenderer.send('exit-app');
    }
})
