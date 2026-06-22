import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Client, type ClientBase } from "pg";

export const COMPETITORS_MIGRATION_PATH = "supabase/migrations/007_create_competitors.sql";
export const WHITEBOARD_MIGRATION_PATH = "supabase/migrations/008_create_internal_whiteboard.sql";

function getDatabaseUrl() {
  return process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL ?? null;
}

function readMigrationSql(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

async function tableExists(client: ClientBase, tableName: string) {
  const result = await client.query<{ exists: boolean }>(
    `select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = $1
    ) as exists`,
    [tableName],
  );

  return result.rows[0]?.exists === true;
}

async function applyMigration(client: ClientBase, relativePath: string) {
  const sql = readMigrationSql(relativePath);
  await client.query(sql);
  await client.query(`notify pgrst, 'reload schema'`);
}

export function isMissingTableError(error: unknown, tableName: string) {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes(`'public.${tableName}'`) ||
    message.includes(`public.${tableName}`) ||
    message.includes(`relation "${tableName}" does not exist`) ||
    message.includes(`relation "public.${tableName}" does not exist`)
  );
}

export async function ensureCompetitorsTable(): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) return false;

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    if (await tableExists(client, "competitors")) return true;
    await applyMigration(client, COMPETITORS_MIGRATION_PATH);
    return true;
  } finally {
    await client.end().catch(() => undefined);
  }
}

export async function ensureWhiteboardTable(): Promise<boolean> {
  const dbUrl = getDatabaseUrl();
  if (!dbUrl) return false;

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    if (await tableExists(client, "internal_whiteboard")) return true;
    await applyMigration(client, WHITEBOARD_MIGRATION_PATH);
    return true;
  } finally {
    await client.end().catch(() => undefined);
  }
}

export async function ensureInternalFeatureTables() {
  await Promise.all([ensureCompetitorsTable(), ensureWhiteboardTable()]);
}

export async function withCompetitorsTable<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isMissingTableError(error, "competitors")) throw error;
    const applied = await ensureCompetitorsTable();
    if (!applied) throw error;
    return operation();
  }
}

export async function withWhiteboardTable<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (!isMissingTableError(error, "internal_whiteboard")) throw error;
    const applied = await ensureWhiteboardTable();
    if (!applied) throw error;
    return operation();
  }
}
