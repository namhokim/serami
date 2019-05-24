const { BrowserWindow, ipcMain } = require("electron");

class MainWindow {
    constructor() {
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            allowEval: true,
            webPreferences: {
                nodeIntegration: true
            }
        });
        this.window.loadURL(`file://${__dirname}/../../index.html`);
        this.window.on("closed", () => {
            this.window = null;
        });
    }
    requestText(type) {
        type = type || '';
        type = type.toUpperCase();
        return new Promise((resolve) => {
            this.window.webContents.send("REQUEST_TEXT_" + type);
            ipcMain.once("REPLY_TEXT_" + type, (_e, text) => resolve(text));
        });
    }
}

function createMainWindow() {
    return new MainWindow();
}
export default createMainWindow;