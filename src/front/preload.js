require('babel-register');
const { ipcRenderer, remote } = require('electron');
const QobuzNotification = require('./notification').default;

var webview = document.getElementById("webview");
var notification = new QobuzNotification();

ipcRenderer.on('prepare-view', function (event, action) {
    document.getElementById("header-buttons").style.display = 'none';
});

ipcRenderer.on('player:action', function (event, action) {
    document.getElementById(action).click();
});

ipcRenderer.on('player:notification', function (event, action) {
    switch (action) {
        case 'start':
            notification.start();
            break;
        case 'stop':
            notification.stop();
        default:
            break;
    }
});


