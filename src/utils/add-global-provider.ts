import { insert } from "./edit-file.js";

export const addGlobalProvider = async (
  dir: string,
  startTag: string,
  closeTag: string
) => {
  const targetFile = `${dir}/src/app/page.tsx`;
  await insert(targetFile, startTag, "// Providers start", "after");
  await insert(targetFile, closeTag, "// Providers end", "before");
};
