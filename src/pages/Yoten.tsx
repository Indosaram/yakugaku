import { useState } from "react";
import { Link } from "react-router-dom";
import { Layers, PlayCircle } from "lucide-react";
import { useData, type Deck } from "../data/remote";
import { useProgress, setProgress } from "../progress";
import { PageTitle, btn } from "../components/ui";
import { ChemDeck } from "./Chem";

type Decks = Record<string, Deck>;

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">내용을 불러오지 못했어요. 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

function DeckLinks({ decks, base }: { decks: Decks; base: string }) {
  const { get } = useProgress();
  return (
    <div className="mb-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(decks).map(([id, d]) => {
        const best = get(`chem:best:${id}`);
        return (
          <Link key={id} to={`${base}/${id}`} className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 hover:border-slate-400">
            <Layers className="size-4 shrink-0 text-indigo-700" />
            <span className="font-semibold text-slate-900">{d.title}</span>
            <span className="ml-auto text-sm text-slate-500">{d.cards.length}장{typeof best === "number" ? ` · 최고 ${best}%` : ""}</span>
          </Link>
        );
      })}
    </div>
  );
}

function Row({ q, a, s, open }: { q: string; a: string; s?: string; open: boolean }) {
  const [shown, setShown] = useState(false);
  const vis = open || shown;
  return (
    <li className="grid min-w-0 gap-1 px-4 py-2.5 sm:grid-cols-[1fr_1fr] sm:items-center">
      <span className="text-slate-800">{q}</span>
      <button onClick={() => setShown(!shown)} className={"min-w-0 whitespace-pre-line break-words rounded-lg px-3 py-1.5 text-left font-semibold " + (vis ? "bg-indigo-50 text-indigo-900" : "bg-rose-700 text-rose-700")}>
        {a}{vis && s ? <span className="block text-xs font-normal text-slate-500">{s}</span> : null}
      </button>
    </li>
  );
}

const VIDEOS = [
  {
    id: "OwBE6gAQ_pk", order: "① 먼저", len: "9시간 5분", title: "有機化学① 全パターン解説 (반응·성질·반응기구 전부)",
    chapters: "0:00 사용법|3:23 관능기·분류·명명|14:16 끓는점·녹는점·용해성|25:22 알케인·석유|35:49 알켄|47:07 알카인(아세틸렌)|58:15 다이엔|70:07 알코올|81:04 탈수·에터|92:07 알데하이드|102:34 케톤|113:35 카복실산|124:20 다이카복실산·하이드록시산|135:07 에스터·비누화|146:47 아민·아마이드|157:31 지방족 상호변환 맵|168:23 벤젠|179:23 방향족 탄화수소·측쇄산화|190:16 페놀|201:07 살리실산·의약품|211:41 나이트로벤젠·아닐린|222:30 다이아조화·커플링|233:57 방향족 카복실산|244:53 다환·복소환|255:47 검출반응(은거울·펠링)|267:02 아이오도폼|277:44 시스-트랜스|289:07 부제탄소·광학이성질|301:10 입체표기·배좌|312:09 전자 이동으로 반응 분류|323:17 마르코우니코프|334:25 자이체프|346:03 안티 부가|357:02 신 부가|367:45 알카인 환원|378:50 케토-엔올|389:36 1,2-/1,4-부가|401:45 산화개열(오존분해)|412:33 공명·벤젠 안정화|423:55 친전자 치환·배향성|434:48 치환기 효과|445:29 쿠멘법|456:16 아세탈|466:45 에스터화 기구|477:40 동위체 표지|488:51 고리 변형|499:49 보호기·합성 순서|510:38 광학분할|522:57 처음 보는 반응 읽기|533:57 원자효율",
  },
  {
    id: "Ln44_9ML9e0", order: "② 다음", len: "10시간 30분", title: "高校数学 IA·IIB 全解説 (前編)",
    chapters: "0:00 처음부터|12:24 교대식 보충(인수정리)|17:04 정정: 제곱근 정의|204:46 정정: 접현정리의 역 → 방멱정리의 역",
  },
];
const sec = (t: string) => t.split(":").reduce((s, x) => s * 60 + Number(x), 0);

