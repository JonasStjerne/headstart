import { execa } from "execa";
import { addGlobalProvider } from "../utils/add-global-provider.js";
import { addPackage } from "../utils/add-package.js";
import { importModule } from "../utils/import-module.js";

export const installHoneyBadger = async (dir: string): Promise<void> => {
  await addPackage(`"@honeybadger-io/react": "^5.4.1"`, dir);
  await addPackage(`"@honeybadger-io/nextjs": "^5.4.1"`, dir);
  await execa("npx", ["honeybadger-copy-config-files"], { cwd: dir });
  await importModule(
    ["Honeybadger", "HoneybadgerErrorBoundary"],
    `${dir}/src/page.tsx`,
    "@honeybadger-io/react",
    true
  );
  await addGlobalProvider(
    dir,
    "<HoneybadgerErrorBoundary honeybadger={Honeybadger}>",
    "</HoneybadgerErrorBoundary>"
  );
};
