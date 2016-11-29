const { ipcRenderer, remote } = require('electron');

var webview = document.getElementById("webview");

ipcRenderer.on('prepare-view', function (event, action) {
    document.getElementById("header-buttons").style.display = 'none';

    var parent = document.getElementById("now-playing");
    parseChild(parent);
});

ipcRenderer.on('player:action', function (event, action) {
    document.getElementById(action).click();
});

function parseChild(node) {
    if (node.localName === 'a') {
        console.log(node.innerHTML);
    } else if (node.localName === 'img') {
        console.log(node.src);
    } else if (node.childNodes.length > 0) {
        node.childNodes.forEach(parseChild);
    }
}