function Videos() {
  const { get } = useProgress();
  return (
    <div className="space-y-4">
      {VIDEOS.map((v) => (
        <section key={v.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <h3 className="flex flex-wrap items-baseline gap-2 border-b border-slate-200 bg-stone-50 px-4 py-2.5 font-bold text-slate-900">
            <span className="text-indigo-700">{v.order}</span>{v.title}<span className="ml-auto text-xs font-normal text-slate-500">{v.len}</span>
          </h3>
          <ul className="flex flex-wrap gap-1.5 p-3">
            {v.chapters.split("|").map((c) => {
              const [t, ...rest] = c.split(" ");
              const k = `yt:${v.id}:${t}`;
              const done = get(k) === true;
              return (
                <li key={t} className={"flex items-center gap-1 rounded-lg border px-2 py-1 text-sm " + (done ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200")}>
                  <input type="checkbox" aria-label={`${rest.join(" ")} 봤음`} checked={done} onChange={() => setProgress(k, !done)} />
                  <a className="hover:underline" href={`https://youtu.be/${v.id}?t=${sec(t)}`} target="_blank" rel="noreferrer"><span className="tnum text-slate-400">{t}</span> {rest.join(" ")}</a>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function YotenHome() {
  const { data: yo, error } = useData<Decks>("yoten/decks.json");
  const { data: rg, error: e2 } = useData<Decks>("yoten/yogo.json");
  const [open, setOpen] = useState(false);
  if (!yo || !rg) return <Loading error={error ?? e2} />;
  return (
    <div>
      <PageTitle kicker="10/23 요청분" title="요점 암기 문제집 · 이과용어 카드">
        『無機・有機・高分子化学 要点まとめ問題』의 답지(빨간 손글씨)를 옮겨 적어 답지와 카드로 만들고, 『이과용어의 기초』 표를 한↔일 카드로 만들었어요. 손글씨 답이 틀린 곳은 바로잡고 카드에 "※손글씨 답과 다르게 바로잡음"이라고 적어 두었어요.
      </PageTitle>
      <h2 className="mb-3 text-xl font-bold text-slate-900">要点まとめ問題 카드 <span className="text-sm font-medium text-slate-500">{Object.values(yo).reduce((s, d) => s + d.cards.length, 0)}장</span></h2>
      <DeckLinks decks={yo} base="/yoten/d" />
      <h2 className="mb-3 text-xl font-bold text-slate-900">이과용어의 기초 카드 <span className="text-sm font-medium text-slate-500">{Object.values(rg).reduce((s, d) => s + d.cards.length, 0)}장</span></h2>
      <DeckLinks decks={rg} base="/yoten/v" />
      <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-slate-900"><PlayCircle className="size-5 text-rose-700" />볼 영상 (순서대로)</h2>
      <div className="mb-8"><Videos /></div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">要点まとめ問題 답지</h2>
        <button className={btn.secondary} aria-pressed={open} onClick={() => setOpen(!open)}>{open ? "답 가리기" : "답 모두 보기"}</button>
      </div>
      {Object.entries(yo).map(([id, d]) => (
        <section key={id} className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <h3 className="border-b border-slate-200 bg-stone-50 px-4 py-2.5 font-bold text-slate-900" lang="ja">{d.title}</h3>
          <ul className="divide-y divide-slate-100">
            {d.cards.map((c, i) => <Row key={i} q={c.q} a={c.a} s={c.s} open={open} />)}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function YotenDeckPage() {
  return <ChemDeck src="yoten/decks.json" back={["요점 문제집", "/yoten"]} />;
}

export function YogoDeckPage() {
  return <ChemDeck src="yoten/yogo.json" back={["이과용어", "/yoten"]} />;
}
