import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { allKeys, itemsFor, peekProgress, setMany, useProgress } from "../progress";
import { todayISO } from "../srs";
import { dayKey } from "../srs-card";
import { buildQueue } from "../review-queue";
import { PageTitle, btn } from "../components/ui";
import { buildLectureItems, useReviewData } from "./Notes";

const DAY = 86_400_000;
const NEW_PREFIX = "srs:meta:new:";
const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function shiftDay(day: string, delta: number): string {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, date) + delta * DAY).toISOString().slice(0, 10);
}

function shortDate(day: string): string {
  const [, month, date] = day.split("-").map(Number);
  return `${month}.${date}`;
}

function longDate(day: string): string {
  const [year, month, date] = day.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, date)).getUTCDay()];
  return `${year}년 ${month}월 ${date}일 ${weekday}요일`;
}

// 하루 기록은 1 이상의 숫자만 인정한다. 0이나 깨진 값은 기록 없음으로 본다.
function readCount(read: (key: string) => unknown, date: string): number {
  const value = Number(read(dayKey(date)) ?? 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

// 오늘 기록이 있으면 오늘부터, 없으면 어제부터 거슬러 올라간다.
// 오늘 아직 안 했어도 어제까지의 연속일은 끊기지 않는다.
export function streakDays(read: (key: string) => unknown, today: string): number {
  let cursor = readCount(read, today) >= 1 ? today : shiftDay(today, -1);
  let streak = 0;
  while (readCount(read, cursor) >= 1) {
    streak += 1;
    cursor = shiftDay(cursor, -1);
  }
  return streak;
}

export function recentActivity(
  read: (key: string) => unknown,
  today: string,
  length = 14,
): { date: string; count: number }[] {
  return Array.from({ length }, (_, index) => {
    const date = shiftDay(today, index - length + 1);
    return { date, count: readCount(read, date) };
  });
}

// srs:meta:new: 중 60일보다 오래된 키만 고른다. srs:log: 는 접두사가 달라 절대 포함되지 않는다.
export function staleNewKeys(keys: Iterable<string>, today: string): string[] {
  const cutoff = shiftDay(today, -60);
  return [...keys].filter((key) => {
    if (!key.startsWith(NEW_PREFIX)) return false;
    const date = key.slice(NEW_PREFIX.length);
    return /^\d{4}-\d{2}-\d{2}$/.test(date) && date < cutoff;
  });
}

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <div className="min-w-0 rounded-xl bg-stone-50 px-3 py-3 text-center sm:px-4" title={hint}>
      <dt className="text-xs text-slate-600">{label}</dt>
      <dd className="mt-1 text-2xl font-bold tracking-tight text-slate-900 tnum">{value}</dd>
    </div>
  );
}

