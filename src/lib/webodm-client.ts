import { getServerWebODMUrl, isWebODMServerConfigured } from "@/lib/webodm-env";
import {
  AERIAL_INTELLIGENCE_DELIVERABLES,
  formatFileSize,
  type WebODMDeliverable,
  type WebODMDeliverablesMission,
} from "@/lib/webodm-deliverables";

export function getWebODMBaseUrl() {
  return getServerWebODMUrl();
}

export function isWebODMConfigured() {
  return isWebODMServerConfigured();
}

export function taskStatusLabel(status: number) {
  switch (status) {
    case 10:
      return "Queued";
    case 20:
      return "Running";
    case 30:
      return "Failed";
    case 40:
      return "Completed";
    case 50:
      return "Canceled";
    default:
      return "Unknown";
  }
}

export type WebODMTaskSummary = {
  id: string;
  name: string;
  status: number;
  statusLabel: string;
  createdAt: string | null;
  processingTimeMs: number | null;
  imagesCount: number | null;
};

export type WebODMProjectSummary = {
  id: number;
  name: string;
  createdAt: string;
  taskCount: number;
  tasks: WebODMTaskSummary[];
};

type RawProject = {
  id: number;
  name: string;
  created_at: string;
};

type RawTask = {
  id: string;
  name: string;
  status: number;
  created_at?: string;
  processing_time?: number;
  images_count?: number;
  available_assets?: string[];
};

type RawTaskDetail = RawTask & {
  available_assets: string[];
};

async function getWebODMToken() {
  const username = process.env.WEBODM_USERNAME;
  const password = process.env.WEBODM_PASSWORD;

  if (!username || !password) {
    throw new Error("WebODM credentials are not configured.");
  }

  const baseUrl = getWebODMBaseUrl();
  if (!baseUrl) {
    throw new Error("WEBODM_URL is not configured.");
  }

  const response = await fetch(`${baseUrl}/api/token-auth/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }).toString(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("WebODM authentication failed. Check WEBODM_USERNAME and WEBODM_PASSWORD.");
  }

  const data = (await response.json()) as { token: string };
  return data.token;
}

async function webodmFetch<T>(path: string, token: string) {
  const baseUrl = getWebODMBaseUrl();
  if (!baseUrl) {
    throw new Error("WEBODM_URL is not configured.");
  }

  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Authorization: `JWT ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`WebODM request failed (${response.status}). Is WebODM running?`);
  }

  return response.json() as Promise<T>;
}

async function webodmFetchRaw(path: string, token: string, init?: RequestInit) {
  const baseUrl = getWebODMBaseUrl();
  if (!baseUrl) {
    throw new Error("WEBODM_URL is not configured.");
  }

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      Authorization: `JWT ${token}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

async function fetchAssetMeta(
  projectId: number,
  taskId: string,
  asset: string,
  token: string,
): Promise<{ sizeBytes: number | null; mimeType: string | null } | null> {
  const response = await webodmFetchRaw(
    `/api/projects/${projectId}/tasks/${taskId}/download/${asset}`,
    token,
    { method: "HEAD" },
  );

  if (!response.ok) return null;

  const contentLength = response.headers.get("content-length");
  return {
    sizeBytes: contentLength ? Number.parseInt(contentLength, 10) : null,
    mimeType: response.headers.get("content-type"),
  };
}

export async function fetchTaskDeliverables(
  taskName: string,
): Promise<{ mission: WebODMDeliverablesMission; deliverables: WebODMDeliverable[] }> {
  const token = await getWebODMToken();
  const projects = await webodmFetch<RawProject[]>("/api/projects/", token);

  for (const project of projects) {
    const tasks = await webodmFetch<RawTask[]>(`/api/projects/${project.id}/tasks/`, token);
    const match = tasks.find((task) => task.name === taskName);
    if (!match) continue;

    const detail = await webodmFetch<RawTaskDetail>(
      `/api/projects/${project.id}/tasks/${match.id}/`,
      token,
    );

    const available = new Set(detail.available_assets ?? []);
    const deliverables = await Promise.all(
      AERIAL_INTELLIGENCE_DELIVERABLES.filter((item) => available.has(item.asset)).map(
        async (item) => {
          const meta = await fetchAssetMeta(project.id, match.id, item.asset, token);

          return {
            ...item,
            status: "ready" as const,
            sizeBytes: meta?.sizeBytes ?? null,
            sizeLabel: formatFileSize(meta?.sizeBytes),
            mimeType: meta?.mimeType ?? null,
          };
        },
      ),
    );

    return {
      mission: {
        projectId: project.id,
        taskId: match.id,
        name: match.name,
        statusLabel: taskStatusLabel(match.status),
        imagesCount: match.images_count ?? null,
        processingTimeMs: match.processing_time ?? null,
        createdAt: match.created_at ?? null,
      },
      deliverables,
    };
  }

  throw new Error(`No WebODM task found with name "${taskName}".`);
}

export async function fetchWebODMProjectsWithTasks(): Promise<WebODMProjectSummary[]> {
  const token = await getWebODMToken();
  const projects = await webodmFetch<RawProject[]>("/api/projects/", token);

  return Promise.all(
    projects.map(async (project) => {
      const tasks = await webodmFetch<RawTask[]>(`/api/projects/${project.id}/tasks/`, token);

      return {
        id: project.id,
        name: project.name,
        createdAt: project.created_at,
        taskCount: tasks.length,
        tasks: tasks.map((task) => ({
          id: task.id,
          name: task.name || "Untitled task",
          status: task.status,
          statusLabel: taskStatusLabel(task.status),
          createdAt: task.created_at ?? null,
          processingTimeMs: task.processing_time ?? null,
          imagesCount: task.images_count ?? null,
        })),
      };
    }),
  );
}
