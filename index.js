const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const config = require('./app/config.json');

let appWindow;

app.on('ready', () => {

    appWindow = new BrowserWindow({
        height: config.window.height,
        width: config.window.width,
        show: true
    });

    appWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/index.html'),
        protocol: 'file',
        slashes: true,
    }));

    appWindow.on('ready-to-show', () => {
        appWindow.show();
    });

    appWindow.on('close', () => {
        appWindow = null;
    });
});
