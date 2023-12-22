import { projectRootPath } from "../../index.js";
import { installerCatagories } from "../../models/installer.js";
import { addPackage } from "../../utils/add-package.js";

export const mui = {
	name: "MUI",
	category: installerCatagories["Visuals"],

	install: async () => {
		await addPackage(`"@mui/material": "latest"`, projectRootPath);
		await addPackage(`"@emotion/react": "latest"`, projectRootPath);
		await addPackage(`"@emotion/styled": "latest"`, projectRootPath);
	},
};
