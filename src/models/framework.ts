import { installer } from "./installer";

export type framework = "Next.js" | "NestJS";
export type frameworks = {
	name: framework;
	templateName: templateNames;
	installers: installer[];
}[];
export type templateNames = "nextjs" | "nestjs";
