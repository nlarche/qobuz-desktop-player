var ipcRenderer = require('electron').ipcRenderer;

var webview = document.getElementById("webview");

webview.addEventListener('load-commit', function () {
    webview.send('prepare-view');
    webview.openDevTools();    
});

ipcRenderer.on('player:action', function (event, message) {
    webview.send('player:action', message);
});

ipcRenderer.on('player:notification', function (event, message) {
    webview.send('player:notification', message);
});

// on quit : reload to save last state
ipcRenderer.on('player:quit', () => {  
   webview.reload();   
});

