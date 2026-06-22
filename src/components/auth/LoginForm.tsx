"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(text.slice(0, 120) || "Unexpected server response");
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await readApiJson<{ redirectPath?: string; error?: string }>(response);
      if (!response.ok || !data.redirectPath) {
        throw new Error(data.error ?? "Unable to sign in");
      }

      router.push(data.redirectPath);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to sign in");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-foreground">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="Enter your password"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0b2d63] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#082652] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? "Connecting…" : "Connect"}
        </button>

        <p className="text-center text-sm text-muted">
          <button
            type="button"
            className="font-medium text-[#0b2d63] underline-offset-2 hover:underline"
            onClick={() => setError("Password reset is not available yet.")}
          >
            Reset password
          </button>
        </p>
      </form>
    </div>
  );
}
