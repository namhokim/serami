const { app } = require("electron");
import createMainWindow from "./createMainWindow";
import setAppMenu from "./setAppMenu";

let mainWindow = null;

function openTemplateFile() {
    console.log("openTemplateFile");
}

function openContextFile() {
    console.log("openContextFile");
}

function saveTemplateFile() {
    console.log("saveTemplateFile");
}

function saveContextFile() {
    console.log("saveContextFile");
}

function saveAsNewContextFile() {
    console.log("saveAsNewContextFile");
}

function saveAsNewTemplateFile() {
    console.log("saveAsNewTemplateFile");
}

app.on("ready", () => {
    mainWindow = createMainWindow();
    setAppMenu({
        openTemplateFile,
        openContextFile,
        saveTemplateFile,
        saveContextFile,
        saveAsNewContextFile,
        saveAsNewTemplateFile
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