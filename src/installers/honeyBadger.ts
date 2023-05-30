import { projectRootPath } from "../index.js";
import { installer, installerCatagories } from "../models/installer.js";
import { addEnvVar } from "../utils/add-env-var.js";
import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { insert } from "../utils/edit-file.js";
import { importModule } from "../utils/import-module.js";

export const installHoneyBadger: installer = {
	name: "HoneyBadger",
	category: installerCatagories["Logging & Analytics"],
	install: async () => {
		await addPackage(`"@honeybadger-io/react": "^5.4.1"`, projectRootPath);
		await addPackage(`"@honeybadger-io/nextjs": "^5.4.1"`, projectRootPath);
		// await execa("npm", ["i"], { cwd: projectRootPath });
		// await execa("npx", ["honeybadger-copy-config-files"], {
		// 	cwd: projectRootPath,
		// });
		await importModule({
			modules: ["Honeybadger", "HoneybadgerErrorBoundary"],
			file: `${projectRootPath}/src/app/pages/_app.tsx`,
			library: "@honeybadger-io/react",
			isDefault: true,
		});
		await addGlobalProvider(
			projectRootPath,
			"<HoneybadgerErrorBoundary honeybadger={Honeybadger}>",
			"</HoneybadgerErrorBoundary>"
		);
		insert({
			filename: `${projectRootPath}/src/app/pages/_app.tsx`,
			insert: "Honeybadger.configure({ apiKey: process.env.HONEYBADGER_API_KEY })",
			matcher: "// Providers start",
			direction: "after",
		});
		addEnvVar([
			{
				key: "NEXT_PUBLIC_HONEYBADGER_API_KEY",
				value: "HONEYBADGER_API_KEY",
			},
		]);
	},
};
