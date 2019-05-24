const { dialog } = require("electron");

function showOpenFileDialog(win, type) {
    type = type || '?????';
    return new Promise((resolve, reject) => {
        const files = dialog.showOpenDialog(win, {
            title: `open ${type} file`,
            properties: ["openFile"],
            filters: [{ extensions: ["html", "htm", "txt"] }]
        });
        if (files && files.length > 0) {
            resolve(files[0]);
        } else {
            reject();
        }
    });
}

export default showOpenFileDialog;