import fs from "fs-extra";
import { projectRootPath } from "../../../index.js";
import { installer, installerCatagories } from "../../../models/installer.js";
import { INSTALLERS_BASE_PATH } from "../../../utils/consts.js";

const installerPath = INSTALLERS_BASE_PATH("nestjs");
export const installDockerfile: installer = {
	name: "Dockerfile",
	category: installerCatagories.Other,
	install: async () => {
		fs.copySync(
			`${installerPath}/dockerfile/templates/Dockerfile`,
			`${projectRootPath}/Dockerfile`
		);
		fs.copySync(
			`${installerPath}/dockerfile/templates/.dockerignore`,
			`${projectRootPath}/.dockerignore`
		);
	},
};
