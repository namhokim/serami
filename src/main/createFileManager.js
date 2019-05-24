import fs from "fs";

class FileManager {
    saveFile(filePath, text) {
        return new Promise((resolve) => {
            fs.writeFileSync(filePath, text);
            resolve();
        });
    }
    readFile(filePath) {
        return new Promise((resolve) => {
            const text = fs.readFileSync(filePath, "utf8");
            resolve(text);
        })
    }
}

function createFileManager() {
    return new FileManager();
}

export default createFileManager;