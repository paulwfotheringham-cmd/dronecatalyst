"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { AppState, BinaryFiles, ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";
import { PenLine } from "lucide-react";

import "@excalidraw/excalidraw/index.css";

const STORAGE_KEY = "dronecatalyst-internal-whiteboard";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full min-h-[480px] items-center justify-center text-sm text-white/50">
        Loading whiteboard…
      </div>
    ),
  },
);

type StoredScene = {
  elements: ExcalidrawInitialDataState["elements"];
  appState: Partial<AppState>;
  files: BinaryFiles;
};

function loadStoredScene(): StoredScene | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredScene;
  } catch {
    return null;
  }
}

function pickPersistedAppState(appState: AppState): Partial<AppState> {
  return {
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
  };
}

function persistScene(
  elements: ExcalidrawInitialDataState["elements"],
  appState: AppState,
  files: BinaryFiles,
) {
  const payload: StoredScene = {
    elements,
    appState: pickPersistedAppState(appState),
    files,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export default function WhiteboardWorkspace() {
  const [initialData, setInitialData] = useState<StoredScene | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInitialData(loadStoredScene());
  }, []);

  const handleChange = useCallback(
    (elements: ExcalidrawInitialDataState["elements"], appState: AppState, files: BinaryFiles) => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      saveTimerRef.current = setTimeout(() => {
        persistScene(elements, appState, files);
      }, 400);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, []);

  const hasStoredContent =
    initialData != null &&
    ((initialData.elements?.length ?? 0) > 0 || Object.keys(initialData.files).length > 0);

  return (
    <div className="flex min-h-0 flex-col gap-4">
      <section className="shrink-0 rounded-2xl border border-white/15 bg-white/[0.04] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-[#60a5fa]">
            <PenLine className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Whiteboard</h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-white/50">
              Sketch ideas, flows, and notes for the team. Your work is saved locally in this
              browser.
            </p>
          </div>
        </div>
      </section>

      <div className="relative min-h-[calc(100dvh-16rem)] flex-1 overflow-hidden rounded-2xl border border-white/15 bg-[#1e1e1e] shadow-[0_24px_64px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]">
        {initialData === null ? (
          <div className="flex h-full min-h-[480px] items-center justify-center text-sm text-white/50">
            Loading whiteboard…
          </div>
        ) : (
          <div className="absolute inset-0">
            <Excalidraw
              theme="dark"
              initialData={
                hasStoredContent
                  ? {
                      elements: initialData.elements,
                      appState: initialData.appState,
                      files: initialData.files,
                    }
                  : undefined
              }
              onChange={handleChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
