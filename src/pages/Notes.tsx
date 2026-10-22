import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { PlayCircle } from "lucide-react";
import "../chem.css";
import { useData } from "../data/remote";

// 한국어 강의 영상 → 한 페이지 개념 노트 (public/data/notes/<id>.md, 목록은 notes/index.json)
// 본문의 <button class="ts" data-t="초"> 를 누르면 위 영상이 그 시각부터 재생된다.
type Note = { id: string; title: string; ja: string; yt: string; start: number; dur: number; by: string; lead: string };
const useNotes = () => useData<Note[]>("notes/index.json");
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

// 화학 홈에 붙는 목록
export function NotesSection() {
  const { data } = useNotes();
  if (!data?.length) return null;
  return (
    <>
      <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">개념 노트 <span className="text-sm font-medium text-slate-500">한국어 강의 영상 정리</span></h2>
      <ul className="chap-list" data-notes>
        {data.map((n, i) => (
          <li key={n.id}>
            <Link to={`/chem/n/${n.id}`}>
              <span className="chap-no">{i + 1}</span>
              <span>
                <span className="t">{n.title} <span className="font-medium text-slate-500" lang="ja">{n.ja}</span></span>
                <br />
                <span className="s">{n.lead}</span>
              </span>
              <span className="p inline-flex items-center gap-1.5"><PlayCircle aria-hidden className="size-4" />{fmt(n.dur)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export function NotePage() {
  const { id } = useParams();
  const { data, error } = useNotes();
  const { data: body, error: e2 } = useData<string>(id ? `notes/${id}.md` : null, "text");
  const [at, setAt] = useState<number | null>(null);
  useEffect(() => setAt(null), [id]);
  const html = useMemo(() => (body ? (marked.parse(body, { async: false, gfm: true }) as string) : ""), [body]);
  useEffect(() => {
    const el = document.getElementById("note-body");
    const h = (e: MouseEvent) => {
      const b = (e.target as HTMLElement).closest<HTMLElement>("[data-t]");
      if (!b) return;
      e.preventDefault();
      setAt(Number(b.dataset.t));
      document.getElementById("note-video")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    el?.addEventListener("click", h);
    return () => el?.removeEventListener("click", h);
  });
  if (!data || !body) return <Loading error={error ?? e2} />;
  const n = data.find((x) => x.id === id);
  if (!n) return <Loading error={new Error("404")} />;
  const start = at ?? n.start;
  return (
    <div className="chem mx-auto max-w-3xl">
      <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/chem" className="hover:text-slate-900 hover:underline">화학</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <span>개념 노트</span>
      </nav>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{n.title}</h1>
      <p className="mt-1 text-slate-500"><span lang="ja">{n.ja}</span> · {n.by}</p>
      <figure id="note-video" className="mt-5 mb-6">
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe key={n.yt + start} className="size-full" src={`https://www.youtube-nocookie.com/embed/${n.yt}?start=${start}&rel=0${at != null ? "&autoplay=1" : ""}`} title={`${n.title} 강의 영상`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" data-start={start} />
        </div>
        <figcaption className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <PlayCircle aria-hidden className="size-4" />{fmt(start)}부터 재생 · 판서는 영상에서 확인하세요
          <a className="underline" href={`https://www.youtube.com/watch?v=${n.yt}&t=${start}s`} target="_blank" rel="noreferrer">유튜브에서 열기</a>
        </figcaption>
      </figure>
      <div id="note-body" className="md prose" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
