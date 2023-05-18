import { insert } from "./edit-file.js";

export const addPackage = async (dependencies: string, dir: string) => {
  insert(
    `${dir}/package.json`,
    `${dependencies},`,
    '"dependencies": {',
    "after"
  );
};
