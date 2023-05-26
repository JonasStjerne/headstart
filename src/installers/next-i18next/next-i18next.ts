import fs from "fs-extra";
import { installer, installerCatagories } from "../../models/installer";
import { addPackage } from "../../utils/add-package";
import { PKG_ROOT } from "../../utils/consts";
import { insert } from "../../utils/edit-file";
import { importModule } from "../../utils/import-module";

export const i18next: installer = {
	name: "Internationalization",
	category: installerCatagories["Visuals"],
	install: async (dir: string) => {
		await addPackage(`"next-i18next": "latest"`, dir);
		await addPackage(`"react-i18next": "latest"`, dir);
		await addPackage(`"i18next": "latest"`, dir);
		await insert({
			filename: dir + "/next.config.js",
			insert: "i18n,",
			matcher: "// Next.js config",
			direction: "after",
		});
		await insert({
			filename: dir + "/next.config.js",
			insert: "const { i18n } = require('./next-i18next.config')",
			matcher: "// Imports",
			direction: "after",
		});
		fs.copySync(
			`${PKG_ROOT}/src/installers/next-i18next/templates/next-i18next.config.js`,
			dir
		);
		fs.copySync(
			`${PKG_ROOT}/src/installers/next-i18next/templates/locales`,
			`${dir}/public`
		);
		importModule({
			modules: ["appWithTranslation"],
			file: `${dir}/pages/_app.tsx`,
			library: "next-i18next",
			isDefault: false,
		});
		insert({
			filename: `${dir}/pages/_app.tsx`,
			insert: "export default appWithTranslation(MyApp)",
			matcher: "// Lower file",
			direction: "after",
		});
	},
};
