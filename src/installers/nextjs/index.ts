import { installer } from "../../models/installer";
import { installHoneyBadger } from "./honeyBadger.js";
import { mui } from "./mui.js";
import { i18next } from "./next-i18next/next-i18next.js";
import { plausible } from "./plausible.js";

export const nextjsInstallers: installer[] = [
	mui,
	plausible,
	installHoneyBadger,
	i18next,
];
