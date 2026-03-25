import { FastifyPluginAsync } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { z } from "zod";
import { actionRoutes } from "./actions";

export const routes: FastifyPluginAsync = async (instance) => {
  instance.setValidatorCompiler(validatorCompiler);
  instance.setSerializerCompiler(serializerCompiler);

  instance.register(actionRoutes, { prefix: "/" });

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
};
