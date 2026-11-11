import { Pool } from "pg";

const globalForPool = globalThis as unknown as { helpPcPool?: Pool };

/** Pool singleton, criado sob demanda (o build não exige DATABASE_URL). */
export function getPool(): Pool {
  if (!globalForPool.helpPcPool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL ausente.");
    }

    globalForPool.helpPcPool = new Pool({
      connectionString,
      max: 5,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  return globalForPool.helpPcPool;
}
