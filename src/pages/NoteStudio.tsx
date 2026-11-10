import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import { ArrowLeft, Loader2, Sparkles, Trash2 } from "lucide-react";
import "../chem.css";
import { btn, PageTitle } from "../components/ui";
import { clearProgress, setProgress, useProgress } from "../progress";
import { todayISO } from "../srs";
import { aiNote } from "../sync";
import { AI_NOTE_MAX, deleteAiNote, listAiNotes, newAiNoteId, readAiNote, saveAiNote, type AiNoteMeta } from "../ai-notes";

const SAMPLE = `오늘 강의: 이상기체 상태방정식 PV = nRT
- P는 압력, 기압(atm) 아니면 Pa. 1 atm = 1.013×10^5 Pa
- V는 부피 L, T는 절대온도 K = 섭씨 + 273
- n은 몰수, R은 기체상수 0.082 (L·atm/mol·K) 또는 8.31 (J/mol·K)
- 문제에서 부피를 mL로 주면 L로 바꿔야 함
- 혼합기체는 분압의 합 = 전체압력 (돌턴 법칙)`;

export function NoteStudio() {
  const { get, store } = useProgress();
  const [title, setTitle] = useState("");
  const [material, setMaterial] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<string | null>(null);

  const notes = useMemo(() => listAiNotes(get), [store, get]);
  const today = todayISO();
  const chars = material.trim().length;

  async function generate() {
    const text = material.trim();
    if (!text || busy) return;
    setBusy(true);
    setError(null);
    try {
      setDraft(await aiNote(text, title.trim()));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function save() {
    if (!draft) return;
    const id = newAiNoteId(today);
    const meta: AiNoteMeta = { id, title: title.trim() || "제목 없는 노트", created: today };
    saveAiNote(meta, draft);
    setTitle("");
    setMaterial("");
    setDraft(null);
  }

  return (
    <div className="chem mx-auto max-w-3xl">
      <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/chem" className="hover:text-slate-900 hover:underline">화학</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <span>노트 만들기</span>
      </nav>
      <PageTitle kicker="강의 필기 정리" title="강의 필기를 개념 노트로">
        필기를 붙여넣으면 핵심 공식·일본 시험 용어·풀이 순서로 정리한 노트를 만들어 줘요. 만든 노트는 다른 개념 노트와 똑같이 복습 표시할 수 있고, 기기 간에도 동기화돼요.
      </PageTitle>

      <label className="block">
        <span className="text-sm font-semibold text-slate-800">주제</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 이상기체 상태방정식"
          maxLength={120}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-indigo-500"
          data-note-title
        />
      </label>

      <label className="mt-4 block">
        <span className="text-sm font-semibold text-slate-800">강의 필기·교재 원문</span>
        <textarea
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          placeholder="오늘 들은 강의 내용을 그대로 붙여넣으세요."
          rows={12}
          maxLength={AI_NOTE_MAX}
          className="mt-1 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 font-mono text-sm leading-relaxed text-slate-900 outline-none focus:border-indigo-500"
          data-note-material
        />
      </label>
      <p className="mt-1 text-right text-xs text-slate-500 tnum" data-note-chars>{chars.toLocaleString()}자</p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" className={btn.primary} onClick={generate} disabled={busy || chars === 0} data-note-generate>
          {busy ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Sparkles aria-hidden className="size-4" />}
          {busy ? "노트를 만드는 중" : "노트 만들기"}
        </button>
        <button type="button" className={btn.secondary} onClick={() => setMaterial(SAMPLE)} disabled={busy} data-note-sample>
          예시 넣어 보기
        </button>
      </div>

      {error && <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800" role="alert" data-note-error>{error}</p>}

      {draft && (
        <section className="mt-8" data-note-draft>
          <h2 className="text-lg font-bold text-slate-900">만들어진 노트</h2>
          <div className="md prose mt-3 rounded-xl border border-slate-200 bg-white px-5 py-4" dangerouslySetInnerHTML={{ __html: marked.parse(draft, { async: false, gfm: true }) as string }} />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button type="button" className={btn.primary} onClick={save} data-note-save>저장</button>
            <button type="button" className={btn.secondary} onClick={() => setDraft(null)} data-note-discard>버리기</button>
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <>
          <h2 className="mt-10 mb-3 text-xl font-bold text-slate-900">내가 만든 노트 <span className="text-sm font-medium text-slate-500">{notes.length}개</span></h2>
          <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white" data-note-list>
            {notes.map((n) => (
              <li key={n.id} className="flex items-center gap-3 px-4 py-3">
                <Link to={`/chem/n/${n.id}`} className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-slate-900">{n.title}</span>
                  <span className="text-xs text-slate-500 tnum">{n.created}</span>
                </Link>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-700"
                  onClick={() => {
                    deleteAiNote(n.id);
                    clearProgress(`note:review:${n.id}`);
                  }}
                  aria-label={`${n.title} 삭제`}
                  data-note-delete
                >
                  <Trash2 aria-hidden className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function AiNotePage() {
  const { id } = useParams();
  const { get, store } = useProgress();
  const [draftBody, setDraftBody] = useState<string | null>(null);
  const today = todayISO();
  const meta = useMemo(() => listAiNotes(get).find((n) => n.id === id), [store, get, id]);

  useEffect(() => {
    setDraftBody(id ? readAiNote(id) : null);
  }, [id, store]);

  if (!id || !meta || !draftBody) {
    return (
      <div className="chem mx-auto max-w-3xl py-20 text-center">
        <p className="text-slate-600">노트를 찾을 수 없어요.</p>
        <Link to="/chem/n" className={btn.secondary + " mt-4"}>
          <ArrowLeft aria-hidden className="size-4" />노트 만들기로
        </Link>
      </div>
    );
  }

  const review = Boolean(get(`note:review:${id}`));
  const html = marked.parse(draftBody, { async: false, gfm: true }) as string;
  return (
    <div className="chem mx-auto max-w-3xl">
      <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/chem" className="hover:text-slate-900 hover:underline">화학</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <Link to="/chem/n" className="hover:text-slate-900 hover:underline">노트 만들기</Link>
      </nav>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{meta.title}</h1>
      <p className="mt-1 text-slate-500 tnum">{meta.created} · AI 정리 노트</p>
      <div className="md prose mt-5" dangerouslySetInnerHTML={{ __html: html }} />
      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          className={btn.secondary + (review ? " !border-amber-400 !bg-amber-100 !text-amber-900" : "")}
          aria-pressed={review}
          onClick={() => review ? clearProgress(`note:review:${id}`) : setProgress(`note:review:${id}`, true)}
          data-note-review
        >
          이 노트 복습 표시
        </button>
        <span className="text-xs text-slate-500 tnum">오늘 {today}</span>
      </div>
    </div>
  );
}
