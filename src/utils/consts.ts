import path from "path";
import { fileURLToPath } from "url";
import { templateNames } from "../models/framework";

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, "../../");
export const PROCESS_PATH = process.cwd();
export const INSTALLERS_BASE_PATH = (templateName: templateNames) =>
	`${PKG_ROOT}src/installers/${templateName}`;
