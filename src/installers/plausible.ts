import { addPackage } from "src/utils/add-package";
import { addGlobalProvider } from "../utils/add-global-provider";

export const installPlausible = async (dir: string): Promise<void> => {
  await addPackage(`"react-plausible": "^1.0.0"`, dir);
  await addGlobalProvider(
    dir,
    '<PlausibleProvider domain="example.com">',
    "</PlausibleProvider>"
  );
};
