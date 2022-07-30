// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

/**/import { shell, ipcRenderer } from 'electron';

window.ShadowApi = {};

window.ShadowApi.launchExternalApp = (path) => {
    shell.openPath(path);
},
window.ShadowApi.scanForGames = () => {
    ipcRenderer.send('scanForGames'); // will send a fetchApps at the end of the job
},
window.ShadowApi.fetchApps = (func) => {
    ipcRenderer.once('fetchApps', (event, ...args) => func(...args));
},
window.ShadowApi.downloadAndOptimizeMetadata = () => {
    ipcRenderer.send('downloadAndOptimizeMetadata');
},
window.ShadowApi.quitApp = () => {
    ipcRenderer.send('exit-app');
}/**

import { contextBridge, shell, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ShadowApi', {
    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        ipcRenderer.send('scanForGames'); // will send a fetchApps at the end of the job
    },
    fetchApps: (func) => {
        ipcRenderer.once('fetchApps', (event, ...args) => func(...args));
    },
    downloadAndOptimizeMetadata: () => {
        ipcRenderer.send('downloadAndOptimizeMetadata');
    },
    quitApp: () => {
        ipcRenderer.send('exit-app');
    }
})/**/
