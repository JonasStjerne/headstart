#! /usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";
import { plausible } from "./installers/plausible.js";
import { installer } from "./models/installer.js";
import { PKG_ROOT, PROCESS_PATH } from "./utils/consts.js";

const installers: installer[] = [
  plausible,
  // installHoneyBadger,
];

const main = async () => {
  const options = await runCli(installers);
  initProject(options);
};
const initProject = async (options: options) => {
  const dir = PROCESS_PATH + "/" + options["projectName"];

  if (!fs.existsSync(dir)) {
    fs.emptyDirSync(dir);
  }

  fs.copySync(`${PKG_ROOT}/src/templates/base`, dir);

  options["git"] ? await execa("git", ["init"], { cwd: dir }) : null;

  installers.forEach(async (installer) => {
    options["technologies"]?.includes(installer.name)
      ? await installer.install(dir)
      : null;
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
