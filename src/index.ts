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
	initProject(options);
};

const initProject = async (options: options) => {
	projectRootPath = `${PROCESS_PATH}/${options["projectName"]}`;

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

	options["git"]
		? await execa("git", ["init"], { cwd: projectRootPath })
		: null;

	const installers = frameworks.find(
		(framework) => framework.name === options["framework"]
	)!.installers;

	for (const installer of installers) {
		options["technologies"]?.includes(installer.name)
			? await installer.install()
			: null;
	}

	await execa("npm", ["i"], { cwd: projectRootPath });
	//Todo format with prettier after install
	//Todo cleanup all comments used to reference lines
	// await execa("npm", ["run", "format"], { cwd: dir });
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
