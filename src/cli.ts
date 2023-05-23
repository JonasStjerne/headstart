import inquirer from "inquirer";
import { installer } from "./models/installer";

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

  options["technologies"] = await prompt<string[]>(
    "technologies",
    "checkbox",
    "Select technologies to use",
    undefined,
    [
      new inquirer.Separator(" = Logging & Analytics = "),
      {
        name: "Plausible",
      },
    ]
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
