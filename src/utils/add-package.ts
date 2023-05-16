import { insert } from "./edit-file";

export const addPackage = async (dependencies: string, dir: string) => {
  insert(`${dir}/package.json`, dependencies, '"dependencies": {', "after");
};
