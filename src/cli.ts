import inquirer from "inquirer";
import { installer, installerCatagories } from "./models/installer.js";

type promptOfTypeInput = "projectName";
type promptOfTypeBoolean = "git";
type promptOfTypeCheckbox = "technologies";

export type options = Partial<
  {
    [key in promptOfTypeInput]: string;
  } & {
    [key in promptOfTypeBoolean]: boolean;
  } & {
    [key in promptOfTypeCheckbox]: string[];
  }
>;

export const runCli = async (installers: installer[]) => {
  const options: options = {};

  options["projectName"] = await prompt<string>(
    "projectName",
    "input",
    "What is the name of your project?",
    "my-project"
  );

  options["git"] = await prompt<boolean>(
    "git",
    "confirm",
    "Initialize a git repository?",
    true
  );

  const cliChoiceArr = [];
  for (const category in installerCatagories) {
    if (!isNaN(Number(category))) {
      continue;
    }
    cliChoiceArr.push(new inquirer.Separator(` = ${category} = `));
    for (const installer of installers) {
      if (
        installer.category ===
        installerCatagories[category as keyof typeof installerCatagories]
      ) {
        cliChoiceArr.push({
          name: installer.name,
        });
      }
    }
  }

  options["technologies"] = await prompt<string[]>(
    "technologies",
    "checkbox",
    "Select technologies to use",
    undefined,
    cliChoiceArr
  );

  return options;
};

const prompt = async <optionType>(
  name: keyof options,
  type: "input" | "confirm" | "checkbox",
  message: string,
  defaultOption?: optionType,
  choices?: (inquirer.Separator | { name: string })[]
) => {
  const result = await inquirer.prompt<{ [name: string]: optionType }>({
    name: name,
    type: type,
    message: message,
    default: defaultOption,
    choices,
  });

  return result[name];
};
