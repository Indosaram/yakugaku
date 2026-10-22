import { useState } from "react";
import { Cloud, CloudOff, Copy, RefreshCw, ShieldCheck } from "lucide-react";
import { PageTitle, btn } from "../components/ui";
import { localBackups, restoreBackup, useProgress } from "../progress";
import { backupToServer, createCode, disconnect, formatCode, joinCode, syncNow, useSync } from "../sync";

const fmt = (t: number | null) => (t ? new Date(t).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "아직 없음");

export default function SyncPage() {
  const s = useSync();
  const { store } = useProgress();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [backups, setBackups] = useState(localBackups);
  const run = async (f: () => Promise<unknown>, ok: string) => {
    setBusy(true); setMsg(null);
    try { await f(); setMsg(ok); } catch (e) { setMsg((e as Error).message || "실패했어요. 인터넷 연결을 확인해 주세요."); } finally { setBusy(false); }
  };
  const count = Object.keys(store).length;
  const statusText = { off: "연결 안 됨", idle: "동기화됨", syncing: "동기화 중…", offline: "오프라인 · 연결되면 자동으로 올려요", error: "오류" }[s.status];

  return (
    <div className="mx-auto max-w-2xl">
      <PageTitle kicker="학습 기록" title="기록 보관 · 기기 간 동기화">
        표시한 기록은 먼저 이 기기에 저장되고, 동기화 코드를 연결하면 서버에도 백업돼요. 다른 기기(휴대폰·PC)에서 같은 코드를 넣으면 기록이 합쳐집니다. 인터넷이 끊겨도 계속 표시할 수 있어요.
      </PageTitle>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6" data-sync-status={s.status}>
        <div className="flex items-center gap-3">
          {s.code ? <Cloud aria-hidden className="size-6 text-emerald-600" /> : <CloudOff aria-hidden className="size-6 text-slate-400" />}
          <div className="min-w-0 flex-1">
            <p className="font-bold text-slate-900">{statusText}</p>
            <p className="text-sm text-slate-500 tnum">이 기기 기록 {count}개 · 마지막 동기화 {fmt(s.last)}</p>
          </div>
          {s.code && <button className={btn.secondary} disabled={busy || s.status === "syncing"} onClick={() => run(syncNow, "동기화했어요.")}><RefreshCw aria-hidden className="size-4" />지금 동기화</button>}
        </div>
        {s.code ? (
          <div className="mt-5 space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-700">내 동기화 코드</p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <code data-sync-code className="select-all break-all rounded-xl bg-stone-100 px-3 py-2 font-mono text-[15px] tracking-wide text-slate-900">{formatCode(s.code)}</code>
                <button className={btn.secondary} onClick={() => navigator.clipboard?.writeText(formatCode(s.code!)).then(() => setMsg("코드를 복사했어요."))}><Copy aria-hidden className="size-4" />복사</button>
              </div>
              <p className="mt-1 text-xs text-slate-500">이 코드가 있으면 누구든 기록을 볼 수 있어요. 본인 기기에만 넣고, 잃어버리지 않게 메모해 두세요.</p>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              <button className={btn.secondary} disabled={busy} onClick={() => run(backupToServer, "지금 상태를 서버에 백업했어요.")}><ShieldCheck aria-hidden className="size-4" />서버에 전체 백업</button>
              <button className="inline-flex items-center gap-1 px-2 py-2 text-sm text-slate-500 hover:text-slate-900" onClick={() => confirm("이 기기의 동기화 연결만 끊을까요? 이 기기의 기록은 그대로 남아요.") && disconnect()}>이 기기 연결 끊기</button>
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-stone-50 p-4">
              <p className="font-semibold text-slate-900">처음 쓰는 기기라면</p>
              <p className="mt-1 text-sm text-slate-600">새 코드를 만들면 지금 이 기기 기록 전부가 서버에 올라가요.</p>
              <button className={btn.primary + " mt-3"} disabled={busy} data-action="create-code" onClick={() => run(createCode, "코드를 만들고 기록을 서버에 올렸어요. 다른 기기에서 이 코드를 넣으세요.")}>새 동기화 코드 만들기</button>
            </div>
            <form className="rounded-xl bg-stone-50 p-4" onSubmit={(e) => { e.preventDefault(); void run(() => joinCode(input), "연결했어요. 두 기기의 기록을 합쳤어요."); }}>
              <p className="font-semibold text-slate-900">이미 코드가 있다면</p>
              <label className="mt-1 block text-sm text-slate-600" htmlFor="sync-code">다른 기기에서 받은 코드를 넣으세요. 이 기기 기록은 지워지지 않고 합쳐져요.</label>
              <input id="sync-code" value={input} onChange={(e) => setInput(e.target.value)} placeholder="XXXX-XXXX-…" autoComplete="off" autoCapitalize="characters" spellCheck={false} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 font-mono text-sm" />
              <button className={btn.dark + " mt-2"} disabled={busy || !input.trim()} data-action="join-code">연결하기</button>
            </form>
          </div>
        )}
        {(msg || s.message) && <p role="status" className="mt-4 rounded-xl bg-indigo-50 px-3 py-2 text-sm text-indigo-900">{msg ?? s.message}</p>}
      </section>

      {backups.length > 0 && (
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <h2 className="font-bold text-slate-900">이 기기의 자동 백업</h2>
          <p className="mt-1 text-sm text-slate-500">기록을 전부 지우기 직전 상태를 남겨 둔 거예요. 되살리면 지금 비어 있는 항목만 채워져요.</p>
          <ul className="mt-3 divide-y divide-slate-100">
            {backups.map((b) => (
              <li key={b.at} className="flex items-center gap-3 py-2 text-sm">
                <span className="flex-1 tnum">{fmt(b.at)} · {Object.keys(b.data).length}개</span>
                <button className={btn.secondary} onClick={() => { const n = restoreBackup(b.data); setMsg(`${n}개 항목을 되살렸어요.`); setBackups(localBackups()); }}>되살리기</button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
