import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";

export const installPlausible = async (dir: string): Promise<void> => {
  await addPackage(`"react-plausible": "^1.0.0"`, dir);
  await addGlobalProvider(
    dir,
    '<PlausibleProvider domain="example.com">',
    "</PlausibleProvider>"
  );
};
