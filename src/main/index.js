const { app, dialog } = require("electron");
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";
import showSaveAsNewFileDialog from "./showSaveAsNewFileDialog";
import showOpenFileDialog from "./showOpenFileDialog";
import createFileManager from "./createFileManager";

let mainWindow = null;
let fileManager = null;

function openFile(type) {
    showOpenFileDialog(mainWindow.getWindow(), type)
        .then((filePath) => fileManager.readFile(type, filePath))
        .then((text) => mainWindow.sendText(type, text))
        .catch((error) => {
            console.log(error);
        });
}

function saveFile(type) {
    if (typeof type !== 'string') {
        console.log("saveFile need file type.");
        return;
    }

    if (fileManager.isSaveAsNewFile(type)) {
        saveAsNewFile(type);
        return;
    }
    mainWindow.requestText(type)
        .then((text) => fileManager.overwriteFile(type, text))
        .catch((error) => {
            console.log(`saveFile: ${errro}`);
        });
}

function saveAsNewFile(type) {
    if (typeof type !== 'string') {
        console.log("saveAsNewFile need file type.");
        return;
    }
    Promise.all([showSaveAsNewFileDialog(type), mainWindow.requestText(type)])
        .then(([filePath, text]) => fileManager.saveFile(type, filePath, text))
        .catch((error) => {
            console.log(`saveAsNewFile: ${errro}`);
        });
}

app.on("ready", () => {
    mainWindow = createMainWindow();
    fileManager = createFileManager();
    setAppMenu({
        openTemplateFile: () => openFile("template"),
        openContextFile: () => openFile("context"),
        saveTemplateFile: () => saveFile("template"),
        saveContextFile: () => saveFile("context"),
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