import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck2, PlayCircle } from "lucide-react";
import { useData, type EjuLecture } from "../data/remote";
import { markTimes, peekProgress, useProgress } from "../progress";
import { todayISO } from "../srs";
import { buildQueue } from "../review-queue";
import { papers } from "../data";
import { watchedKey } from "./Eju";
import { buildLectureItems, scheduledReviews, useReviewData } from "./Notes";
import { btn, studyGroups } from "../components/ui";

function shortKoreanDate(day: string): string {
  const [, month, date] = day.split("-").map(Number);
  return `${month}월 ${date}일`;
}

type ReviewToday = { count: number; nearest: string | null; due: number; fresh: number; lectures: number };

function useReviewToday(): { value: ReviewToday | null; error?: Error } {
  const { data, error } = useReviewData();
  const { store } = useProgress();
  const today = todayISO();
  const value = useMemo<ReviewToday | null>(() => {
    if (!data) return null;
    const lectures = buildLectureItems(data.lectures, data.notes, peekProgress);
    const queue = buildQueue({ today, decks: data.decks, read: peekProgress, markTimes: markTimes(), lectures });
    const { due, fresh, lectures: lectureCount } = queue.counts;
    const count = due + fresh + lectureCount;
    const nearest = count === 0 ? scheduledReviews(data.decks, today).find((item) => item.due > today)?.due ?? null : null;
    return { count, nearest, due, fresh, lectures: lectureCount };
  }, [data, store, today]);
  return { value, error };
}

export default function Home() {
  const { get } = useProgress();
  const review = useReviewToday();
  const { data: eju } = useData<EjuLecture[]>("eju/index.json");
  const nextLecture = eju?.find((lecture) => lecture.tier !== "패스" && get(watchedKey(lecture.idx)) !== true);
  const ready = review.value !== null && !review.error;
  const hasReview = ready && review.value!.count > 0;

  return (
    <div className="space-y-10">
      <section aria-labelledby="today-title" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <CalendarCheck2 aria-hidden className="size-6 shrink-0 text-indigo-700" />
          <h1 id="today-title" className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">오늘의 학습</h1>
        </div>
        <div className="mt-6 grid items-end gap-6 sm:grid-cols-[1fr_auto]">
          <div aria-live="polite">
            <h2 className="text-xl font-bold text-slate-900 tnum">
              {review.error ? "복습 현황을 불러오지 못했어요" : !ready ? "오늘 복습 확인 중" : hasReview ? `오늘 복습 ${review.value!.count}장` : "오늘 복습을 마쳤어요"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {review.error ? "복습 화면에서 다시 확인하세요." : !ready ? "저장된 학습 기록을 확인하고 있어요." : hasReview ? `만기 카드 ${review.value!.due}장 · 새 카드 ${review.value!.fresh}장 · 강의·노트 ${review.value!.lectures}개` : review.value!.nearest ? `다음 복습은 ${shortKoreanDate(review.value!.nearest)}입니다.` : "예정된 카드가 없어요. 아래에서 공부할 교재를 고르세요."}
            </p>
          </div>
          <Link to={hasReview ? "/review/session" : "/review"} className={btn.primary + " min-h-11 self-start sm:self-end"}>
            {hasReview ? "복습 시작" : "복습 일정 보기"}<ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        {nextLecture && <div className="mt-6 border-t border-slate-200 pt-5">
          <Link to={`/eju/${nextLecture.idx}`} className="group flex min-h-11 items-center gap-3 rounded-xl text-sm text-slate-700 hover:text-indigo-700">
            <PlayCircle aria-hidden className="size-5 shrink-0" />
            <span className="min-w-0 flex-1">EJU 화학 강의 이어서 <span className="font-semibold">· {nextLecture.no}강</span></span>
            <ArrowRight aria-hidden className="size-4 shrink-0" />
          </Link>
        </div>}
      </section>

      <section aria-labelledby="directory-title">
        <h2 id="directory-title" className="mb-6 text-xl font-bold text-slate-900">과목별 학습</h2>
        <div className="grid items-start gap-x-8 gap-y-8 md:grid-cols-2">
          {studyGroups.map((section) => <section key={section.label} aria-label={section.label} className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="mb-3 font-semibold text-slate-900">{section.label}</h3>
            <ul className="divide-y divide-slate-100">
              {section.paths.map((item) => <li key={item.to}>
                <Link to={item.to} className="group -mx-2 flex min-h-11 items-center gap-4 rounded-xl px-2 py-3 hover:bg-stone-50">
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-800 group-hover:text-indigo-700">{item.label}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.desc}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 shrink-0 text-slate-500" />
                </Link>
              </li>)}
            </ul>
          </section>)}
        </div>
      </section>

      <section className="border-t border-slate-200 pt-6">
        <h2 className="text-xl font-bold text-slate-900">공식 기출 원본</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">영어·수학·화학 시험지는 <a className="text-indigo-700 underline underline-offset-4" href="https://www.hoshi.ac.jp/admission/nyushi/exam/" target="_blank" rel="noreferrer">星薬科大学 入学試験過去問題</a>에서 확인하세요. 영어 B방식 {papers.length}개년은 이 사이트에 전 문항 해설이 있습니다.</p>
      </section>
    </div>
  );
}
