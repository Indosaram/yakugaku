# Task 13 — isolated review sync roundtrip (authoritative)

Date: 2026-11-09. Real backend, no mocks. This file supersedes `task-13-sync-roundtrip.md`,
whose real-vault section said the check was skipped and whose CORS relay is no longer relevant.

## What was proven

Two independent browser contexts against `https://yakugaku-sync.naidis.dev`.

| step | local | server |
|---|---|---|
| A starts (fresh) | 0 keys | 0 keys |
| A grades 10 cards (Space, then 1/2/3/4…, on `#/review/session`) | 22 keys: srs:card 10, mark 10, srs:log 1, srs:meta:new 1 | 22 keys, same split |
| B starts clean at `#/review` | pulls **22 keys** (srs:card 10, mark 10) | unchanged |
| B dashboard | today due **3** — matches A | — |
| B grades 3 more | `srs:log` 10 → **13** | `srs:log` = **13** |
| A reopens and pulls | `srs:log` = **13** | 22 keys |

The reverse leg crossed processes: A's own count was 10 and became 13 only after B's upload.
Each checkpoint reported zero pending uploads. Zero page errors and zero console errors.

## Why this run used port 5173

The backend allowlist (`backend/src/index.ts:18-24`) permits `localhost:5173`, `127.0.0.1:5173`,
4173, and `indosaram.github.io`. The first attempt used port 5288, which is **not** allowlisted,
and therefore needed a CORS-header relay. This run used **no relay**: the app ran on
`127.0.0.1:5173`, an officially allowed origin, so requests went out unmodified.
This closes the earlier qualification — direct unmodified CORS connectivity works on an
allowlisted origin.

## Real vault untouched

Read-only fingerprint: `POST /v1/sync` with `since:0, items:[]`. An empty `items` array never
writes; the server only advances `seq` when `items.length > 0`.

| field | before QA | after QA |
|---|---:|---:|
| total keys | 30 | 30 |
| `srs:card:` | 0 | 0 |
| `srs:log:` | 0 | 0 |
| `srs:meta:new:` | 0 | 0 |
| `mark:` | 3 | 3 |
| distinct prefixes | `__selftest, mark, chem, lesson, vocab` | identical |

Every authenticated test request targeted a **newly created temporary vault**
(`POST /v1/vault` → HTTP 201, 32-char code). No real-vault write was issued, so the counts above
being identical is the expected result and confirms no contamination.

## Cleanup

- Both browser contexts closed; the temporary dev server on 5173 was stopped.
- The temporary vault was fully tombstoned (`v:null` for all 22 keys) so it holds no learner data.
- No source file was changed by this task.

## Artifacts

- Temp-vault responses, dashboard screenshots: kept outside the repo in the system temp dir.
- Temporary sync codes are deliberately not recorded anywhere.
