# Task 13 - isolated review sync roundtrip

- Task: `st_01a1bfd8`
- Completed: `2026-11-09T10:34:45.221Z`
- Result: PASS for real-backend SRS upload, clean-context download, and reverse sync, with the CORS qualification below. Unmodified browser connectivity from port 5288 remains blocked.

## Isolation and HTTP results

- `POST https://yakugaku-sync.naidis.dev/v1/vault`: **HTTP 201**, with a nonempty code. The successful repeat used a second newly created temporary vault, also HTTP 201; its baseline sync returned HTTP 200 and zero keys. Neither temporary code is included here.
- Dev server: `http://127.0.0.1:5288`, using `VITE_SYNC_CODE=<temporary-code>` and `VITE_SYNC_URL=https://yakugaku-sync.naidis.dev`. No preview server was used.
- Browser: installed Google Chrome `157.0.8103.39`, driven by already-installed Playwright; two separate ephemeral contexts, A and B. Both started with zero localStorage entries and were explicitly cleared before application initialization. No user browser profile was opened.
- Every browser request to the sync service was guarded: authorization had to equal the temporary-vault code, or the request would be aborted. Zero guard violations occurred.
- Successful browser run: six real `/v1/sync` responses were HTTP 200; two automatic temporary-vault snapshot responses were HTTP 201. Independent curl reads after 10 and 13 grades were HTTP 200.

### CORS qualification

The deployed service rejects `Origin: http://127.0.0.1:5288`: direct OPTIONS requests to `/v1/snapshots` and `/v1/sync` both returned **HTTP 403**, with empty bodies and no Access-Control-Allow-Origin header. The initial unmodified-browser attempt therefore failed before sync.

To exercise the real backend without changing source or switching browser origins, the QA script used a Playwright CORS-header relay: it forwarded the application's actual requests to the actual HTTPS endpoint with the backend-allowed `Origin: http://127.0.0.1:5173`, then changed only Access-Control-Allow-Origin on the real response to `http://127.0.0.1:5288`. Authorization, paths, methods, request bodies, response bodies, and response statuses were not mocked or replaced. No server or browser was opened on port 5173. All stored records were independently read from the real service with curl.

This proves real-service data roundtrip, not that direct unmodified port-5288 CORS is supported. That deployment limitation remains unfixed; no source files were edited by this task.

## Server-side key prefixes

Prefix names and counts only; no card identifiers, codes, or stored values are disclosed.

| Prefix | After A grades 10 | After B grades 3 more |
| --- | ---: | ---: |
| `srs:card:` | 10 | 10 |
| `mark:` | 10 | 10 |
| `srs:log:` | 1 | 1 |
| `srs:meta:new:` | 1 | 1 |
| Total keys | 22 | 22 |

B reviewed three existing due cards, so unique-card and new-card counts stayed unchanged. Between the two curl reads, three SRS records, three marks, and the daily log changed; all seven changed records matched A's local data after its pull. Full local/server value equality was asserted in memory without printing values.

## Two-browser roundtrip numbers

Each row was read from the real `#/review` dashboard and the context's own progress store. All grades were entered on `#/review/session` using Space followed by a number key. A used `1,2,3,4,1,2,3,4,1,2`; B used `3,4,2`. Explicit syncs used the application's visible Sync page button, not injected progress writes.

| Observation | Studied today | Streak (days) | Due | New available | Backlog | SRS cards | Marks | New studied today |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| A, empty temporary vault | 0 | 0 | 0 | 15 | 0 | 0 | 0 | 0 |
| A, after 10 grades and upload | 10 | 1 | 3 | 5 | 0 | 10 | 10 | 10 |
| B, clean-context server download | 10 | 1 | 3 | 5 | 0 | 10 | 10 | 10 |
| B, after 3 more grades and upload | 13 | 1 | 0 | 5 | 0 | 10 | 10 | 10 |
| A, after syncing B's changes back | 13 | 1 | 0 | 5 | 0 | 10 | 10 | 10 |

A still had 10 studied cards immediately before the final pull and had 13 afterward. B's downloaded dashboard equaled A's after 10 grades; A's final dashboard equaled B's after 13. All successful-run browser page-error and console-error counts were zero. Each observed sync checkpoint had zero pending uploads.

The QA harness subscribed to exact DOM/state changes and network-response events before actions, with bounded failure timeouts; it used no fixed sleeps or polling delays. A prior harness attempt incorrectly required A to remain stale after a legitimate automatic sync; that assertion was corrected, and the complete successful run used a fresh empty temporary vault.

## Real-vault check

**SKIPPED: `SHARED_CODE` was not set in the environment before or after QA.** No code was guessed or substituted from source. No real-vault fingerprint request was sent, so no before/after key-name/count diff exists and the real vault cannot be reported as independently verified untouched. Every authenticated QA request instead targeted a newly created temporary vault.

## Artifacts and cleanup

- QA script: `/tmp/yakugaku-st_01a1bfd8-roundtrip.mjs`
- Local raw temporary-vault responses, successful-run result JSON, and dashboard screenshots: `/var/folders/zh/7cc25lt91b1_dj577306nwdh0000gn/T/yakugaku-sync-qa-f08npjeo/`. Temporary credentials and raw sync data were kept outside the repository and are not reproduced here.
- Screenshots of B after download and A after reverse sync were opened and visually checked.
- Both ephemeral contexts were cleared and closed; the QA browser was closed; the isolated Vite server was stopped and port 5288 had no remaining listener.
- This task wrote no source files. A before/after source fingerprint comparison observed concurrent changes to `src/App.tsx` and `src/pages/Checklist.tsx`; this task neither made nor reverted those changes.
