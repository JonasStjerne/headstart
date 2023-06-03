import { installer } from "../../models/installer";
import { installRatelimit } from "./ratelimit.js";

export const nestjsInstallers: installer[] = [installRatelimit];

// Ratelimiting
// JWT basic auth with passport
// TypeORM
// Honeybadger
// Dockerfile
// Redis cache
// Stripe integration
