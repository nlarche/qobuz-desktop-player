import { app, BrowserWindow } from 'electron';
import path from 'path';
import url from 'url';

import getConfig from './config';
import appTray from './tray';
import appMenu from './menu';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;
let willQuitApp = false;

function createWindow() {
    // Create the browser window.
    const config = getConfig()

    mainWindow = new BrowserWindow(config)

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/../index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('close', function(e) {
        if (willQuitApp) {
            /* the user tried to quit the app */                     
            mainWindow = null;
           
        } else {
            /* the user only tried to close the window */
            e.preventDefault();
            mainWindow.hide();
        }
    })

    tray = appTray(config, clickShow, clickPlayer, quitPlayer);
    appMenu(config, clickPlayer, quitPlayer);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// the user quit the app : app.quit()
app.on('before-quit', () => willQuitApp = true);;


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const clickShow = () => {
    mainWindow.focus();
    mainWindow.show();
}

const clickPlayer = (message) => {
    mainWindow.webContents.send('player:action', message);
}

// Need to manually handle quit to save laste state
const quitPlayer = () => {
   mainWindow.hide();
   mainWindow.webContents.send('player:quit');
   setTimeout(() => app.quit(), 300);
}



