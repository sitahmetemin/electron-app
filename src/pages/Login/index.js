const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) {
	app.quit();
}

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

	mainWindow.loadURL(`file://${__dirname}/index.html`);

	mainWindow.removeMenu();

	mainWindow.on("closed", () => {
		mainWindow = null;
	});

	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

	Menu.setApplicationMenu(mainMenu);

	ipcMain.on("key:btnClose", () => {
		close();
	});

	ipcMain.on("key:btnLogin", () => {
		goHome();
	});

	ipcMain.on("createWindow", () => {
		openAddWindow();
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

const close = () => {
	app.quit();
	mainWindow = null;
};

const goHome = () => {
	newPageWindow = new BrowserWindow({
		width: 1366,
		height: 768,
		webPreferences: {
			nodeIntegration: true
		}
	});

    newPageWindow.loadURL(path.join(__dirname, "../Home/index.html"));
    
    newPageWindow.maximize();

	newPageWindow.on("close", () => {
		newPageWindow = null;
	});
};

const openAddWindow = () => {
	newPageWindow = new BrowserWindow({
		width: 1366,
		height: 768,
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
