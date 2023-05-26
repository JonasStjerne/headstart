import { execa } from "execa";
import { installer, installerCatagories } from "../models/installer.js";
import { addEnvVar } from "../utils/add-env-var.js";
import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { insert } from "../utils/edit-file.js";
import { importModule } from "../utils/import-module.js";

export const installHoneyBadger: installer = {
	name: "HoneyBadger",
	category: installerCatagories["Logging & Analytics"],
	install: async (dir: string) => {
		await addPackage(`"@honeybadger-io/react": "^5.4.1"`, dir);
		await addPackage(`"@honeybadger-io/nextjs": "^5.4.1"`, dir);
		await execa("npx", ["honeybadger-copy-config-files"], { cwd: dir });
		await importModule({
			modules: ["Honeybadger", "HoneybadgerErrorBoundary"],
			file: `${dir}/src/app/pages/_app.tsx`,
			library: "@honeybadger-io/react",
			isDefault: true,
		});
		await addGlobalProvider(
			dir,
			"<HoneybadgerErrorBoundary honeybadger={Honeybadger}>",
			"</HoneybadgerErrorBoundary>"
		);
		insert({
			filename: `${dir}/src/app/pages/_app.tsx`,
			insert: "Honeybadger.configure({ apiKey: process.env.HONEYBADGER_API_KEY })",
			matcher: "// Providers start",
			direction: "after",
		});
		addEnvVar(
			[
				{
					key: "NEXT_PUBLIC_HONEYBADGER_API_KEY",
					value: "HONEYBADGER_API_KEY",
				},
			],
			dir
		);
	},
};
