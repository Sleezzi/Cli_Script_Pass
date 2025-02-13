import { Page } from "../interfacies";

const moduleExport: Page = {
	path: "close",
	method: "POST",
	execute: (request, response, app) => {
		try {
			app.quit();
			process.exit(0);
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;