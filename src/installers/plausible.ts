import { installerCatagories } from "../models/installer.js";
import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { importModule } from "../utils/import-module.js";

export const plausible = {
  name: "Plausible",
  category: installerCatagories["Logging & Analytics"],

  install: async (dir: string) => {
    await addPackage(`"react-plausible": "^1.0.0"`, dir);
    await importModule({modules: ["PlausibleProvider"], file: `${dir}/src/app/pages/_app.tsx`, "react-plausible", true});
    await addGlobalProvider(
      dir,
      '<PlausibleProvider domain="example.com">',
      "</PlausibleProvider>"
    );
  },
};
