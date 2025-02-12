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

let mainWindow: BrowserWindow | null;

app.whenReady().then(() => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
		icon: "cdn/img/icon.png"
	});
	Menu.setApplicationMenu(null);
	mainWindow.loadFile("./index.html");
	
	for (const file of readdirSync("./api").filter((file) => file.endsWith(".ts"))) {
		const page: Page = require(`../api/${file}`);
		if (page.path && page.execute) {
			api[page.method ? page.method.toLowerCase() as keyof Express : "get"](`${page.path.startsWith("/") ? "" : "/"}${page.path}`, (request: Request, response: Response) => {
				page.execute(request, response, app);
			});
		}
	}
	
	api.listen(port, () => {
		console.log("API launched");
	});
});

app.once("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		process.exit(0);
	}
});