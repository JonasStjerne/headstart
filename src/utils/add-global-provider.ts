import { insert } from "./edit-file";

export const addGlobalProvider = async (
  dir: string,
  startTag: string,
  closeTag: string
) => {
  await insert(dir, startTag, "// Providers start", "after");
  await insert(dir, closeTag, "// Providers end", "before");
};
