const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: true
        },
        frame: false,
        resizable: false
    });

    mainWindow.loadURL(`file://${__dirname}/pages/Login/index.html`);

    mainWindow.on("closed", () => {
        
        mainWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

    ipcMain.on("openWindow", (err, folderName) => {
        
        newPageWindow = new BrowserWindow({
            width: 1300,
            height: 700,
            webPreferences: {
                nodeIntegration: true
            }
        });

        let editedFolderPath = '/pages/' + folderName + '/index.html'

        newPageWindow.loadURL(path.join(__dirname, editedFolderPath));

        newPageWindow.maximize();

        newPageWindow.on("close", () => {
            newPageWindow = null;
        });

    });

    ipcMain.on("closeApp", () => {
        app.quit();
        mainWindow = null;
    });
};

const mainMenuTemplate = [
    {
        label: "Dosya",
        submenu: [
            {
                label: "Çıkış",
                accelerator: "Ctrl+Q",
                role: "quit"
            }
        ]
    }
];

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push(
        {
            label: "DevTools",
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            },
            accelerator: "Ctrl+T"
        },
        {
            label: "Yenile",
            role: "Reload",
            accelerator: "Ctrl+R"
        }
    );
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});
