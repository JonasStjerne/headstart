import path from "path";
import { insert } from "./edit-file";

export const addEnvVar = (
	envVar: { key: string; value: string } | { key: string; value: string }[],
	dir: string
) => {
	if (Array.isArray(envVar)) {
		envVar.forEach((envVar) => {
			addEnvVar(envVar, dir);
		});
	} else {
		const { key, value } = envVar;
		const envPath = path.join(dir, ".env.local");
		insert({
			filename: envPath,
			insert: `${key}=${value}`,
			matcher: "# Start",
			direction: "after",
		});
	}
};
