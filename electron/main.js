import { app, BrowserWindow, Menu, Tray } from 'electron';
import path from 'path';
import url from 'url';

import getConfig from './config';


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray;

function createWindow () {
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
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  initTray(config);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const clickShow = () => {
  mainWindow.focus();
  mainWindow.show();
}

const clickPlayer = (message) => {  
  mainWindow.webContents.send('player:action', message);
}

const initTray = (config) => {
  tray = new Tray(config.icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show', type: 'normal', click: clickShow },
    { type: 'separator' },
    { label: 'play / pause', type: 'normal', click: clickPlayer.bind(this, "player-play-button") },
    { label: 'Previous Track', type: 'normal', click: clickPlayer.bind(this, "player-previous-button") },
    { label: 'Next Track', type: 'normal', click: clickPlayer.bind(this, "player-next-button") }
  ])
  tray.setToolTip(config.title);
  tray.setContextMenu(contextMenu)
}