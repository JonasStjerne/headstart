import { projectRootPath } from "../index.js";
import { insert } from "./edit-file.js";

export const addPackage = async (dependencies: string, dir: string) => {
	insert({
		filename: `${projectRootPath}/package.json`,
		insert: `${dependencies},`,
		matcher: '"dependencies": {',
		direction: "after",
	});
};
