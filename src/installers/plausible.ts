import { addGlobalProvider } from "../utils/add-global-provider";

export const installPlausible = async (dir: string): Promise<void> => {
  await addGlobalProvider(
    dir,
    '<PlausibleProvider domain="example.com">',
    "</PlausibleProvider>"
  );
};
