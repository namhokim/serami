import { Menu } from "electron";

let isMac = process.platform === 'darwin';

function setAppMenu(options) {
    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: "Serami",
            submenu: [
                { role: 'about' },
                { type: 'separator' }, //////////
                { role: 'services' },
                { type: 'separator' }, //////////
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' }, //////////
                { role: 'quit' }
            ]
        }] : []),
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                { label: "Open Template", accelerator: "CmdOrCtrl+O", click: () => options.openTemplateFile() },
                { label: "Open Context", accelerator: "CmdOrCtrl+Shift+O", click: () => options.openContextFile() },
                { type: 'separator' }, //////////
                { label: "Save Template", accelerator: "CmdOrCtrl+S", click: () => options.saveTemplateFile() },
                { label: "Save Context", accelerator: "CmdOrCtrl+Shift+S", click: () => options.saveContextFile() },
                { label: "Save As Template", click: () => options.saveAsNewTemplateFile() },
                { label: "Save As Context", click: () => options.saveAsNewContextFile() },
                { type: 'separator' },
                isMac ? { role: 'close' } : { role: 'quit' },
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                { role: 'undo' },
                { role: 'redo' },
                { type: 'separator' }, //////////
                { role: 'cut' },
                { role: 'copy' },
                { role: 'paste' },
                ...(isMac ? [
                    { role: 'pasteAndMatchStyle' },
                    { role: 'delete' },
                    { role: 'selectAll' },
                    { type: 'separator' }, //////////
                    {
                        label: 'Speech',
                        submenu: [
                            { role: 'startspeaking' },
                            { role: 'stopspeaking' }
                        ]
                    }
                ] : [
                    { role: 'delete' },
                    { type: 'separator' }, //////////
                    { role: 'selectAll' }
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                { role: 'reload' },
                { role: 'forcereload' },
                { role: 'toggledevtools' },
                { type: 'separator' }, //////////
                { role: 'resetzoom' },
                { role: 'zoomin' },
                { role: 'zoomout' },
                { type: 'separator' }, //////////
                { role: 'togglefullscreen' }
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                { role: 'minimize' },
                { role: 'zoom' },
                ...(isMac ? [
                    { type: 'separator' }, //////////
                    { role: 'front' },
                    { type: 'separator' }, //////////
                    { role: 'window' }
                ] : [
                    { role: 'close' }
                ])
            ]
        },
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

export default setAppMenu;