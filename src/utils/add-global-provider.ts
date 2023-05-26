import { insert } from "./edit-file.js";

export const addGlobalProvider = async (
	dir: string,
	startTag: string,
	closeTag: string
) => {
	const targetFile = `${dir}/src/app/pages/_app.tsx`;
	await insert({
		filename: targetFile,
		insert: startTag,
		matcher: "// Providers start",
		direction: "after",
	});
	await insert({
		filename: targetFile,
		insert: closeTag,
		matcher: "// Providers end",
		direction: "before",
	});
};
