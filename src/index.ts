#! /usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";
import { installPlausible } from "./installers/plausible.js";

const main = async () => {
  const options = await runCli();
  initProject(options);
};

const initProject = async (options: options) => {
  const dir = `./${options["projectName"]}`;
  if (!fs.existsSync(dir)) {
    fs.emptyDirSync(dir);
  }

  fs.copySync("./src/templates/base", dir);

  options["git"] ? await execa("git", ["init"], { cwd: dir }) : null;

  options["technologies"]?.includes("Plausible") ? installPlausible(dir) : null;
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
