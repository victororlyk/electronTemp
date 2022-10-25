const {app, BrowserWindow, ipcMain} = require('electron');


function createWindows() {
  let appWindow = new BrowserWindow({
    width: 600,
    height: 800,
    center: true,
    minWidth: 300,
    show: false
  });
  appWindow.loadFile("index.html")


  let aboutWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  aboutWindow.loadFile("about.html")
  appWindow.once('ready-to-show', () => {
    appWindow.show();

    aboutWindow.show();
  }, 1000);


  appWindow.on("closed", () => {
    appWindow = null;
  })
  aboutWindow.on("closed", () => {
    aboutWindow = null;
  })

  ipcMain.on("closeInfoWindow", (event) => {
    aboutWindow.hide()
  })
}

app.on("ready", createWindows)