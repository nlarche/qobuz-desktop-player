// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var webview = document.getElementById("webview");

webview.addEventListener('load-commit', function () {
     webview.send('prepare-view');
    //  webview.openDevTools();
})

require('electron').ipcRenderer.on('player:action', function (event, message) {
    webview.send('player:action', message);
});



