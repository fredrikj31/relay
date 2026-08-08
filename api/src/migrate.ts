import { drizzle } from "drizzle-orm/node-postgres"; // swap for your driver, see note below
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Pool } from "pg";
import { config } from "./config";

const pool = new Pool({
  host: config.database.host,
  port: Number(config.database.port),
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
});

async function main() {
  const migrationsFolder = process.env.MIGRATIONS_FOLDER ?? "/app/drizzle";
  const db = drizzle({
    client: pool,
  });
  await migrate(db, { migrationsFolder });
  console.log("Migrations applied ✅");
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed ❌", err);
  process.exit(1);
});
