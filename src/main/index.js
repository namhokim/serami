const { app, dialog } = require("electron");
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import showOpenFileDialog from "./showOpenFileDialog";
import createFileManager from "./createFileManager";

let mainWindow = null;
let fileManager = null;

function saveTemplateFile() {
    console.log("saveTemplateFile");
}

function saveContextFile() {
    console.log("saveContextFile");
}

function openFile(type) {
    showOpenFileDialog(mainWindow.getWindow(), type)
        .then((filePath) => fileManager.readFile(filePath))
        .then((text) => mainWindow.sendText(type, text))
        .catch((error) => {
            console.log(error);
        });
}

function saveAsNewFile(type) {
    if (typeof type !== 'string') {
        console.log("saveAsNewFile need file type.");
        return;
    }
    Promise.all([showSaveAsNewFileDialog(type), mainWindow.requestText(type)])
        .then(([filePath, text]) => fileManager.saveFile(filePath, text))
        .catch((error) => {
            console.log(errro);
        });
}

app.on("ready", () => {
    mainWindow = createMainWindow();
    fileManager = createFileManager();
    setAppMenu({
        openTemplateFile: () => openFile("template"),
        openContextFile: () => openFile("context"),
        saveTemplateFile,
        saveContextFile,
        saveAsNewTemplateFile: () => saveAsNewFile("template"),
        saveAsNewContextFile: () => saveAsNewFile("context"),
    });
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", (_e, hasVisibleWindows) => {
    if (!hasVisibleWindows) {
        mainWindow = createMainWindow();
    }
});