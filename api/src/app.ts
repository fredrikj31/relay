import Fastify, { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { routes } from "./routes";
import { config } from "./config";
import { databasePlugin } from "./services/database/client";

const app: FastifyInstance = Fastify({
  logger: true,
});

app
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
