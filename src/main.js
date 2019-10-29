const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const windowManager = require('electron-window-manager');

app.on('ready', function(){
    windowManager.init({
        'layouts': {
            'default': './pages/Login/index.html',  // The "/" at the start will be replaced with the 'appBase' value
            'secondary': '/layouts/secondary.html'
        },

        'defaultLayout': 'default'
    });
    // Open a window
    windowManager.open('home', 'Welcome ...', './Login/index.html');
});

