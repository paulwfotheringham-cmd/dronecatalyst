import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Client, type ClientBase } from "pg";

export const COMPETITORS_MIGRATION_PATH = "supabase/migrations/007_create_competitors.sql";
export const WHITEBOARD_MIGRATION_PATH = "supabase/migrations/008_create_internal_whiteboard.sql";

function getDatabaseUrl() {
  return process.env.SUPABASE_DB_URL ?? process.env.DATABASE_URL ?? null;
}

function getSupabaseProjectRef() {
  if (process.env.SUPABASE_PROJECT_REF) return process.env.SUPABASE_PROJECT_REF;
  const url = process.env.SUPABASE_URL;
  if (!url) return null;
  try {
    return new URL(url).hostname.split(".")[0] ?? null;
  } catch {
    return null;
  }
}

function readMigrationSql(relativePath: string) {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

async function tableExistsViaManagementApi(tableName: string) {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const projectRef = getSupabaseProjectRef();
  if (!token || !projectRef) return null;

  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `select exists (
          select 1 from information_schema.tables
          where table_schema = 'public' and table_name = '${tableName}'
        ) as exists`,
      }),
    },
  );

  const data = (await response.json()) as Array<{ exists?: boolean }> | { message?: string };
  if (!response.ok) return null;
  if (Array.isArray(data)) return data[0]?.exists === true;
  return null;
}

async function applyMigrationViaManagementApi(relativePath: string) {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const projectRef = getSupabaseProjectRef();
  if (!token || !projectRef) return false;

  const sql = readMigrationSql(relativePath);
  const response = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    },
  );

  if (!response.ok) return false;

  await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: `notify pgrst, 'reload schema'` }),
  });

  return true;
}

async function reloadPostgrestSchema() {
  const token = process.env.SUPABASE_ACCESS_TOKEN;
  const projectRef = getSupabaseProjectRef();
  if (token && projectRef) {
    await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: `notify pgrst, 'reload schema'` }),
    });
    return true;
  }

  const dbUrl = getDatabaseUrl();
  if (!dbUrl) return false;

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    await client.query(`notify pgrst, 'reload schema'`);
    return true;
  } finally {
    await client.end().catch(() => undefined);
  }
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
    message.includes("schema cache") ||
    message.includes(`'public.${tableName}'`) ||
    message.includes(`public.${tableName}`) ||
    message.includes(`relation "${tableName}" does not exist`) ||
    message.includes(`relation "public.${tableName}" does not exist`)
  );
}

export async function ensureCompetitorsTable(): Promise<boolean> {
  const exists = await tableExistsViaManagementApi("competitors");
  if (exists === true) return true;

  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
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

  if (exists === false) {
    return applyMigrationViaManagementApi(COMPETITORS_MIGRATION_PATH);
  }

  return false;
}

export async function ensureWhiteboardTable(): Promise<boolean> {
  const exists = await tableExistsViaManagementApi("internal_whiteboard");
  if (exists === true) return true;

  const dbUrl = getDatabaseUrl();
  if (dbUrl) {
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

  if (exists === false) {
    const applied = await applyMigrationViaManagementApi(WHITEBOARD_MIGRATION_PATH);
    if (applied) await reloadPostgrestSchema();
    return applied;
  }

  return false;
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
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (!isMissingTableError(error, "internal_whiteboard")) throw error;
      await ensureWhiteboardTable();
      await reloadPostgrestSchema();
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  }

  throw new Error("Failed to access internal whiteboard table.");
}
