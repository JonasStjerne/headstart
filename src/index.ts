#! /usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";
import { installHoneyBadger } from "./installers/honeyBadger.js";
import { mui } from "./installers/mui.js";
import { i18next } from "./installers/next-i18next/next-i18next.js";
import { plausible } from "./installers/plausible.js";
import { installer } from "./models/installer.js";
import { PKG_ROOT, PROCESS_PATH } from "./utils/consts.js";

const installers: installer[] = [plausible, installHoneyBadger, mui, i18next];
export let projectRootPath: string;

const main = async () => {
	const options = await runCli(installers);
	initProject(options);
};
const initProject = async (options: options) => {
	projectRootPath = `${PROCESS_PATH}/${options["projectName"]}`;

	if (!fs.existsSync(projectRootPath)) {
		fs.emptyDirSync(projectRootPath);
	}

	fs.copySync(`${PKG_ROOT}/src/template`, projectRootPath);

	options["git"]
		? await execa("git", ["init"], { cwd: projectRootPath })
		: null;

	for (const installer of installers) {
		options["technologies"]?.includes(installer.name)
			? await installer.install()
			: null;
	}

	await execa("npm", ["i"], { cwd: projectRootPath });
	//To do format with prettier after install
	// await execa("npm", ["run", "format"], { cwd: dir });
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
