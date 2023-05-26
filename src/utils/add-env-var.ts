import path from "path";
import { projectRootPath } from "../index.js";
import { insert } from "./edit-file.js";

export const addEnvVar = (
	envVar: { key: string; value: string } | { key: string; value: string }[]
) => {
	if (Array.isArray(envVar)) {
		envVar.forEach((envVar) => {
			addEnvVar(envVar);
		});
	} else {
		const { key, value } = envVar;
		const envPath = path.join(projectRootPath, ".env.local");
		insert({
			filename: envPath,
			insert: `${key}=${value}`,
			matcher: "# Start",
			direction: "after",
		});
	}
};
