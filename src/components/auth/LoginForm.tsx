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

type LoginFormProps = {
  variant?: "default" | "marketing";
};

export default function LoginForm({ variant = "default" }: LoginFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const isMarketing = variant === "marketing";

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

  const cardClass = isMarketing
    ? "rounded-xl bg-white px-5 py-6 shadow-[0_4px_24px_rgba(11,45,99,0.12)] sm:px-8 sm:py-8"
    : "rounded-2xl border border-border bg-surface p-6 sm:p-8";

  const labelClass = isMarketing
    ? "mb-1.5 block text-sm font-medium text-[#1a2b4a]"
    : "mb-1.5 block text-sm font-medium text-foreground";

  const fieldClass = isMarketing
    ? "w-full rounded-lg border border-[#d7e3f4] bg-white px-4 py-2.5 text-sm text-[#1a2b4a] placeholder:text-[#1a2b4a]/45 focus:border-[#2563eb] focus:outline-none focus:ring-1 focus:ring-[#2563eb]"
    : "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  const buttonClass = isMarketing
    ? "inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-[0_0_32px_rgba(37,99,235,0.35)] transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
    : "inline-flex h-11 w-full items-center justify-center rounded-md bg-[#0b2d63] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#082652] disabled:cursor-not-allowed disabled:opacity-70";

  const errorClass = isMarketing
    ? "rounded-lg border border-red-400/30 bg-red-50 px-3 py-2 text-sm text-red-700"
    : "rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-700";

  return (
    <div className={cardClass}>
      {isMarketing && (
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-[#1a2b4a]">Welcome back</p>
          <p className="mt-1 text-sm text-[#1a2b4a]/65">
            Sign in with the username and password provided to your organisation.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="username" className={labelClass}>
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
            className={fieldClass}
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
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
            className={fieldClass}
            placeholder="Enter your password"
          />
        </div>

        {error && <p className={errorClass}>{error}</p>}

        <button type="submit" disabled={busy} className={buttonClass}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
