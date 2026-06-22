"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types";
import { Loader2, PenLine } from "lucide-react";

import { EMPTY_WHITEBOARD_SCENE, type WhiteboardScene } from "@/lib/whiteboard-data";

import "@excalidraw/excalidraw/index.css";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[480px] items-center justify-center text-sm text-white/50">
        Loading editor…
      </div>
    ),
  },
);

async function readApiJson<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error(`Request failed (${response.status})`);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(response.ok ? "Invalid server response." : text.slice(0, 180));
  }
}

export default function WhiteboardWorkspace() {
  const [scene, setScene] = useState<WhiteboardScene>(EMPTY_WHITEBOARD_SCENE);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadScene = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch("/api/whiteboard", { cache: "no-store" });
      const data = await readApiJson<{ scene?: WhiteboardScene; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to load whiteboard");
      setScene(data.scene ?? EMPTY_WHITEBOARD_SCENE);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load whiteboard");
      setScene(EMPTY_WHITEBOARD_SCENE);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void loadScene();
  }, [loadScene]);

  const persistScene = useCallback(async (nextScene: WhiteboardScene) => {
    setSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/whiteboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextScene),
      });

      const data = await readApiJson<{ scene?: WhiteboardScene; error?: string }>(response);
      if (!response.ok) throw new Error(data.error ?? "Failed to save whiteboard");
      if (data.scene) setScene(data.scene);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save whiteboard");
    } finally {
      setSaving(false);
    }
  }, []);

  const handleChange = useCallback(
    (elements: WhiteboardScene["elements"], appState: AppState, files: BinaryFiles) => {
      const nextScene: WhiteboardScene = {
        elements,
        appState: {
          viewBackgroundColor: appState.viewBackgroundColor,
          currentItemStrokeColor: appState.currentItemStrokeColor,
          currentItemBackgroundColor: appState.currentItemBackgroundColor,
          currentItemFillStyle: appState.currentItemFillStyle,
          currentItemStrokeWidth: appState.currentItemStrokeWidth,
          currentItemRoughness: appState.currentItemRoughness,
          currentItemOpacity: appState.currentItemOpacity,
          currentItemFontFamily: appState.currentItemFontFamily,
          currentItemFontSize: appState.currentItemFontSize,
          currentItemTextAlign: appState.currentItemTextAlign,
          currentItemStartArrowhead: appState.currentItemStartArrowhead,
          currentItemEndArrowhead: appState.currentItemEndArrowhead,
          scrollX: appState.scrollX,
          scrollY: appState.scrollY,
          zoom: appState.zoom,
          theme: appState.theme,
        },
        files,
      };

      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        void persistScene(nextScene);
      }, 600);
    },
    [persistScene],
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const hasStoredContent =
    (scene.elements?.length ?? 0) > 0 || Object.keys(scene.files).length > 0;

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <section className="shrink-0 rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa]">
              <PenLine className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Whiteboard</h2>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/50">
                Shared team canvas for ideas, flows, and notes. Changes save to Supabase and are
                visible to all internal users.
              </p>
            </div>
          </div>
          {saving && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/55">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Saving…
            </span>
          )}
        </div>
      </section>

      {error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="relative min-h-[calc(100dvh-16rem)] flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#1e1e1e] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {!loaded ? (
          <div className="flex h-full min-h-[480px] items-center justify-center gap-2 text-sm text-white/50">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading whiteboard…
          </div>
        ) : (
          <div className="absolute inset-0">
            <Excalidraw
              theme="dark"
              initialData={
                hasStoredContent
                  ? {
                      elements: scene.elements,
                      appState: scene.appState,
                      files: scene.files,
                    }
                  : { appState: { theme: "dark" } }
              }
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
