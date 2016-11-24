console.log('preload.js')


const { ipcRenderer } = require('electron');

ipcRenderer.on('player:action', function(event, action) {
   document.getElementById(action).click();    
});