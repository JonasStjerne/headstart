#! /usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";
import { nestjsInstallers } from "./installers/nestjs/index.js";
import { nextjsInstallers } from "./installers/nextjs/index.js";
import { frameworks } from "./models/framework.js";
import { PKG_ROOT, PROCESS_PATH } from "./utils/consts.js";

const frameworks: frameworks = [
	{
		name: "Next.js",
		templateName: "nextjs",
		installers: nextjsInstallers,
	},
	{
		name: "NestJS",
		templateName: "nestjs",
		installers: nestjsInstallers,
	},
];

export let projectRootPath: string;

const main = async () => {
	const options = await runCli(frameworks);
	console.info("Creating project... This may take a few minutes.");
	await initProject(options);
	console.info(
		"\x1b[42m",
		`Successfully created project ${options.projectName}`
	);
};

const initProject = async (options: options) => {
	projectRootPath = `${PROCESS_PATH}/${options["projectName"]}`;
	console.info("Creating project base...");
	if (!fs.existsSync(projectRootPath)) {
		fs.emptyDirSync(projectRootPath);
	}

	const templateName = frameworks.find(
		(framework) => framework.name === options["framework"]
	)!.templateName;

	fs.copySync(
		`${PKG_ROOT}src/base-templates/${templateName}`,
		projectRootPath
	);

	if (options["git"]) {
		console.info("Initializing git repository...");
		await execa("git", ["init"], { cwd: projectRootPath });
	}

	const installers = frameworks.find(
		(framework) => framework.name === options["framework"]
	)!.installers;

	console.info("Setting up custom technologies...");
	for (const installer of installers) {
		options["technologies"]?.includes(installer.name)
			? await installer.install()
			: null;
	}
	console.info("Installing npm packages...");
	await execa("npm", ["i"], { cwd: projectRootPath });
	//Todo format with prettier after install
	//Todo cleanup all comments used to reference lines could be done with regex and prefix comments with a hash
	// await execa("npm", ["run", "format"], { cwd: dir });
	//Todo use a templating language
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
