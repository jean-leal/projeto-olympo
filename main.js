const {app, BrowserWindow} = require('electron');

//janela principal
let mainWindow = null;
function createWindow() {
    mainWindow = new BrowserWindow({
        width:800,
        height:600
    });

    mainWindow.loadFile('views/index.html');
}
// on ready
app.whenReady().then(createWindow);
//----------------------------------------------------------
