// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, shell } from 'electron'

contextBridge.exposeInMainWorld('ShadowLauncherApi', {
    launchExternalApp: (path: string) => {
        shell.openPath(path);
    }
})
