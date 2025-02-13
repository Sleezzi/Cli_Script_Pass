import { app, BrowserWindow, Menu } from "electron";
import { readdirSync } from "fs";
import express, { Request, Response, Express } from "express";
import cors from "cors";
import { Page } from "./interfacies";

const api = express();

const port = 2532;

api.use(cors());
api.enable("trust proxy");
api.set("etag", false);

let window: BrowserWindow | null;

app.whenReady().then(() => {
	window = new BrowserWindow({
		width: 400,
		height: 400,
		backgroundColor: "#010036",
		webPreferences: {
			nodeIntegration: true,
			devTools: false,
			contextIsolation: false
		},
		icon: "cdn/img/icon.png"
	});
	
	Menu.setApplicationMenu(null);
	window.loadFile("./loading.html");
	
	for (const file of readdirSync("./api").filter((file) => file.endsWith(".ts") || file.endsWith(".js"))) {
		const page: Page = require(`./api/${file}`);
		
		if (page.path && page.execute) {
			api[page.method ? page.method.toLowerCase() as keyof Express : "get"](`${page.path.startsWith("/") ? "" : "/"}${page.path}`, (request: Request, response: Response) => {
				page.execute(request, response, app);
			});
		}
	}
	
	api.listen(port, () => {
		console.log("API launched");
	});
}).then(() => {
	window?.close();
	window = new BrowserWindow({
		width: 800,
		height: 400,
		backgroundColor: "#010036",
		webPreferences: {
			nodeIntegration: true,
			devTools: false,
			contextIsolation: false
		},
		icon: "cdn/img/icon.png"
	});
	window?.loadFile("./index.html");
});

app.once("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		process.exit(0);
	}
});