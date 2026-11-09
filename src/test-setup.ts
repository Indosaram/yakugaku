// Bun test preload: src/progress.ts touches localStorage at import time, so install an
// in-memory shim on globalThis before any test module loads.
const store = new Map<string, string>();

const storage: Storage = {
  get length() {
    return store.size;
  },
  clear() {
    store.clear();
  },
  getItem(k: string) {
    return store.has(k) ? store.get(k)! : null;
  },
  key(i: number) {
    return [...store.keys()][i] ?? null;
  },
  removeItem(k: string) {
    store.delete(k);
  },
  setItem(k: string, v: string) {
    store.set(k, String(v));
  },
};

Object.defineProperty(globalThis, "localStorage", { value: storage, configurable: true, writable: true });

if (typeof globalThis.window === "undefined") {
  (globalThis as { window?: unknown }).window = {
    localStorage: storage,
    addEventListener() {},
  };
}

if (Intl.DateTimeFormat().resolvedOptions().timeZone !== "Asia/Seoul") {
  console.warn("[test] Timezone is not Asia/Seoul; day-boundary tests may be unreliable.");
}

export {};
