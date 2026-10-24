import { useState } from "react";
import { Cloud, CloudOff, RefreshCw, ShieldCheck } from "lucide-react";
import { PageTitle, btn } from "../components/ui";
import { localBackups, restoreBackup, useProgress } from "../progress";
import { backupToServer, syncNow, useSync } from "../sync";

const fmt = (t: number | null) => (t ? new Date(t).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "아직 없음");

export default function SyncPage() {
  const s = useSync();
  const { store } = useProgress();
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
        모든 기기(휴대폰·맥북·PC)가 같은 계정 하나를 써요. 이 사이트를 열기만 하면 어느 기기에서나 같은 기록이 보여요. 코드를 넣을 필요가 없고, 인터넷이 끊겨도 계속 표시할 수 있어요.
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
          <div className="mt-5 flex flex-wrap gap-2">
            <button className={btn.secondary} disabled={busy} onClick={() => run(backupToServer, "지금 상태를 서버에 백업했어요.")}><ShieldCheck aria-hidden className="size-4" />서버에 전체 백업</button>
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-600">계정에 연결하는 중이에요. 인터넷이 연결되면 자동으로 맞춰져요.</p>
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
