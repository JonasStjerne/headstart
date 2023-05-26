import { insert } from "./edit-file.js";

export const importModule = async ({
	modules,
	file,
	library,
	isDefault = false,
}: {
	modules: string[];
	file: string;
	library: string;
	isDefault: boolean;
}) => {
	const importStatement = `import ${
		isDefault ? modules : `{ ${modules.join(", ")} }`
	} from "${library}";`;
	await insert({
		filename: file,
		insert: importStatement,
		matcher: "// Imports",
		direction: "after",
	});
};
