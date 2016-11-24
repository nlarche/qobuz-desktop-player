console.log('preload.js')

/*
player - play - button
player - previous - button
player - next - button

*/
const { ipcRenderer } = require('electron');

ipcRenderer.on('player:action', function(event, action) {
   document.getElementById(action).click();    
});