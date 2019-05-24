const { dialog } = require("electron");

function showSaveAsNewFileDialog(type) {
    type = type || '?????';
    return new Promise((resolve, reject) => {
        const file = dialog.showSaveDialog({
            title: `save ${type} file`,
            filters: [{ name: "markup file", extensions: ["html"] }]
        });
        if (file) {
            resolve(file);
        } else {
            reject();
        }
    });
}

export default showSaveAsNewFileDialog;