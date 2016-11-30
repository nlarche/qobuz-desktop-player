require('babel-register');
const { ipcRenderer, remote } = require('electron');
const  QobuzNotification = require('./notification').default;

var webview = document.getElementById("webview");

ipcRenderer.on('prepare-view', function (event, action) {
    document.getElementById("header-buttons").style.display = 'none';
});

ipcRenderer.on('player:action', function (event, action) {
    document.getElementById(action).click();
});

new QobuzNotification();
