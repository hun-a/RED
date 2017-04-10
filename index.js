const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const syncDb = require('./data/sync-db');

syncDb().then(_ => {
  console.log('Database loading!');
});

app.on('ready', () => {
  // create the main window
  const win = new BrowserWindow({
    width: 512,
    height: 1024
  });
  win.loadURL('file://' + __dirname + '/view/index.html');
  win.on('closed', () => {
    win = null;
  });
});