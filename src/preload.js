// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { shell, ipcRenderer as backgroundProcess } from 'electron';

window.PhotonApi = {

    launchExternalApp: (path) => {
        shell.openPath(path);
    },
    scanForGames: () => {
        backgroundProcess.send('scanForGames'); // will send a getApps at the end of the job
    },
    fetchOnlineMetada: (apps, func) => {
        backgroundProcess.on('fetchOnlineMetada', (event, ...args) => func(...args));
        backgroundProcess.send('fetchOnlineMetada', apps);
    },
    loadApps: (func) => {
        backgroundProcess.on('getApps', (event, ...args) => func(...args));
        backgroundProcess.send('getApps');
    },
    storeDatabase: (data) => {
        backgroundProcess.send('storeDatabase', data);
    },
    storeConfig: (config) => {
        backgroundProcess.send('storeConfig', config);
    },
    loadConfig: (func) => {
        backgroundProcess.on('getConfig', (event, ...args) => func(...args));
        backgroundProcess.send('getConfig');
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
