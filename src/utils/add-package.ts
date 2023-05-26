import { PROCESS_PATH } from "./consts.js";
import { insert } from "./edit-file.js";

export const addPackage = async (dependencies: string, dir: string) => {
	insert({
		filename: `${PROCESS_PATH}/package.json`,
		insert: `${dependencies},`,
		matcher: '"dependencies": {',
		direction: "after",
	});
};
