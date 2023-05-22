import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { importModule } from "../utils/import-module.js";

export const installPlausible = async (dir: string): Promise<void> => {
  await addPackage(`"react-plausible": "^1.0.0"`, dir);
  await importModule(["PlausibleProvider"], dir, "react-plausible", true);
  await addGlobalProvider(
    dir,
    '<PlausibleProvider domain="example.com">',
    "</PlausibleProvider>"
  );
};
