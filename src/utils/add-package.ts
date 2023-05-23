import { PROCESS_PATH } from "./consts.js";
import { insert } from "./edit-file.js";

export const addPackage = async (dependencies: string, dir: string) => {
  insert(
    `${PROCESS_PATH}/package.json`,
    `${dependencies},`,
    '"dependencies": {',
    "after"
  );
};
