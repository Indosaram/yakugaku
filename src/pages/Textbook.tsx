import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpenText, ChevronRight, Image } from "lucide-react";
import { Md } from "../components/Md";
import { PageTitle, btn } from "../components/ui";
import { useData } from "../data/remote";

type Chapter = { id: string; title: string; from: number; to: number; sections: { title: string; page: number }[] };
type Book = {
  id: string;
  title: string;
  ja: string;
  missing: number[];
  pages: number;
  figures: number;
  chapters: Chapter[];
};
type TextbookIndex = { books: Book[] };

function Loading({ error }: { error?: Error }) {
  return <p className="py-16 text-center text-slate-500" role={error ? "alert" : "status"}>{error ? "교재를 불러오지 못했어요. 새로고침해 주세요." : "교재를 불러오는 중…"}</p>;
}

function Contents({ book }: { book: Book }) {
  return (
    <section aria-labelledby={`contents-${book.id}`}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 id={`contents-${book.id}`} className="text-xl font-bold text-slate-900">{book.title} 목차</h2>
          <p className="mt-1 text-sm text-slate-500">쪽수는 표지부터 센 PDF 쪽수입니다. 본문에는 원본의 인쇄 쪽수도 남겨 두었어요.</p>
        </div>
        <Link to={`/textbook/${book.id}/1`} className={btn.link}>처음부터 읽기 <ArrowRight aria-hidden className="size-4" /></Link>
      </div>
      <ol className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {book.chapters.map((chapter, i) => (
          <li key={chapter.id}>
            <Link to={`/textbook/${book.id}/${chapter.from}`} className="group flex items-center gap-4 px-4 py-4 hover:bg-stone-50 sm:px-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-stone-100 font-semibold text-slate-600 tnum">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-slate-900 group-hover:text-indigo-700">{chapter.title}</span>
                <span className="mt-0.5 block text-xs text-slate-500 tnum">PDF {chapter.from}–{chapter.to}쪽 · {chapter.to - chapter.from + 1}쪽</span>
              </span>
              <ChevronRight aria-hidden className="size-4 shrink-0 text-slate-400" />
            </Link>
            {chapter.sections.length > 0 && <ul className="space-y-1 px-5 pb-4 sm:pl-20">{chapter.sections.map((section, index) => <li key={`${section.page}-${index}`}><Link to={`/textbook/${book.id}/${section.page}`} className="inline-flex min-h-10 items-center text-sm text-indigo-700 hover:underline">{section.title} · {section.page}쪽</Link></li>)}</ul>}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function TextbookHome() {
  const { data, error } = useData<TextbookIndex>("textbook/index.json");
  const [search, setSearch] = useSearchParams();
  if (!data) return <Loading error={error} />;
  const selected = data.books.find((book) => book.id === search.get("book"));
  return (
    <div>
      <PageTitle kicker="한국어 교재" title="일본 화학 교재, 한국어로 읽기">
        문영당 『화학기초』와 『화학』을 쪽별로 번역하고 있어요. 원본의 그림·그래프·표를 번역과 함께 보며 공부할 수 있습니다.
      </PageTitle>
      <div className="mb-8 grid gap-4 sm:grid-cols-2" aria-label="교재 선택">
        {data.books.map((book) => (
          <button key={book.id} type="button" aria-pressed={selected?.id === book.id} onClick={() => setSearch({ book: book.id })} className={`flex min-w-0 flex-col items-start rounded-2xl border border-slate-200 p-5 text-left shadow-sm transition hover:shadow-md sm:p-6 ${selected?.id === book.id ? "bg-indigo-50" : "bg-white hover:bg-stone-50"}`}>
            <BookOpenText aria-hidden className="mb-4 size-6 text-indigo-700" />
            <span className="text-xl font-bold text-slate-900">{book.title}</span>
            <span className="mt-1 text-sm text-slate-500" lang="ja">{book.ja}</span>
            <span className="mt-3 text-sm leading-relaxed text-slate-600">번역 완료 {book.pages - book.missing.length} / {book.pages}쪽 · 미번역 {book.missing.length}쪽</span>
            <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
              <span className="tnum">한국어 {book.pages}쪽 · {book.chapters.length}개 단원</span>
              <span className="inline-flex items-center gap-1"><Image aria-hidden className="size-3.5" />원본 그림·표 {book.figures}개</span>
            </span>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-700">{selected?.id === book.id ? "아래 목차에서 단원을 골라 주세요" : "목차 보기"}<ChevronRight aria-hidden className="size-4" /></span>
          </button>
        ))}
      </div>
      {selected ? <Contents key={selected.id} book={selected} /> : <p className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">먼저 교재를 고르면 단원별 목차가 열립니다. 기초 개념을 처음 공부한다면 <b>화학 기초</b>부터 시작하세요.</p>}
    </div>
  );
}

function pageLink(book: Book, page: number) {
  return `/textbook/${book.id}/${page}`;
}

function Reader({ book, chapter, page }: { book: Book; chapter?: Chapter; page: number }) {
  const missing = book.missing.includes(page);
  const { data: md, error } = useData<string>(missing ? null : `textbook/${book.id}/pages/${String(page).padStart(4, "0")}.md`, "text");
  const navigate = useNavigate();
  const [jumpValue, setJumpValue] = useState(String(page));
  function jump(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = Number(jumpValue);
    if (!Number.isInteger(target) || target < 1 || target > book.pages) return;
    navigate(pageLink(book, target));
  }
  const chapterIndex = chapter ? book.chapters.indexOf(chapter) : -1;
  const prevChapter = book.chapters[chapterIndex - 1];
  const nextChapter = book.chapters[chapterIndex + 1];
  const text = md?.replace(/(\]\(|\bsrc=["'])([^\s)"']+)/g, (_match, prefix: string, source: string) => {
    if (/^(?:[a-z]+:|\/|#)/i.test(source)) return prefix + source;
    const base = source.startsWith("data/textbook/") ? import.meta.env.BASE_URL : source.startsWith("textbook/") ? `${import.meta.env.BASE_URL}data/` : `${import.meta.env.BASE_URL}data/textbook/${book.id}/pages/`;
    return prefix + new URL(source, new URL(base, window.location.origin)).pathname;
  });
  return (
    <div className="mx-auto max-w-3xl">
      <nav aria-label="위치" className="mb-4 flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
        <Link to="/textbook" className="hover:text-slate-900 hover:underline">한국어 교재</Link><span aria-hidden>/</span>
        <Link to={`/textbook?book=${book.id}`} className="hover:text-slate-900 hover:underline">{book.title}</Link><span aria-hidden>/</span><span className="text-slate-700">{chapter?.title ?? "번역 준비 중"}</span>
      </nav>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{chapter?.title ?? "번역 준비 중"}</h1>
      <p className="mt-2 text-sm text-slate-500 tnum">{book.title} · PDF {page} / {book.pages}쪽 · {chapter ? `이 단원 ${chapter.from}–${chapter.to}쪽` : "번역 준비 중"}</p>
      <div className="my-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:p-4">
        <nav className="flex items-center gap-2" aria-label="쪽 이동">
          {page > 1 ? <Link rel="prev" to={pageLink(book, page - 1)} className={btn.secondary}><ArrowLeft aria-hidden className="size-4" />이전 쪽</Link> : <span className="inline-flex h-10 items-center gap-2 px-4 text-sm text-slate-400"><ArrowLeft aria-hidden className="size-4" />첫 쪽</span>}
          {page < book.pages ? <Link rel="next" to={pageLink(book, page + 1)} className={btn.secondary}>다음 쪽<ArrowRight aria-hidden className="size-4" /></Link> : <span className="inline-flex h-10 items-center gap-2 px-4 text-sm text-slate-400">마지막 쪽<ArrowRight aria-hidden className="size-4" /></span>}
        </nav>
        <form onSubmit={jump} className="flex items-center gap-2">
          <label htmlFor="textbook-page" className="text-sm text-slate-600">PDF 쪽</label>
          <input id="textbook-page" aria-label="이동할 PDF 쪽수" type="number" min={1} max={book.pages} required value={jumpValue} onChange={(event) => setJumpValue(event.target.value)} className="h-10 w-20 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 tnum" />
          <button type="submit" className={btn.secondary}>이동</button>
        </form>
      </div>
      <article key={page} data-textbook-page={page} aria-label={`${book.title} PDF ${page}쪽`} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 [&_figure]:my-6 [&_figcaption]:mt-2 [&_figcaption]:text-sm [&_figcaption]:text-slate-600 [&_img]:mx-auto [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg">
        {missing ? <p role="status" className="py-8 text-slate-600">아직 번역되지 않은 쪽입니다. 다른 쪽을 선택해 주세요.</p> : text !== undefined ? <Md text={text} /> : <Loading error={error} />}
      </article>
      <nav className="mt-5 flex items-center justify-between gap-3" aria-label="본문 아래 쪽 이동">
        {page > 1 ? <Link to={pageLink(book, page - 1)} className={btn.secondary}><ArrowLeft aria-hidden className="size-4" />이전 쪽</Link> : <span />}
        <span className="text-sm text-slate-500 tnum">{page} / {book.pages}</span>
        {page < book.pages ? <Link to={pageLink(book, page + 1)} className={btn.secondary}>다음 쪽<ArrowRight aria-hidden className="size-4" /></Link> : <span />}
      </nav>
      <nav className="mt-8 grid grid-cols-2 gap-3" aria-label="이전·다음 단원">
        {prevChapter ? <Link to={`/textbook/${book.id}/${prevChapter.from}`} className="rounded-2xl border border-slate-200 bg-white p-4 hover:bg-stone-50"><span className="text-xs text-slate-500">이전 단원</span><span className="mt-1 block text-sm font-semibold text-slate-900">{prevChapter.title}</span></Link> : <span />}
        {nextChapter ? <Link to={`/textbook/${book.id}/${nextChapter.from}`} className="rounded-2xl border border-slate-200 bg-white p-4 text-right hover:bg-stone-50"><span className="text-xs text-slate-500">다음 단원</span><span className="mt-1 block text-sm font-semibold text-slate-900">{nextChapter.title}</span></Link> : <span />}
      </nav>
      <p className="mt-6 text-xs leading-relaxed text-slate-500">그림·표 안의 원문 표기는 원본 그대로이며, 한국어 설명은 본문과 그림 설명에 실었습니다. 페이지 번호는 PDF 기준입니다.</p>
    </div>
  );
}

export function TextbookPage() {
  const { book: bookId, page: pageParam } = useParams();
  const { data, error } = useData<TextbookIndex>("textbook/index.json");
  if (!data) return <Loading error={error} />;
  const book = data.books.find((item) => item.id === bookId);
  const page = Number(pageParam);
  const chapter = book?.chapters.find((item) => item.from <= page && page <= item.to);
  if (!book || !/^\d+$/.test(pageParam ?? "") || !Number.isInteger(page) || page < 1 || page > book.pages) return <div className="py-16 text-center"><h1 className="text-xl font-bold text-slate-900">이 단원을 찾을 수 없어요</h1><Link to="/textbook" className={`${btn.link} mt-4`}>교재 목차로 돌아가기</Link></div>;
  return <Reader key={`${book.id}/${page}`} book={book} chapter={chapter} page={page} />;
}
