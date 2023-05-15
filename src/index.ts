import { execa } from "execa";
import fs from "fs-extra";
import { options, runCli } from "./cli.js";

const main = async () => {
  const options = await runCli();
  initProject(options);
};

const initProject = async (options: options) => {
  const dir = `./${options["projectName"]}`;
  if (!fs.existsSync(dir)) {
    fs.emptyDirSync(dir);
  }
  if (options["git"]) {
    await execa("git", ["init"], { cwd: dir });
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

// inquirer
//   .prompt([
//     {
//       type: "checkbox",
//       message: "Select technologies to use",
//       name: "technologies",
//       choices: [
//         new inquirer.Separator(" = Logging & Analytics = "),
//         {
//           name: "Plausible",
//         },
//         {
//             name: "Datadog",
//           },
//           {
//             name: "Honeybadger",
//           },
//           new inquirer.Separator(" = Authentication = "),
//         {
//           name: "Keycloak",
//         },

//       ],
//       validate(answer) {
//         if (answer.length < 1) {
//           return "You must choose at least one topping.";
//         }

//         return true;
//       },
//     },
//   ])
//   .then((answers) => {
//     console.log(JSON.stringify(answers, null, "  "));
//   });

// import { Command } from "commander";
// const program = new Command();
// program.name("Headstart").description("Headstart CLI");

// program
//   .argument(
//     "[dir]",
//     "The name of the application, as well as the name of the directory to create"
//   )
//   .option("--noGit", "Skip git initialization", false);

// program.parse(process.argv);
// const projectName = program.args[0];
// const cliOptions = program.opts();
