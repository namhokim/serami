import fs, { promises } from "fs";

class FileManager {
    constructor() {
        this.templateFilePath = "";
        this.contextFilePath = "";
    }

    readFile(type, filePath) {
        return new Promise((resolve) => {
            const text = fs.readFileSync(filePath, "utf8");
            if (type === "template") {
                this.templateFilePath = filePath;
            } else if (type === "context") {
                this.contextFilePath = filePath;
            }
            resolve(text);
        })
    }

    saveFile(type, filePath, text) {
        console.log(`saveFile: ${type}, ${filePath}, ${text}`);
        return new Promise((resolve) => {
            fs.writeFileSync(filePath, text);
            if (type === "template") {
                this.templateFilePath = filePath;
            } else if (type === "context") {
                this.contextFilePath = filePath;
            }
            resolve();
        });
    }

    overwriteFile(type, text) {
        type = type || "";
        if (type === "template" && this.templateFilePath.length > 0) {
            return this.saveFile(type, this.templateFilePath, text);
        }
        if (type === "context" && this.contextFilePath.length > 0) {
            return this.saveFile(type, this.contextFilePath, text);
        }
        return new Promise((resolve, reject) => {
            reject("overWriteFile: not specified type.");
        });
    }

    isSaveAsNewFile(type) {
        type = type || "";
        if ((type === "template" && this.templateFilePath.length > 0) ||
            (type === "context" && this.contextFilePath.length > 0)) {
            return false;
        }
        return true;
    }
}

function createFileManager() {
    return new FileManager();
}

export default createFileManager;