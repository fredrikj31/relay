import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "../../config";
import { relations } from "./relations";

export const databaseClient = drizzle({
  connection: {
    connectionString: `postgresql://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`,
  },
  relations,
});

type DatabaseClient = typeof databaseClient;
type Transaction = Parameters<Parameters<DatabaseClient["transaction"]>[0]>[0];
export type Database = DatabaseClient | Transaction;
