#! /usr/bin/env node
import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";

const main = async () => {
  const options = await runCli();
  initProject(options);
};

const initProject = async (options: options) => {
  console.log(options);
  const dir = `./${options["projectName"]}`;
  if (!fs.existsSync(dir)) {
    fs.emptyDirSync(dir);
  }

  fs.copySync("./src/templates/base", dir);

  options["git"] ? await execa("git", ["init"], { cwd: dir }) : null;

  console.log(options["technologies"]);
  options["technologies"]?.includes("Plausible")
    ? installPlausible(`${dir}/src/app/page.tsx`)
    : null;
};

const installPlausible = async (dir: string): Promise<void> => {
  console.log("installing plausible");
  console.log(dir);
  await addGlobalProvider(
    dir,
    '<PlausibleProvider domain="example.com">',
    "</PlausibleProvider>"
  );
};

const addGlobalProvider = async (
  dir: string,
  startTag: string,
  closeTag: string
) => {
  await insert(dir, startTag, "// Providers start", "after");
  await insert(dir, closeTag, "// Providers end", "before");
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

export const insert = (
  filename: string,
  insert: string,
  matcher: string,
  direction: "before" | "after" = "after"
) => {
  return new Promise<void>(function (resolve) {
    fs.readFile(filename, "utf-8", function (err, data) {
      if (err) {
        throw err;
      }
      let regex = new RegExp(matcher, "g");
      if (direction === "before") {
        console.log("before");
        data = data.replace(regex, `${insert} $&`);
      }
      if (direction === "after") {
        console.log("after");
        data = data.replace(regex, `$& ${insert}`);
      }
      console.log(data);
      fs.writeFile(filename, data, "utf-8", function (err) {
        if (err) {
          throw err;
        } else {
          resolve();
        }
      });
    });
  });
};
