import { FastifyPluginAsync } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { contactRoutes } from "./contacts";
import { roomRoutes } from "./rooms";
import { authRoutes } from "./auth";

export const routes: FastifyPluginAsync = async (instance) => {
  instance.setValidatorCompiler(validatorCompiler);
  instance.setSerializerCompiler(serializerCompiler);

  instance.register(authRoutes, { prefix: "/" });
  instance.register(contactRoutes, { prefix: "/contacts" });
  instance.register(roomRoutes, { prefix: "/rooms" });

  const app = instance.withTypeProvider<ZodTypeProvider>();

  app.get(
    "/healthcheck",
    {
      schema: {
        summary: "Healthcheck Endpoint",
        description: "Pings the server, to test the connection",
        tags: ["healthcheck"],
        response: {
          "200": z.object({ ok: z.boolean() }),
        },
      },
    },
    async (_, res) => {
      return res.send({ ok: true });
    },
  );

  app.get(
    "/docs/json", // Make it available for API docs website to fetch JSON file
    {
      schema: {
        hide: true, // Hide from API & Swagger docs (UI & JSON)
        response: {
          "200": z.any(),
        },
        summary: "Receive Swagger docs in JSON format",
        tags: ["Documentation"],
      },
    },
    async (_, res) => {
      return res.send(app.swagger());
    },
  );
};
