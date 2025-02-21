const { app, BrowserWindow } = require('electron/main');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  if(process.env.NODE_ENV === 'development'){
    win.loadURL("http://localhost:3000/#/");
    win.webContents.openDevTools();
    
  }else{
    const indexPath=path.join(__dirname,"./dist/renderer/index.html");
    
    win.loadFile(indexPath);

    // avoid production mode open devTool
    win.webContents.on('before-input-event', (event, input) => {
      if (input.key === 'F12' || (input.control && input.shift && input.key === 'I')) {
        event.preventDefault();
      }
    });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});