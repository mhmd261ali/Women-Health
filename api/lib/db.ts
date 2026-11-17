import pg from "pg";

const { Pool } = pg;

declare global {
  // eslint-disable-next-line no-var
  var __tipsPgPool: pg.Pool | undefined;
}

export function getPool(): pg.Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!globalThis.__tipsPgPool) {
    globalThis.__tipsPgPool = new Pool({
      connectionString,
      ssl:
        process.env.DATABASE_SSL === "false"
          ? undefined
          : { rejectUnauthorized: false },
      max: 5,
    });
  }

  return globalThis.__tipsPgPool;
}
