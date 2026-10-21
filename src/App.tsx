import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { BookOpenText, Calculator, ClipboardCheck, FileText, FlaskConical, Home as HomeIcon, Languages, Layers, ListChecks, Menu, PlayCircle, X } from "lucide-react";
import Home from "./pages/Home";
import EnglishHome from "./pages/EnglishHome";
import Guide from "./pages/Guide";
import GrammarList from "./pages/GrammarList";
import LessonPage from "./pages/LessonPage";
import PaperList from "./pages/PaperList";
import PaperPage from "./pages/PaperPage";
import VocabPage from "./pages/VocabPage";
import ReadingList from "./pages/ReadingList";
import ReadingPage from "./pages/ReadingPage";
import Resources from "./pages/Resources";
import Plan from "./pages/Plan";
import { ChemChapter, ChemDeck, ChemHome, ChemInorganic, ChemProblem } from "./pages/Chem";
import { EjuLecturePage, EjuList } from "./pages/Eju";
import Checklist from "./pages/Checklist";
import Exam from "./pages/Exam";
import { BooksHome, GrammarUnit, IdiomsPage } from "./pages/Books";
import { JitanDeckPage, JitanHome, KyotsuHome, KyotsuQuestion, MathHome, MathPage } from "./pages/Extra";

const NAV = [
  { to: "/", label: "홈", end: true, icon: HomeIcon },
  { to: "/en", label: "영어", icon: Languages },
  { to: "/books", label: "영어 교재", icon: BookOpenText },
  { to: "/chem", label: "화학", icon: FlaskConical },
  { to: "/eju", label: "EJU 강의", icon: PlayCircle },
  { to: "/jitan", label: "암기 카드", icon: Layers },
  { to: "/kyotsu", label: "공통테스트", icon: FileText },
  { to: "/math", label: "수학", icon: Calculator },
  { to: "/exam", label: "기출 분석", icon: ClipboardCheck },
  { to: "/check", label: "체크표", icon: ListChecks },
];

// 영어 과목 안의 보조 메뉴
const EN_NAV = [
  { to: "/en", label: "영어 홈", end: true },
  { to: "/en/guide", label: "시험 분석" },
  { to: "/en/plan", label: "로드맵" },
  { to: "/en/grammar", label: "왕기초 문법" },
  { to: "/en/papers", label: "기출문제" },
  { to: "/en/vocab", label: "어휘·숙어" },
  { to: "/en/reading", label: "의약 장문" },
  { to: "/en/resources", label: "자료 모음" },
];

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
      <rect width="32" height="32" rx="9" className="fill-slate-900" />
      <path d="M16 6.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7z" className="fill-amber-300" />
    </svg>
  );
}

const navCls = (active: boolean) =>
  "px-3 py-2 rounded-lg text-sm transition " + (active ? "bg-indigo-50 text-indigo-800 font-semibold" : "text-slate-600 hover:bg-stone-100 hover:text-slate-900");

