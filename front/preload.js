console.log('preload.js')

/*
player - play - button
player - previous - button
player - next - button

*/
const { ipcRenderer } = require('electron');

ipcRenderer.on('play', function() {
   console.log('play')
   document.getElementById("player-play-button").click(); 
});