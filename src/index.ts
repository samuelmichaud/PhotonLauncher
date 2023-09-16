import { app, BrowserWindow, ipcMain as fromRendererProcess, session, screen, shell, protocol } from 'electron';
import { isProductionEnv } from './Utils';
import log from 'electron-log';
import { keyboard, Key, left } from "@nut-tree/nut-js";
import path from 'path';

log.transports.file.resolvePath = () => path.join(app.getPath('userData'), 'logs/main-' + new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '.log');

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

log.info('App is launching');

const createWindow = (): void => {

  var mainScreen = screen.getPrimaryDisplay();
  var dimensions = mainScreen.size;

  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: dimensions.height,
    width: dimensions.width,
    fullscreen: isProductionEnv(), // true for Prod, false for dev
    skipTaskbar: false,
    icon: 'src/Images/photon_icon.png',
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

  // when the window is shown, we want to get Focus, however, because of race condition at OS level, we need a timeout #hack
  mainWindow.on('show', () => {
    setTimeout(() => {
      mainWindow.focus();
    }, 200);
  });

  // Bring the Windows to front
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true }); // we need to be visible even if other app are on fullscreen (games, steam big picture, ...)
  mainWindow.setAlwaysOnTop(true, "normal"); // this command will bring the window to front
  mainWindow.moveTop(); // this command will give the real focus to the window
  mainWindow.setAlwaysOnTop(false); // this is needed so we can launch other games*/
  mainWindow.show();

  // Detect whether the app has focus or not and store it in state
  mainWindow.on('focus', () => {
    mainWindow.webContents.send('setWindowFocusState', true);
  });
  mainWindow.on('blur', () => {
    mainWindow.webContents.send('setWindowFocusState', false);
  });

  // open external links on new windows in browser (for rawg.io for example)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' }
  });

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' data: photonapp:; script-src \'self\' \'unsafe-eval\' \'unsafe-inline\' data: photonapp:; img-src \'self\' \'unsafe-eval\' \'unsafe-inline\' https://cdn.thegamesdb.net https://media.rawg.io photonapp: data:;']
      }
    })
  })

  protocol.registerFileProtocol(CUSTOM_PROTOCOL_LOADFILE, (request, callback) => {
    let url = request.url.substr(CUSTOM_PROTOCOL_LOADFILE.length + 3) // we remove : "photonapp://" from the path
    url = decodeURI(url.replace(/\\/g, '\\\\'));
    callback({ path: url });
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

fromRendererProcess.on("updateStartupMode", (event, launchOption) => {
  app.setLoginItemSettings({
    openAtLogin: isProductionEnv() && launchOption.value === LAUNCH_OPTION_STARTUP // launch by default if the app is bundled for PROD
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
fromRendererProcess.on("exit-app", (event, args) => {
  app.quit();
});

let firstTimeInput = true;
fromRendererProcess.on("triggerAltTab", (event, reverse) => {
  
  // the Alt key won't be release until we release the menu button so we can switch between apps by pressing other buttons
  if (firstTimeInput) {
    keyboard.pressKey(Key.LeftAlt)
    firstTimeInput = false;
  }

  keyboard.pressKey((reverse? Key.LeftShift : null), Key.Tab);
  keyboard.releaseKey((reverse? Key.LeftShift : null), Key.Tab);

  /*
  // old way to bring to Front the app
  mainWindow.show();
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true }); // we need to be visible even if other app are on fullscreen (games, steam big picture, ...)
  mainWindow.setAlwaysOnTop(true, "normal"); // this command will bring the window to front
  mainWindow.moveTop(); // this command will give the real focus to the window
  mainWindow.setAlwaysOnTop(false); // this is needed so we can launch other games*/
});
fromRendererProcess.on("releaseAltTab", (event, args) => {
  keyboard.releaseKey(Key.LeftAlt, Key.LeftShift, Key.Tab); // We release everything 
  firstTimeInput = true;
});

export { mainWindow };

import './AppService/AppService'
import { CUSTOM_PROTOCOL_LOADFILE, LAUNCH_OPTION_STARTUP } from './Constants';