export default function App() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [loc.pathname]);
  const inEnglish = loc.pathname === "/en" || loc.pathname.startsWith("/en/");

  return (
    <div className="min-h-dvh flex flex-col">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById("main")?.focus(); }} className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:shadow">
        본문으로 건너뛰기
      </a>
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
            <Logo />
            <span className="leading-tight">
              <span className="block font-bold text-slate-900 tracking-tight">yakugaku</span>
              <span className="block text-xs text-slate-500">호시약대 영어·화학 공부방</span>
            </span>
          </NavLink>
          <nav aria-label="주 메뉴" className="hidden lg:flex gap-0.5 ml-auto">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => navCls(isActive)}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            className="lg:hidden ml-auto inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-stone-100"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
        {open && (
          <nav aria-label="주 메뉴" className="reveal lg:hidden border-t border-slate-200 bg-white px-4 py-3 grid grid-cols-2 gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) => "flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition " + (isActive ? "bg-indigo-50 text-indigo-800 font-semibold" : "text-slate-700 hover:bg-stone-100")}
              >
                <n.icon aria-hidden className="size-4 opacity-70" />
                {n.label}
              </NavLink>
            ))}
          </nav>
        )}
        {inEnglish && (
          <nav aria-label="영어 메뉴" className="border-t border-slate-100 bg-white/70">
            <div className="no-scrollbar mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 py-1.5">
              {EN_NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => "shrink-0 rounded-lg px-2.5 py-1.5 text-[13px] transition " + (isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-stone-100")}>
                  {n.label}
                </NavLink>
              ))}
            </div>
          </nav>
        )}
      </header>
      <main id="main" tabIndex={-1} className="flex-1 mx-auto w-full max-w-6xl px-4 py-8 sm:py-10 outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/en" element={<EnglishHome />} />
          <Route path="/en/guide" element={<Guide />} />
          <Route path="/en/plan" element={<Plan />} />
          <Route path="/en/grammar" element={<GrammarList />} />
          <Route path="/en/grammar/:id" element={<LessonPage />} />
          <Route path="/en/papers" element={<PaperList />} />
          <Route path="/en/papers/:year" element={<PaperPage />} />
          <Route path="/en/vocab" element={<VocabPage />} />
          <Route path="/en/reading" element={<ReadingList />} />
          <Route path="/en/reading/:id" element={<ReadingPage />} />
          <Route path="/en/resources" element={<Resources />} />
          <Route path="/books" element={<BooksHome />} />
          <Route path="/books/g/:id" element={<GrammarUnit />} />
          <Route path="/books/idioms" element={<IdiomsPage />} />
          <Route path="/chem" element={<ChemHome />} />
          <Route path="/chem/o/:no" element={<ChemChapter />} />
          <Route path="/chem/o/:no/:n" element={<ChemProblem />} />
          <Route path="/chem/i/:id" element={<ChemInorganic />} />
          <Route path="/chem/d/:id" element={<ChemDeck />} />
          <Route path="/eju" element={<EjuList />} />
          <Route path="/eju/:idx" element={<EjuLecturePage />} />
          <Route path="/jitan" element={<JitanHome />} />
          <Route path="/jitan/:id" element={<JitanDeckPage />} />
          <Route path="/kyotsu" element={<KyotsuHome />} />
          <Route path="/kyotsu/:q" element={<KyotsuQuestion />} />
          <Route path="/math" element={<MathHome />} />
          <Route path="/math/:no" element={<MathPage />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/check" element={<Checklist />} />
          <Route
            path="*"
            element={
              <div className="py-20 text-center">
                <p className="text-5xl font-bold text-slate-200 tnum">404</p>
                <p className="mt-3 text-slate-700">페이지를 찾을 수 없어요. 주소가 바뀌었거나 삭제된 페이지입니다.</p>
                <Link to="/" className="mt-6 inline-flex rounded-xl bg-indigo-700 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-800">홈으로</Link>
              </div>
            }
          />
        </Routes>
      </main>
      <footer className="border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col sm:flex-row gap-4 sm:items-start">
          <div className="flex items-center gap-2 shrink-0">
            <Logo />
            <span className="font-semibold text-slate-700">yakugaku</span>
          </div>
          <div className="space-y-1 leading-relaxed sm:ml-auto sm:max-w-2xl">
            <p>개인 학습용 비공개 사이트입니다. 星薬科大学과 무관하며, 기출문제·교재의 저작권은 각 저작권자에게 있습니다. 정답·해설과 교재 정리는 자체적으로 작성해서 오류가 있을 수 있어요.</p>
            <p>입시 요강은 매년 바뀌어요. 최신 정보는 <a className="underline underline-offset-2 hover:text-slate-800" href="https://www.hoshi.ac.jp/admission/nyushi/" target="_blank" rel="noreferrer">대학 공식 입시 페이지</a>에서 확인하세요. 학습 기록은 이 브라우저에만 저장됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
