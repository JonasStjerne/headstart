import { projectRootPath } from "../../index.js";
import { installerCatagories } from "../../models/installer.js";
import { addGlobalProvider } from "../../utils/add-global-provider.js";
import { addPackage } from "../../utils/add-package.js";
import { importModule } from "../../utils/import-module.js";

export const plausible = {
	name: "Plausible",
	category: installerCatagories["Logging & Analytics"],

	install: async () => {
		await addPackage(`"next-plausible": "latest"`, projectRootPath);
		await importModule({
			modules: ["PlausibleProvider"],
			file: `${projectRootPath}/src/app/pages/_app.tsx`,
			library: "react-plausible",
			isDefault: true,
		});
		await addGlobalProvider(
			projectRootPath,
			'<PlausibleProvider domain="example.com">',
			"</PlausibleProvider>"
		);
	},
};
