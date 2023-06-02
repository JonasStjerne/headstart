import inquirer from "inquirer";
import { framework, frameworks } from "./models/framework.js";
import { installerCatagories } from "./models/installer.js";

type prompt<Key extends string, PromptOutputType> = {
	[key in Key]: PromptOutputType;
};

export type options = Partial<
	prompt<"git", boolean> &
		prompt<"projectName", string> &
		prompt<"technologies", string[]> &
		prompt<"framework", framework>
>;

export const runCli = async (frameworks: frameworks) => {
	const options: options = {};

	options["projectName"] = await prompt<string>({
		name: "projectName",
		type: "input",
		message: "What is the name of your project?",
		defaultOption: "my-project",
	});

	options["git"] = await prompt<boolean>({
		name: "git",
		type: "confirm",
		message: "Initialize a git repository?",
		defaultOption: true,
	});

	options["framework"] = await prompt<framework>({
		name: "framework",
		type: "list",
		message: "Choose a framework",
		defaultOption: undefined,
		choices: ["Next.js", "NestJS"],
	});

	const cliChoiceArr = getTechnologiesPromptChoices(
		options["framework"] as framework,
		frameworks
	);

	options["technologies"] = await prompt<string[]>({
		name: "technologies",
		type: "checkbox",
		message: "Select technologies to use",
		defaultOption: undefined,
		choices: cliChoiceArr,
	});

	return options;
};

function getTechnologiesPromptChoices(
	selectedFramework: framework,
	frameworks: frameworks
) {
	const installers = frameworks.find(
		(framework) => framework.name === selectedFramework
	)!.installers;

	const cliChoiceArr = [];
	for (const category in installerCatagories) {
		if (!isNaN(Number(category))) {
			continue;
		}
		cliChoiceArr.push(new inquirer.Separator(` = ${category} = `));
		for (const installer of installers) {
			if (
				installer.category ===
				installerCatagories[
					category as keyof typeof installerCatagories
				]
			) {
				cliChoiceArr.push({
					name: installer.name,
				});
			}
		}
	}
	return cliChoiceArr;
}

const prompt = async <optionType>(promptOptions: {
	name: keyof options;
	type: "input" | "confirm" | "checkbox" | "list";
	message: string;
	defaultOption?: optionType;
	choices?: (inquirer.Separator | { name: string })[] | string[];
}) => {
	const { name, type, message, defaultOption, choices } = promptOptions;
	const result = await inquirer.prompt<{ [name: string]: optionType }>({
		name: name,
		type: type,
		message: message,
		default: defaultOption,
		choices,
	});

	return result[name];
};
