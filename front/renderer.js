// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var webview = document.getElementById("webview");

// When everything is ready, trigger the events without problems
webview.addEventListener("dom-ready", function() {
    // Show devTools if you want
    //webview.openDevTools();
    console.log("DOM-Ready, triggering events !");
    
    // Aler the scripts src of the website from the <webview>
    webview.send("play");
   
});

    