import { installer } from "../../models/installer.js";
import { installDockerfile } from "./dockerfile/docker.js";
import { installRatelimit } from "./ratelimit.js";

export const nestjsInstallers: installer[] = [
	installRatelimit,
	installDockerfile,
];

// JWT basic auth with passport
// Honeybadger
// Dockerfile
// Redis cache
// Stripe integration
