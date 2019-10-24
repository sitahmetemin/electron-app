const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        icon: path.join(__dirname, "assets/img/icon/main.png")
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);
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

app.on("ready", createWindow);

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

if (process.env.NODE_ENV !== "production") {
    mainMenuTemplate.push(
        {
            label: "DevTools",
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            },
            accelerator:"Ctrl+T"
        },
        {
            label: "Yenile",
            role: "Reload",
            accelerator: "Ctrl+R"
        }
    );
}
