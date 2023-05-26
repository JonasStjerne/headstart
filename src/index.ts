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

const main = async () => {
	const options = await runCli(installers);
	initProject(options);
};
const initProject = async (options: options) => {
	const dir = PROCESS_PATH + "/" + options["projectName"];

	if (!fs.existsSync(dir)) {
		fs.emptyDirSync(dir);
	}

	fs.copySync(`${PKG_ROOT}/src/template`, dir);

	options["git"] ? await execa("git", ["init"], { cwd: dir }) : null;

	for (const installer of installers) {
		options["technologies"]?.includes(installer.name)
			? await installer.install(dir)
			: null;
	}
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
