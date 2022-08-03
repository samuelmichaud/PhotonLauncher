import { app, BrowserWindow, ipcMain, session, screen } from 'electron';
import { isProductionEnv } from './Utils';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// We want to keep this reference for future re-use
var mainWindow: BrowserWindow;

const createWindow = (): void => {

  var mainScreen = screen.getPrimaryDisplay();
  var dimensions = mainScreen.size;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: dimensions.height,
    width: dimensions.width,
    fullscreen: isProductionEnv(), // true for Prod, false for dev
    skipTaskbar: isProductionEnv(), // true for Prod, false for dev
    // @ts-ignore
    titleBarStyle: (isProductionEnv()? "hidden" : "defaut"),
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if(!isProductionEnv()){
    mainWindow.webContents.openDevTools();
  }

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' data:; script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' data:; img-src \'self\' \'unsafe-eval\' \'unsafe-inline\' https://cdn.thegamesdb.net https://media.rawg.io']
      }
    })
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setLoginItemSettings({
  openAtLogin: isProductionEnv() // launch by default if the app is bundled for PROD
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.on("exit-app", (event, args) => {
  app.quit();
});

ipcMain.on("bringWindowToFront", (event, args) => {
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true }); // we need to be visible even if other app are on fullscreen (games, steam big picture, ...)
  mainWindow.setAlwaysOnTop(true, "normal"); // this command will bring the window to front
  mainWindow.moveTop(); // this command will give the real focus to the window
  mainWindow.setAlwaysOnTop(false); // this is needed so we can launch other games
});

export { mainWindow };

import './AppService/AppService'
import './AppService/DataBaseManagement'