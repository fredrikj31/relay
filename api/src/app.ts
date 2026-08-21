import Fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./plugins/swagger";
import { routes } from "./routes";
import { config } from "./config";
import { databasePlugin } from "./services/database/client";
import { drizzleDatabasePlugin } from "./services/drizzle-database/client";
import { authPlugin } from "./services/auth/client";

const app: FastifyInstance = Fastify({
  logger: true,
});

app
  .register(fastifySwagger, swaggerConfig)
  .register(import("@scalar/fastify-api-reference"), {
    routePrefix: "/docs",
    configuration: {
      mcp: {
        disabled: true,
      },
      agent: {
        disabled: true,
      },
      hideClientButton: true,
      sources: [
        { url: "/api/docs/json", title: "API" }, // API endpoints
        { url: "/api/auth/open-api/generate-schema", title: "Auth" }, // Better Auth schema generation endpoint
      ],
    },
  })
  .register(fastifyCors, {
    origin: config.website.baseUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    maxAge: 86400,
    credentials: true,
  })
  .register(fastifyCookie, {
    parseOptions: {
      path: "/",
      sameSite: true,
    },
  })
  .register(databasePlugin, {
    dbHost: config.database.host,
    dbPort: config.database.port,
    dbUser: config.database.user,
    dbPassword: config.database.password,
    dbName: config.database.name,
  })
  .register(drizzleDatabasePlugin, {
    dbHost: config.database.host,
    dbPort: config.database.port,
    dbUser: config.database.user,
    dbPassword: config.database.password,
    dbName: config.database.name,
  })
  .register(authPlugin, {
    database: app.drizzleDatabase,
  })
  .after(() => {
    app.register(routes, { prefix: "/api" });
  });

app.listen({ host: "0.0.0.0", port: config.api.port }, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

process.on("SIGINT", () => {
  app.log.warn(`SIGINT signal detected, terminating service`);
  app.close();
});

process.on("SIGTERM", () => {
  app.log.warn(`SIGTERM signal detected, terminating service`);
  app.close();
});

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}
