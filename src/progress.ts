import { useCallback, useSyncExternalStore } from "react";

// 학습 진도는 브라우저 localStorage 에만 저장된다 (서버 없음).
// 이전 hoshi-eigo 사이트와 같은 키를 써서 기존 기록을 그대로 이어받는다.
const KEY = "hoshi-eigo-progress-v1";
type Store = Record<string, number | boolean>;

let cache: Store = load();
const listeners = new Set<() => void>();

function load(): Store {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Store;
  } catch {
    return {};
  }
}

function emit() {
  localStorage.setItem(KEY, JSON.stringify(cache));
  listeners.forEach((l) => l());
}

export function setProgress(key: string, value: number | boolean) {
  cache = { ...cache, [key]: value };
  emit();
}

export function clearProgress(key: string) {
  const { [key]: _, ...rest } = cache;
  cache = rest;
  emit();
}

export function resetProgress() {
  cache = {};
  emit();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useProgress() {
  const store = useSyncExternalStore(subscribe, () => cache);
  const get = useCallback((k: string) => store[k], [store]);
  return { store, get };
}