export default function ReviewHome() {
  const { data, error } = useReviewData();
  const { store } = useProgress();
  const today = todayISO();

  const queue = useMemo(() => {
    if (!data) return null;
    const lectures = buildLectureItems(data.lectures, data.notes, peekProgress);
    const markTimes = Object.fromEntries(itemsFor(allKeys()).map((item) => [item.k, item.t]));
    return buildQueue({ today, decks: data.decks, read: peekProgress, markTimes, lectures });
    // store 는 값 자체가 아니라 신호다. peekProgress 가 최신 캐시를 읽도록 채점·정리 뒤 다시 계산한다.
  }, [data, store, today]);
  const activity = useMemo(() => recentActivity(peekProgress, today), [store, today]);
  const streak = useMemo(() => streakDays(peekProgress, today), [store, today]);

  // 마운트 1회 정리. 오늘 쿼터 계산에만 쓰는 오래된 srs:meta:new: 만 지우고,
  // 연속일·14일 기록의 원천인 srs:log: 는 건드리지 않는다. 렌더 중 쓰기 없음.
  useEffect(() => {
    const stale = staleNewKeys(allKeys(), todayISO());
    if (!stale.length) return;
    const entries: Record<string, undefined> = {};
    for (const key of stale) entries[key] = undefined;
    setMany(entries);
  }, []);

  const counts = queue?.counts;
  const queueSize = counts ? counts.due + counts.fresh + counts.lectures : 0;
  // dueByDeck 의 삽입 순서는 가장 오래된 만기일, 덱 키 순서로 고정된다.
  const dueByDeck = queue ? [...queue.dueByDeck.values()] : [];
  const totalDue = dueByDeck.reduce((sum, row) => sum + row.count, 0);
  const studiedToday = activity[activity.length - 1]?.count ?? 0;
  const total14 = activity.reduce((sum, day) => sum + day.count, 0);
  const max14 = Math.max(1, ...activity.map((day) => day.count));

  return (
    <div>
      <PageTitle kicker="학습 대시보드" title="오늘의 복습">
        오늘 만기된 카드와 새 카드, 복습 표시한 강의·노트를 한 화면에서 확인하고 바로 시작하세요.
      </PageTitle>

      {!data && !error && (
        <div className="py-20 text-center text-slate-500" role="status">불러오는 중…</div>
      )}

      {error && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600">
          복습 데이터를 불러오지 못했어요. 새로고침해 주세요.
        </div>
      )}

      {counts && queue && (
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="today-heading">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 id="today-heading" className="text-xl font-bold text-slate-900">오늘</h2>
              <p className="text-sm text-slate-500 tnum">{longDate(today)}</p>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-3">
              <Stat label="오늘 복습" value={totalDue + counts.lectures} hint="전체 만기 카드와 복습 표시한 강의·노트" />
              <Stat label="새 카드" value={counts.fresh} hint="오늘 처음 꺼낼 카드" />
              <Stat label="밀린 카드" value={counts.remaining} hint="오늘 큐 상한을 넘어 남은 복습" />
            </dl>

            {counts.lectures > 0 && <p className="mt-3 text-sm text-slate-600">강의·노트 {counts.lectures}건 포함</p>}
            <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
              {queueSize > 0 ? (
                <Link to="/review/session" className={btn.primary + " w-full sm:w-auto"}>
                  복습 시작
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              ) : (
                <p className="text-sm font-medium text-slate-700">오늘은 복습할 카드가 없어요.</p>
              )}
              <p className="text-sm text-slate-500">
                {counts.remaining > 0
                  ? "밀린 카드는 아래 덱별 목록에서 바로 시작할 수 있어요."
                  : queueSize > 0
                    ? `오늘 큐 ${queueSize}장으로 바로 시작할 수 있어요.`
                    : "새 카드는 내일 다시 채워져요."}
              </p>
            </div>
          </section>

          <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="activity-heading">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <h2 id="activity-heading" className="text-xl font-bold text-slate-900">최근 14일</h2>
                <p className="text-xs text-slate-500 tnum">
                  {shortDate(activity[0].date)} – {shortDate(activity[activity.length - 1].date)}
                </p>
              </div>

              <div className="mt-5 flex h-24 items-end gap-1" role="list" aria-label="최근 14일 하루 학습량">
                {activity.map((day) => (
                  <div
                    key={day.date}
                    role="listitem"
                    className="flex h-full flex-1 items-end"
                    title={`${longDate(day.date)} · ${day.count}장`}
                  >
                    <div
                      aria-hidden="true"
                      style={day.count > 0 ? { height: `${(day.count / max14) * 100}%` } : undefined}
                      className={
                        day.count > 0
                          ? "w-full min-h-1 rounded-t bg-indigo-700"
                          : "h-0.5 w-full rounded-t bg-stone-200"
                      }
                    />
                    <span className="sr-only">{longDate(day.date)} {day.count}장</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between border-t border-slate-100 pt-2 text-xs text-slate-500 tnum">
                <span>{shortDate(activity[0].date)}</span>
                <span>오늘</span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                {total14 > 0
                  ? `14일 동안 ${total14}장을 기록했어요.`
                  : "최근 14일 기록은 아직 없어요."}
              </p>
            </section>

            <section className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="streak-heading">
              <div className="flex items-center gap-2">
                <CalendarCheck2 aria-hidden className="size-5 text-indigo-700" />
                <h2 id="streak-heading" className="text-xl font-bold text-slate-900">연속 학습</h2>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold tracking-tight text-slate-900 tnum">
                  {streak}
                  <span className="ml-1 text-lg font-semibold text-slate-600">일</span>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  {streak === 0
                    ? "오늘부터 기록이 쌓여요."
                    : studiedToday > 0
                      ? `오늘 ${studiedToday}장을 기록했어요.`
                      : "어제까지 이어진 기록이에요."}
                </p>
              </div>
            </section>
          </div>

          <section aria-labelledby="backlog-heading">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="backlog-heading" className="text-xl font-bold text-slate-900">덱별 만기 카드</h2>
              <p className="text-sm text-slate-600 tnum">전체 만기 카드 {totalDue}장</p>
            </div>
            {dueByDeck.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500">
                밀린 카드가 없어요.
              </p>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                  <caption className="sr-only">덱별 만기 카드 수</caption>
                  <thead>
                    <tr className="border-b border-slate-200 bg-stone-50 text-left text-xs text-slate-500">
                      <th scope="col" className="px-4 py-2.5 font-medium">덱</th>
                      <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-5">만기 카드</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dueByDeck.map((row) => (
                      <tr key={row.key} className="transition hover:bg-stone-50">
                        <td className="min-w-0 p-0">
                          <Link
                            to={`/review/session?deck=${encodeURIComponent(row.key)}`}
                            className="flex min-h-11 items-center gap-2 px-4 py-2.5 font-medium text-slate-800 hover:text-indigo-700"
                          >
                            <span className="min-w-0 break-words">{row.title}</span>
                            <ArrowRight aria-hidden className="ml-auto size-4 shrink-0 text-slate-300" />
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2.5 text-right text-slate-700 tnum sm:px-5">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="border-t border-slate-200 bg-stone-50">
                    <tr>
                      <th scope="row" className="px-4 py-2.5 text-left font-medium">합계</th>
                      <td className="px-4 py-2.5 text-right font-semibold tnum sm:px-5">{totalDue}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
