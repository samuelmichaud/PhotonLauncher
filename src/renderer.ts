/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/latest/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import './Store/lang';
import './Components/Main';
import App from './Model/App';


export interface PhotonApi {
    launchExternalApp: (path: string) => void,
    scanForGames: () => void,
    loadLibraryFromSource: () => void,
    storeDatabase: (data: any) => void,
    loadConfig: (func: any) => void,
    storeConfig: (config: any) => void,
    fetchOnlineMetada: (apps: Array<App>, func: (apps: Array<App>) => void) => void,
    loadApps: (func: any) => void,
    listenForWindowFocusChange: (func: any) => void,
    quitApp: () => void,
    triggerAltTab: (reverse?: boolean) => void,
    releaseAltTab: () => void,
    listenForTogglePopin: (func: any) => void,
    updateStartupMode: (launchOption: string) => void,
}
  
declare global {
    interface Window {
        PhotonApi: PhotonApi,
        joypad: any
    }
}
