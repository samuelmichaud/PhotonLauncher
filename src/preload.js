// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { shell, ipcRenderer as backgroundProcess } from 'electron';

window.ShadowApi = {

    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        backgroundProcess.send('scanForGames'); // will send a fetchApps at the end of the job
    },
    loadLibraryFromSource: () => {
        backgroundProcess.send('fetchAppsFromSource'); // will send a fetchApps at the end of the job
    },
    fetchApps: (func) => {
        backgroundProcess.on('fetchApps', (event, ...args) => func(...args));
        backgroundProcess.send('fetchAppsFromSource');
    },
    downloadAndOptimizeMetadata: () => {
        backgroundProcess.send('downloadAndOptimizeMetadata');
    },
    storeDatabase: (data) => {
        backgroundProcess.send('storeDatabase', data);
    },
    quitApp: () => {
        backgroundProcess.send('exit-app');
    },
    triggerAltTab: (reverse = false) => {
        backgroundProcess.send('triggerAltTab', reverse);
    },
    releaseAltTab: () => {
        backgroundProcess.send('releaseAltTab');
    },
    listenForWindowFocusChange: (func) => {
        backgroundProcess.on('setWindowFocusState', (event, ...args) => func(...args));
    },
    listenForTogglePopin: (func) => {
        backgroundProcess.on('togglePopin', (event, ...args) => func(...args));
    },
    updateStartupMode: (startupMode) => {
        backgroundProcess.send('updateStartupMode', startupMode);
    }

};
