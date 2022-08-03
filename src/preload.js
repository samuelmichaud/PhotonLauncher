// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { shell, ipcRenderer } from 'electron';

window.ShadowApi = {

    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        ipcRenderer.send('scanForGames'); // will send a fetchApps at the end of the job
    },
    loadLibraryFromSource: () => {
        ipcRenderer.send('fetchAppsFromSource'); // will send a fetchApps at the end of the job
    },
    fetchApps: (func) => {
        ipcRenderer.on('fetchApps', (event, ...args) => func(...args));
        ipcRenderer.send('fetchAppsFromSource');
    },
    downloadAndOptimizeMetadata: () => {
        ipcRenderer.send('downloadAndOptimizeMetadata');
    },
    quitApp: () => {
        ipcRenderer.send('exit-app');
    },
    triggerAltTab: (reverse = false) => {
        ipcRenderer.send('triggerAltTab', reverse);
    },
    releaseAltTab: () => {
        ipcRenderer.send('releaseAltTab');
    }

};
