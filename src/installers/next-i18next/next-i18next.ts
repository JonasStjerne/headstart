import fs from "fs-extra";
import { projectRootPath } from "../../index.js";
import { installer, installerCatagories } from "../../models/installer.js";
import { addPackage } from "../../utils/add-package.js";
import { PKG_ROOT } from "../../utils/consts.js";
import { insert } from "../../utils/edit-file.js";
import { importModule } from "../../utils/import-module.js";

export const i18next: installer = {
	name: "Internationalization",
	category: installerCatagories["Visuals"],
	install: async () => {
		await addPackage(`"next-i18next": "latest"`, projectRootPath);
		await addPackage(`"react-i18next": "latest"`, projectRootPath);
		await addPackage(`"i18next": "latest"`, projectRootPath);
		await insert({
			filename: projectRootPath + "/next.config.js",
			insert: "i18n,",
			matcher: "// Next.js config",
			direction: "after",
		});
		await insert({
			filename: projectRootPath + "/next.config.js",
			insert: "const { i18n } = require('./next-i18next.config')",
			matcher: "// Imports",
			direction: "after",
		});
		fs.copySync(
			`${PKG_ROOT}/src/installers/next-i18next/templates/next-i18next.config.js`,
			projectRootPath
		);
		fs.copySync(
			`${PKG_ROOT}/src/installers/next-i18next/templates/locales`,
			`${projectRootPath}/public`
		);
		importModule({
			modules: ["appWithTranslation"],
			file: `${projectRootPath}/pages/_app.tsx`,
			library: "next-i18next",
			isDefault: false,
		});
		insert({
			filename: `${projectRootPath}/pages/_app.tsx`,
			insert: "export default appWithTranslation(MyApp)",
			matcher: "// Lower file",
			direction: "after",
		});
	},
};
