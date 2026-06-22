import type { AppState, BinaryFiles, ExcalidrawInitialDataState } from "@excalidraw/excalidraw/types";

export const INTERNAL_WHITEBOARD_ID = "shared";

export type WhiteboardScene = {
  elements: ExcalidrawInitialDataState["elements"];
  appState: Partial<AppState>;
  files: BinaryFiles;
};

export const EMPTY_WHITEBOARD_SCENE: WhiteboardScene = {
  elements: [],
  appState: { theme: "dark" },
  files: {},
};

type DbWhiteboard = {
  id: string;
  scene: WhiteboardScene | null;
  updated_at: string;
};

export function mapWhiteboardScene(row: DbWhiteboard): WhiteboardScene {
  if (!row.scene || typeof row.scene !== "object") {
    return EMPTY_WHITEBOARD_SCENE;
  }

  return {
    elements: row.scene.elements ?? [],
    appState: row.scene.appState ?? { theme: "dark" },
    files: row.scene.files ?? {},
  };
}

export function pickPersistedAppState(appState: AppState): Partial<AppState> {
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

export function normalizeWhiteboardScene(
  elements: WhiteboardScene["elements"],
  appState: AppState,
  files: BinaryFiles,
): WhiteboardScene {
  return {
    elements,
    appState: pickPersistedAppState(appState),
    files,
  };
}
