import { Page } from "../interfacies";

const moduleExport: Page = {
	path: "launch-admin",
	method: "POST",
	execute: (request, response, app) => {
		try {
			console.log("wallah ça marche");
		} catch (err) {
			console.error(err);
		}
	}
}

module.exports = moduleExport;