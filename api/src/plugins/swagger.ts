import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { config } from "../config";

export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  mode: "dynamic",
  openapi: {
    openapi: "3.0.0",
    info: {
      title: "Relay API",
      description: 'The main and only API behind "relay"',
      version: "0.0.1",
    },
    externalDocs: {
      url: "https://github.com/fredrikj31/relay",
      description: "Find more info here",
    },
    servers: [
      {
        url: `http://127.0.0.1:${config.api.port}/api`,
        description: "Local running API",
      },
    ],
    components: {
      securitySchemes: {
        jwt: {
          name: "Authorization",
          in: "header",
          type: "apiKey",
          description: "Authentication with your access token",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
};
