import { defineConfig } from "drizzle-kit";
import { config } from "./src/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/services/drizzle-database/schemas/*",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
  },
});
