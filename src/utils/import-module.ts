import { insert } from "./edit-file.js";

export const importModule = async (
  modules: string[],
  file: string,
  library: string,
  isDefault: boolean = false
) => {
  const importStatement = `import ${
    isDefault ? modules : `{ ${modules.join(", ")} }`
  } from "${library}";`;
  await insert(file, importStatement, "// Imports", "after");
};
