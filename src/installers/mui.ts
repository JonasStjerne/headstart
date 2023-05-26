import { installerCatagories } from "../models/installer.js";
import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { importModule } from "../utils/import-module.js";

export const mui = {
	name: "MUI",
	category: installerCatagories["Visuals"],

	install: async (dir: string) => {
		await addPackage(`"@mui/material": "^1.0.0"`, dir);
		await addPackage(`"@emotion/react": "^1.0.0"`, dir);
		await addPackage(`"@emotion/styled": "^1.0.0"`, dir);
		await importModule({
			modules: ["PlausibleProvider"],
			file: dir,
			library: "react-plausible",
			isDefault: true,
		});
		await addGlobalProvider(
			dir,
			'<PlausibleProvider domain="example.com">',
			"</PlausibleProvider>"
		);
	},
};
