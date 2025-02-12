const { existsSync, mkdirSync, readdirSync, rmSync, appendFileSync, readFileSync } = require("fs");

const build = "./build";
const src = "./"

const exclude = [
	".git",
	"node_modules",
	"builder.js",
	"tsconfig.json",
	".gitignore",
	build.replace(src, "")
];

const navigate = (path) => {
	for (const file of readdirSync(path, { withFileTypes: true })
		.filter(file =>
			!file.name.endsWith(".js") &&
			!file.name.endsWith(".ts") &&
			!exclude.find(name => name === file.name)
		)
	) {
		if (file.isFile()) {
			appendFileSync(`${build}/${path.replace(src, "")}${file.name}`, readFileSync(`${path}${file.name}`, { encoding: "utf8" }))
		}
		if (file.isDirectory()) {
			mkdirSync(`${build}/${path.replace(src, "")}${file.name}`);
			navigate(`${path}${file.name}/`);
		}
	}
}

if (existsSync(build)) {
	rmSync(build, { force: true, recursive: true });
}

mkdirSync(build);
navigate(src);