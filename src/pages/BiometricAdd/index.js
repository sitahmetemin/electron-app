const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

	Menu.setApplicationMenu(mainMenu);

	ipcMain.on("createWindow", () => {
		goAddWindow();
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

const goAddWindow = () => {

    newPageWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    newPageWindow.loadURL(path.join(__dirname, "../Add/index.html"));

	newPageWindow.maximize();

    newPageWindow.on("close", () => {
        newPageWindow = null;
    });
};
