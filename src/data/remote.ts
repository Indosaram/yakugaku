import { useEffect, useState } from "react";

// public/data 아래 JSON/MD 를 필요할 때만 불러온다 (번들 크기 절약).
const cache = new Map<string, Promise<unknown>>();

export function loadData<T>(path: string, kind: "json" | "text" = "json"): Promise<T> {
  const key = kind + ":" + path;
  let p = cache.get(key) as Promise<T> | undefined;
  if (!p) {
    p = fetch(`${import.meta.env.BASE_URL}data/${path}`).then((r) => {
      if (!r.ok) throw new Error(`${path} ${r.status}`);
      return (kind === "json" ? r.json() : r.text()) as Promise<T>;
    });
    p.catch(() => cache.delete(key));
    cache.set(key, p);
  }
  return p;
}

export type Remote<T> = { data?: T; error?: Error };

export function useData<T>(path: string | null, kind: "json" | "text" = "json"): Remote<T> {
  const [state, setState] = useState<Remote<T> & { path?: string | null }>({});
  useEffect(() => {
    if (!path) return;
    let alive = true;
    loadData<T>(path, kind).then(
      (data) => alive && setState({ data, path }),
      (error: Error) => alive && setState({ error, path }),
    );
    return () => {
      alive = false;
    };
  }, [path, kind]);
  return state.path === path ? state : {};
}

// 화학(합격화학) 인덱스 형식
export interface ChemIndex {
  band: string;
  organic: { no: number; title: string; band: string; problems: { n: string; a: string; g: string }[] }[];
  inorganic: { id: string; no: number; title: string; lead: string }[];
  bridge?: { id: string; no: number; label: string; title: string; band: string; problems: { n: string; a: string; g: string }[] }[];
  decks: { id: string; title: string; count: number }[];
}

// 화학 중요문제집(化学 重要問題集 2026) 영상 해설 인덱스 (public/data/juyo/index.json). 문항 번호 n 은 "1"…"237"
export interface JuyoIndex {
  list: string;
  groups: { id: string; title: string; ja: string; from: number; to: number; band: string }[];
  problems: { n: string; a: string; g: string; s: string; yt: string; t: number }[];
}
export type Deck = { title: string; hint: string; cards: { q: string; a: string; s?: string; sw?: string; n?: string }[] };

// EJU 강의 인덱스 형식
export type Tier = "필수" | "권장" | "패스";
export interface EjuLecture {
  idx: number;
  unit: string;
  no: number;
  title: string;
  yt: string;
  tier?: Tier;
  why?: string;
  hasNote: boolean;
}
export interface Tiers {
  summary: string;
  topics: { topic: string; count: number; years: string; example: string }[];
  organic: { no: number; tier: Tier; why: string }[];
  inorganic: { id: string; tier: Tier; why: string }[];
}
