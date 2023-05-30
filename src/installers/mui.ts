import { projectRootPath } from "../index.js";
import { installerCatagories } from "../models/installer.js";
import { addPackage } from "../utils/add-package.js";

export const mui = {
	name: "MUI",
	category: installerCatagories["Visuals"],

	install: async () => {
		await addPackage(`"@mui/material": "^1.0.0"`, projectRootPath);
		await addPackage(`"@emotion/react": "^1.0.0"`, projectRootPath);
		await addPackage(`"@emotion/styled": "^1.0.0"`, projectRootPath);
	},
};
