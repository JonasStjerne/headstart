import { installer } from "./installer";

export type framework = "Next.js" | "NestJS";
export type frameworks = {
	name: framework;
	templateName: string;
	installers: installer[];
}[];
