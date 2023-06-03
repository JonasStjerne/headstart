import { projectRootPath } from "../../index.js";
import { installer, installerCatagories } from "../../models/installer.js";
import { addEnvVar, addPackage, insert } from "../../utils/utils.js";

export const installRatelimit: installer = {
	name: "Ratelimiting",
	category: installerCatagories["Security"],
	install: async () => {
		await addPackage('"@nestjs/throttler": "^3.1.0"', projectRootPath);
		insert({
			filename: `${projectRootPath}/src/app.module.ts`,
			insert: `ThrottlerModule.forRoot({
                ttl: parseInt(process.env.RATE_LIMIT_TTL!),
                limit: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS!),
            }),`,
			matcher: "// App module imports",
			direction: "after",
		});
		addEnvVar([
			{
				key: "RATE_LIMIT_TTL",
				value: "60",
			},
			{
				key: "RATE_LIMIT_MAX_REQUESTS",
				value: "100",
			},
		]);
	},
};
