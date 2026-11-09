# Task 13 - isolated review sync roundtrip (root re-run, no relay)

Date: 2026-11-09. Rendered against the REAL backend, no CORS relay, no mocks.

## Setup
- Temporary vault: `POST https://yakugaku-sync.naidis.dev/v1/vault` -> **HTTP 201**, 32-char code (not recorded here).
- Dev server: `127.0.0.1:5173` with `VITE_SYNC_CODE=<temp>` — 5173 is on the backend allowlist (`backend/src/index.ts:18-24`), so no CORS workaround was needed. This corrects the earlier attempt, which used port 5288 (not allowlisted) and therefore needed a relay.
- Two fresh `Bun.WebView` contexts (separate localStorage), both starting at `{}`.
- `bun run preview` was never used.

## Roundtrip

| step | local | server |
|---|---|---|
| A starts | `{}` (0 keys) | 0 keys |
| A grades 10 (Space + keys 1,2,3,4,1,2,3,4,1,2) | 22 keys: srs:card 10, mark 10, srs:log 1, srs:meta:new 1 | **22 keys**, same split |
| B loads clean origin | pulls **22 keys**: srs:card 10, mark 10 | unchanged |
| B dashboard | today due **3**, same as A's | — |
| B grades 3 more | `srs:log` 10 -> **13** | `srs:log` = **13** |
| A reopens and pulls | `srs:log` = **13** | 22 keys |

Dashboard cross-checks: A after 10 grades showed `남은 5장 · 오늘 10장`; B's pulled dashboard showed today due 3, matching A. A's `srs:log` was 10 and became 13 after the pull, so the reverse leg really crossed processes.

## Real vault untouched
Read-only fingerprint via `POST /v1/sync {since:0,items:[]}` (empty `items` never writes; the server only bumps `seq` when `items.length`).

| | total keys | srs:card | mark |
|---|---:|---:|---:|
| before QA | 30 | 0 | 3 |
| after QA | 30 | 0 | 3 |

Identical, including `mark:`. No real-vault key was written, deleted, or re-stamped.

## Cleanup
- Both browser contexts closed; dev server on 5173 stopped.
- Temporary vault's SRS keys tombstoned so the temp code holds no learner data.
- No source file was changed by this task (`git diff` shows only the ignored `tsconfig.tsbuildinfo`).
