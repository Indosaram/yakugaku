import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { Md } from "../components/Md";
import { PageTitle, btn } from "../components/ui";
import { useData } from "../data/remote";

// 오사카대학 2015 전기 화학 4문항 (public/data/handai2015/NN.md, 목록은 handai2015/index.json).
// 각 문항 본문의 「▸ 16:40」 링크는 같은 해설 영상의 그 시각으로 걸려 있다.
export type HandaiSection = {
  id: string;
  no: number;
  title: string;
  ja: string;
  topic: string;
  start: number;
  url: string;
  lead: string;
};
export type HandaiIndex = { title: string; ja: string; video: string; lead: string; sections: HandaiSection[] };

const BASE = import.meta.env.BASE_URL ?? "/";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

// 본문 그림은 저장소 기준 상대 경로(data/handai2015/fig/…)로 적혀 있다. 배포 기준 경로를 붙인다.
export function mediaBase(md: string): string {
  return md.replace(/(\]\(|\bsrc=["'])(?!https?:|\/\/|\/|#)([^\s)"']+)/g, (_m, prefix: string, src: string) => prefix + BASE + src);
}

// 본문에 `**굵게**가` 처럼 닫는 `**` 바로 뒤에 글자가 붙은 강조가 섞여 있으면 CommonMark 가 단어 내부 강조로 보고
// 닫지 않아, 그 줄의 별표가 전부 날것으로 보인다(한 줄에 하나만 있어도 뒤 문장까지 삼켜진다).
// 줄마다 `**` 짝을 세어 <strong> 으로 바꿔 준다. 짝이 안 맞는 줄은 건드리지 않는다.
export function fixInwordBold(md: string): string {
  return md
    .split("\n")
    .map((line) => {
      if (!line.includes("**")) return line;
      const parts = line.split("**");
      if (parts.length % 2 === 0) return line;
      return parts.map((part, i) => (i % 2 ? `<strong>${part}</strong>` : part)).join("");
    })
    .join("\n");
}

export function findSection(index: HandaiIndex | undefined, id: string | undefined): HandaiSection | undefined {
  return index?.sections.find((s) => s.id === id);
}

// 본문은 `# 大阪大学 2015년 전기 第3問 — …` 로 시작한다. 문서 제목은 페이지 머리에서 이미 보여 주므로 첫 제목 줄만 덜어 낸다.
export function stripTitle(md: string): string {
  return md.replace(/^\s*#[^\n]*\n+/, "");
}

// 본문의 「▸ 16:40」 시각 링크는 유튜브로 이어지므로, 누를 때 이 사이트를 떠나지 않도록 새 탭에서 연다.
export function externalLinks(md: string): string {
  return md.replace(/<a href="(https:\/\/youtu\.be\/[^"]*)"/g, '<a href="$1" target="_blank" rel="noreferrer"');
}

export function prepareBody(md: string): string {
  return externalLinks(fixInwordBold(mediaBase(stripTitle(md))));
}

function Loading({ error }: { error?: Error }) {
  if (error) return <div className="py-20 text-center text-slate-600">목록을 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>;
  return <div className="py-20 text-center text-slate-400" role="status">불러오는 중…</div>;
}

// 본문 파일이 아직 없거나(다른 작업자가 쓰는 중) 비어 있는 문항도 같은 화면에서 받아 준다.
function ComingSoon({ section }: { section: HandaiSection }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" role="status">
      <p className="font-semibold text-slate-900">이 문항의 한국어 해설은 아직 준비 중입니다.</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        정리 중인 문항이에요. 그동안 영상에서 제{section.no}문 해설을 바로 볼 수 있습니다.
      </p>
      <a className={btn.secondary + " mt-4"} href={section.url} target="_blank" rel="noreferrer">
        <PlayCircle aria-hidden className="size-4" />{fmt(section.start)}부터 영상 보기
      </a>
    </div>
  );
}

function isMissing(error: Error | undefined): boolean {
  return Boolean(error && / 404$/.test(error.message));
}

type BodyState = { state: "loading" } | { state: "error" } | { state: "empty" } | { state: "ready"; md: string };

export function bodyState(body: string | undefined, error: Error | undefined): BodyState {
  if (body?.trim()) return { state: "ready", md: body };
  if (error) return isMissing(error) ? { state: "empty" } : { state: "error" };
  return body === undefined ? { state: "loading" } : { state: "empty" };
}

export function Handai2015Home() {
  const { data, error } = useData<HandaiIndex>("handai2015/index.json");
  if (!data) return <Loading error={error} />;
  return (
    <div className="min-w-0">
      <PageTitle kicker="오사카대학 기출" title={data.title}>
        {data.lead} <span className="text-slate-500" lang="ja">{data.ja}</span>
      </PageTitle>

      <ol className="min-w-0 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {data.sections.map((s) => (
          <li key={s.id}>
            <Link to={`/handai2015/${s.id}`} className="group flex min-h-11 items-start gap-3 px-4 py-4 hover:bg-stone-50 sm:gap-4 sm:px-5">
              <span className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-semibold text-slate-600 tnum">{String(s.no).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 group-hover:text-indigo-700">{s.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500" lang="ja">{s.ja}</span>
                <span className="mt-2 block text-sm leading-relaxed text-slate-600">{s.lead}</span>
                <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-semibold text-indigo-700">{s.topic}</span>
                  <span className="inline-flex items-center gap-1"><PlayCircle aria-hidden className="size-3.5" />{fmt(s.start)}부터</span>
                </span>
              </span>
              <ChevronRight aria-hidden className="mt-2 size-4 shrink-0 text-slate-400" />
            </Link>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm leading-relaxed text-slate-600">
        전체 해설 영상은 <a className="text-indigo-700 underline underline-offset-4" href={`https://youtu.be/${data.video}`} target="_blank" rel="noreferrer">유튜브에서 열기</a>로 이어집니다. 문항 안의 시각 링크를 누르면 그 대목부터 재생돼요.
      </p>
    </div>
  );
}

export function Handai2015Page() {
  const { id } = useParams();
  const { data: index, error: e1 } = useData<HandaiIndex>("handai2015/index.json");
  const { data: body, error: e2 } = useData<string>(id ? `handai2015/${id}.md` : null, "text");
  if (!index) return <Loading error={e1} />;
  const section = findSection(index, id);
  if (!section) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-xl font-bold text-slate-900">문항을 찾을 수 없어요</h1>
        <p className="mt-2 text-sm text-slate-600">주소의 문항 번호를 확인해 주세요.</p>
        <Link to="/handai2015" className={btn.secondary + " mt-5"}>오사카대학 2015 목차</Link>
      </div>
    );
  }
  const i = index.sections.indexOf(section);
  const prev = index.sections[i - 1];
  const next = index.sections[i + 1];
  const bodyNow = bodyState(body, e2);
  return (
    <div className="mx-auto min-w-0 max-w-3xl">
      <nav aria-label="위치" className="mb-3 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/chem" className="hover:text-slate-900 hover:underline">화학</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <Link to="/handai2015" className="hover:text-slate-900 hover:underline">오사카대학 2015</Link>
        <span aria-hidden className="text-slate-300">/</span>
        <span className="text-slate-700">제{section.no}문</span>
      </nav>

      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{section.title}</h1>
      <p className="mt-1 text-sm text-slate-500"><span lang="ja">{section.ja}</span> · {section.topic}</p>

      <figure className="mt-5 mb-6">
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe className="size-full" src={`https://www.youtube-nocookie.com/embed/${index.video}?start=${section.start}&rel=0`} title={`${section.title} 해설 영상`} allow="encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
        </div>
        <figcaption className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
          <PlayCircle aria-hidden className="size-4" />{fmt(section.start)}부터 재생
          <a className="underline underline-offset-4" href={section.url} target="_blank" rel="noreferrer">유튜브에서 열기</a>
        </figcaption>
      </figure>

      <article className="min-w-0 [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg">
        {bodyNow.state === "ready" ? <Md text={prepareBody(bodyNow.md)} />
          : bodyNow.state === "error" ? <div className="py-20 text-center text-slate-600">해설을 불러오지 못했어요. 인터넷 연결을 확인한 뒤 새로고침해 주세요.</div>
          : bodyNow.state === "empty" ? <ComingSoon section={section} />
          : <div className="py-20 text-center text-slate-400" role="status">해설을 불러오는 중…</div>}
      </article>

      <nav className="mt-10 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2" aria-label="이전·다음 문항">
        {prev ? (
          <Link to={`/handai2015/${prev.id}`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 hover:bg-stone-50">
            <span className="flex items-center gap-1 text-xs text-slate-500"><ArrowLeft aria-hidden className="size-3.5" />이전 문항</span>
            <span className="mt-1 block text-sm font-semibold text-slate-900">{prev.title}</span>
          </Link>
        ) : null}
        {next ? (
          <Link to={`/handai2015/${next.id}`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 hover:bg-stone-50 sm:text-right">
            <span className="flex items-center gap-1 text-xs text-slate-500 sm:justify-end">다음 문항<ArrowRight aria-hidden className="size-3.5" /></span>
            <span className="mt-1 block text-sm font-semibold text-slate-900">{next.title}</span>
          </Link>
        ) : null}
      </nav>
    </div>
  );
}
