const { BrowserWindow } = require("electron");

class MainWindow {
    constructor() {
        this.window = new BrowserWindow({
            width: 800, height: 600,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.window.loadURL(`file://${__dirname}/../../index.html`);
        this.window.on("closed", () => {
            this.window = null;
        });
        //this.window.webContents.openDevTools();
    }
}

function createMainWindow() {
    return new MainWindow();
}
export default createMainWindow;