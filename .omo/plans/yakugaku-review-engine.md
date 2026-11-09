# yakugaku-review-engine - Work Plan

## TL;DR (For humans)

**Who this is for and what changes for them:** 호시약대 B방식 준비생 한 사람(본인). 지금은 959장의 카드 중 무엇을 다시 봐야 할지 매번 스스로 정해야 하지만, 앞으로는 사이트를 열면 "오늘 복습할 카드 N장"이 이미 정해져 있고 한 번 누르면 바로 시작됩니다.

**What you'll get:** (1) 오늘의 복습 큐와 4단계 채점(모름/애매/앎/쉬움), (2) 다음 복습일을 자동으로 정하는 일정 엔진, (3) 연속 학습일·최근 14일·덱별 밀린 양을 보여주는 대시보드, (4) 인강 "복습 필요" 표시와 개념 노트가 같은 큐로 합류.

**Why this approach:** 인스타 두 게시물의 핵심은 각각 "Anki처럼 오늘 볼 것을 기계가 정해 준다"(의대생 계정)와 "강의 → 노트 → 리뷰 트래커로 한 바퀴"(공대생 계정)입니다. 이미 있는 ○△× 표시·진도 저장소·기기 간 동기화를 그대로 쓰고, 그 위에 날짜 개념과 하루 기록만 얹습니다. 새 라이브러리도 AI 호출도 없습니다.

**What it will NOT do:**
- Anki 파일을 가져오거나 내보내지 않고, Claude/LLM을 호출하지 않습니다.
- 기존 학습 기록 형식·키·○△× 화면을 바꾸지 않습니다(읽기만 하고, 새 키를 더합니다).
- 어휘 단어와 백엔드 스키마는 이번 범위가 아닙니다(카드 959장만).

**Effort:** Large
**Risk:** Medium - 실사용 기록과 공용 동기화 금고 위에 얹히므로, 모든 검증은 **별도 임시 금고**에서만 수행하도록 계획에 못박았습니다.
**Decisions to sanity-check:** 하루 신규 카드 15장 상한 / 채점 4단계 / 어휘는 v2로 미룸 / 백엔드 무변경 / 이미 ○△× 표시된 카드는 그 표시를 출발점으로 삼아 일정에 편입.

Your next move: 승인하면 `/ulw-execute yakugaku-review-engine` 으로 실행합니다. Full execution detail follows below.

---

> TL;DR (machine): Large/Medium - deterministic local-day SM-2-lite scheduler + /review queue + dashboard + deck/lecture integration on the existing localStorage-first store, existing marks seeded into the schedule, QA isolated in a throwaway vault, no backend or dependency changes.

## Scope

### Affected user and ideal state

**Affected user:** 윤인도 — 星薬科大学 薬学部 6년제 一般選抜 B方式을 혼자 준비하는 한 사람. iPhone(이동 중)과 MacBook(책상) 두 기기에서 같은 사이트를 연다. 오늘 쓰는 방식: 덱 페이지를 열어 카드를 넘기고 ○/△/× 를 직접 찍고, "×만 다시" 버튼으로 회차 복습을 한다. 무엇을 언제 다시 볼지는 전적으로 기억과 의지에 달려 있다.

| Row | Statement | Reason |
| --- | --- | --- |
| IS-1 | 사이트를 열면 "오늘 복습 N장"이 숫자로 보이고, 한 번 누르면 그 카드들이 바로 시작된다. | 자기주도 학습에서 가장 비싼 비용은 "무엇을 지금 해야 하나"를 매번 다시 결정하는 것이다. 이 결정을 사이트가 대신한다. |
| IS-2 | 카드마다 채점하면 다음 복습일이 결정론적으로 정해지고, 그 일정이 기기를 바꿔도 유지된다. | 일정 자체가 제품이다. 기기 변경이나 새로고침에서 일정이 사라지면 신뢰가 깨지고 다시는 안 쓰게 된다. |
| IS-3 | 한 화면에서 어느 덱이 얼마나 밀렸는지 보이고, 거기서 해당 덱의 밀린 카드로 바로 들어간다. | 밀린 양이 안 보이면 회피가 시작된다. 보이면 그 자체가 시작 버튼이 된다. |
| IS-4 | 인강에서 "복습 필요"로 표시한 항목과 오늘 만기된 카드가 같은 하루 큐에 함께 뜬다. | R2의 리뷰 트래커는 노트와 카드가 같은 루프에 있을 때만 작동한다. 따로 있으면 둘 다 안 본다. |
| IS-5 | 기존 ○△× 표시, 회차 복습(×/△ 풀), 인강 체크표, 메모, 동기화가 전부 지금과 똑같이 동작하고, **6주치 기존 표시가 새 일정에 그대로 반영된다.** | 6주치 실제 학습 기록이 그 키들에 들어 있다. 하나라도 깨지거나 버려지면 복구 비용이 기능 이득보다 크다. |
| GAP-1 | 지금은 만기일 개념이 아예 없다. 복습은 사용자가 × 필터를 눌러야 시작되는 수동 회차뿐이다. | IS-1, IS-2 |
| GAP-2 | 지금은 오늘 할 일 수, 연속일, 밀린 양을 보여주는 화면이 어디에도 없다. | IS-3 |
| GAP-3 | 지금은 인강 체크표·개념 노트·암기 카드가 서로 다른 페이지이고 공통 큐가 없다. | IS-4 |
| GAP-4 | 지금은 스케줄 상태가 없어서 **이관할 스케줄은 없지만, 기존 `mark:` 표시 6주치가 이미 존재한다.** 새 엔진이 이를 무시하면 이미 ×로 표시한 카드가 64일 뒤에야 다시 나온다. | IS-5 |
| GAP-5 | 지금은 하루 단위 활동 기록이 없어 연속일·최근 14일을 만들 원천이 없다. 카드 상태에는 마지막 채점일만 남으므로 재채점 시 과거가 덮인다. | IS-3 |

### Must have

- 순수 함수 스케줄러: (이전 상태, 채점, 오늘 날짜) → (다음 상태, 다음 만기일). 시계는 주입 가능, **날짜는 기기 로컬 자정 기준**.
- 카드 신원 통일: `mark:<id>` 와 `srs:<id>` 가 **같은 id** 를 쓴다.
- **기존 표시 시딩(seeding)**: `srs:` 가 없는 카드는 `mark:` 값을 출발점으로 삼아 오늘 큐에 편입한다(마이그레이션 없음, 파생 계산만).
- `/review` 라우트: 오늘 큐 → 카드 제시 → 채점 → 다음 → 세션 요약.
- 채점 시 기존 `mark:` 값과 하루 기록 `srs:log:<date>` 를 **같은 `setMany` 호출**로 함께 갱신.
- 대시보드: 연속 학습일, 최근 14일 활동, 덱별 밀린 수 — 모두 `srs:log:<date>` 에서 파생.
- 덱 페이지: 만기 배지 + "오늘 이 덱 복습" 진입. **큐 대상 3개 파일의 덱에만 표시.**
- 인강 체크표: "복습 필요" 항목을 큐 항목으로 승격.
- `bun run test`(= `TZ=Asia/Seoul bun test`) 로 스케줄러·큐·세션 상태를 검증. `bun run build` 통과.
- **QA는 임시 금고에서만** — 실제 학습 기록을 절대 건드리지 않는다.

### Must NOT have (guardrails, anti-slop, scope boundaries)

- Anki 연동(가져오기/내보내기/애드온), LLM/Claude 호출, 계정 시스템 금지.
- `hoshi-eigo-progress-v1` 형식 변경, 기존 키 이름 변경·삭제, 파괴적 마이그레이션 금지.
- 백엔드(`backend/`) 스키마 변경·재배포 금지.
- 어휘 단어(vocab) SRS, 다크 모드, 기존 페이지 재디자인 금지.
- 퀴즈 정답 여부로 자동 채점 금지 — 채점은 항상 사용자의 판단.
- 새 npm 런타임 의존성 금지(테스트용 `@types/bun` 개발 의존성만 허용).
- **QA 는 `127.0.0.1:5173` + `VITE_SYNC_CODE` 임시 금고에서만.** `src/sync.ts:137-156` 은 저장된 코드가 공용 코드와 다르면 `switch-shared` 로 **실제 금고에 붙어 `allKeys()` 전체를 올린다**(`:101-113`). `backend/src/index.ts:18-21` 은 `localhost`·`127.0.0.1` 을 모두 허용하므로 오리진을 나누고, `preview`(`:4173`)는 빌드에 공용 코드가 박혀 쓰지 않는다. QA 후 그 오리진 스토리지를 지운다.
- **테스트는 `bun run test`(= `TZ=Asia/Seoul bun test`) 로만 돌린다.** 날짜 경계 테스트가 머신 시간대에 종속되면 커밋 게이트가 환경마다 뒤집힌다.
- 애니메이션·이모지 남발 금지. DESIGN.md 의 기존 토큰만 사용.

## Verification strategy

> Zero human intervention - all verification is agent-executed.
- **Test decision:** tests-after for the pure core, framework = **Bun 내장 test**, 실행 명령은 **`bun run test`**(= `TZ=Asia/Seoul bun test`; `bun test` 를 직접 부르면 UTC 로 돌아 날짜 경계 테스트가 깨진다 — 실측 확인). localStorage 의존 모듈은 `bunfig.toml` preload 로 인메모리 shim 을 주입해 테스트한다(`src/progress.ts:66,93` 이 모듈 로드 시 `localStorage` 를 읽으므로 shim 없이는 어떤 테스트도 import 단계에서 죽는다 — 리뷰 라운드 1에서 실측 확인).
- **Build gate:** `bun run build` (tsc -b + vite build) exit 0.
- **QA isolation gate (필수):** 모든 브라우저 QA 는 `127.0.0.1:5173` + `VITE_SYNC_CODE=<임시 32자 코드>` 로 띄운 dev 서버에서만 수행하고, **QA 전에 실제 금고를 `/tmp` 로 덜어 두고 QA 후 같은 명령으로 떠서 diff 0건을 증거로 남긴다**(T13 이 절차를 소유한다. 스냅샷은 **사용자 판단용 증거**일 뿐이며, diff 가 0이 아니어도 자동 복원은 하지 않는다 — T13 Acceptance).
- **Real-surface gate:** `bun run dev` + aside 브라우저로 실제 클릭·채점·새로고침·기기 2대 동기화.
- **Evidence:** `<attemptDir>/task-<N>-yakugaku-review-engine.<ext>`, attemptDir = `.omo/evidence/` (ulw-loop 밖) 또는 `currentAttemptDir` (ulw-loop 안).
- **회귀 기준선:** 변경 전 `bun run build` 1회 실행해 baseline 통과를 먼저 기록한다(현재 `public/data/vecc/01.md` 만 수정 상태 — 건드리지 않고 스테이징에서 제외).

## Execution strategy

### Parallel execution waves

- **Wave 1 (기반, 3):** T1 스케줄러 코어, T2 카드 신원·채점 브리지, T3 테스트 인프라(로컬스토리지 shim).
- **Wave 2 (시딩·도메인, 3):** T4 기존 표시 시딩(T1·T2 후), T5 오늘 큐 빌더, T6 세션 상태 머신.
- **Wave 3 (표면, 4):** T7 `/review` 세션 화면, T8 대시보드, T9 덱 통합, T10 인강/노트 통합.
- **Wave 4 (연결·문서·실증, 3):** T11 내비·홈·모바일/a11y, T12 문서, T13 임시 금고 동기화 실증.

### Dependency matrix

| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| T1 스케줄러 코어 | - | T5, T6, T7 | T2, T3, T4 |
| T2 카드 신원·채점 브리지 | - | T5, T7, T9 | T1, T3, T4 |
| T3 테스트 인프라(shim) | - | T1, T2, T5, T6 테스트 실행 | T1, T2, T4 |
| T4 시딩 규칙 | T1, T2 | T5, T9 | T3 |
| T5 오늘 큐 빌더 | T1, T2, T4 | T7, T8, T9, T10 | T6 |
| T6 세션 상태 머신 | T1, T2 | T7 | T5 |
| T7 `/review` 세션 화면 | T5, T6, T2 | T11 | T8, T9, T10 |
| T8 대시보드 | T5 | T11 | T7, T9, T10 |
| T9 덱 통합 | T2, T5, T4 | T11 | T7, T8, T10 |
| T10 인강/노트 통합 | T5 | T11 | T7, T8, T9 |
| T11 내비·홈·모바일/a11y | T7, T8, T9, T10 | T12, T13 | - |
| T12 문서 | T11 | T13 | - |
| T13 임시 금고 동기화 실증 | T11 | - | T12 |

## Todos

> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [x] 1. 스케줄러 코어 모듈과 단위 테스트
  What to do: `src/srs.ts` 에 순수 함수 스케줄러를 만든다. 타입 `SrsState { due: string; ivl: number; ease: number; reps: number; lapses: number; last: string; m: "o"|"t"|"x" }`, `Grade = "x" | "t" | "o" | "e"`(모름/애매/앎/쉬움). `m` 필드는 이 상태를 마지막으로 쓴 시점의 `mark:` 값으로, 덱 화면에서 나중에 표시가 바뀐 경우를 **정확히** 감지하기 위한 것이다(T4 가 사용). `review(state, grade, todayISO) -> SrsState`; 신규 카드는 `init(todayISO, seed?)`.
  **규칙을 애매함 없이 고정한다:**
  - 사다리 `LADDER = [0,1,3,7,14,30,60,120]`(일). `ivl` 은 항상 이 사다리의 원소다. 현재 칸 `i = LADDER.indexOf(ivl)`; 값이 사다리에 없으면(레거시·손상) **ivl 이하의 가장 큰 칸**으로 정규화하고, 그것도 없으면 0칸.
  - ease 는 `1.3..2.8` 로 클램프하고 **매 전이 후 소수 2자리로 반올림**한다(부동소수 잔차로 `2.5 − 5×0.2 = 1.4999999999999998` 이 1.5 미만 판정을 받는 것을 막는다). `x` 는 ease −0.2, `t` 는 −0.05, `o` 는 +0.0, `e` 는 +0.15.
  - **신규·시딩 상태의 초기 ease 는 정확히 `2.0`** (T4 도 같은 값을 쓴다). `init(todayISO)` 는 `{ due: todayISO, ivl: 0, ease: 2.0, reps: 0, lapses: 0, last: todayISO, m: "x" }`.
  - 전진 칸 수: `t` → +1칸, `o` → +2칸, `e` → +3칸. 단 ease 가 2.3 이상이면 `o`/`e` 는 **한 칸 더**(각각 +3/+4), 1.5 미만이면 한 칸 덜(각각 +1/+2). 결과 칸은 `0..7` 로 클램프. **이 보정이 ease 가 일정에 미치는 유일한 경로다.**
  - **`x`(모름)는 칸을 초기화한다:** `ivl = 0`, `due = today`, `reps = 0`, `lapses + 1`, ease −0.2. 그래야 방금 틀린 카드가 가장 가까운 날짜로 돌아온다. `t`/`o`/`e` 는 `reps + 1`.
  - `last` 는 마지막 채점일, `m` 은 그 채점 결과의 `mark` 값(`e`→`"o"`).
  - 같은 날 같은 카드를 다시 채점하는 것은 **허용**한다(`x` 가 당일 재출제하므로 필연). 상태 전이는 현재 상태에서 결정론적으로 재계산되고, 하루 기록(`srs:log`)은 채점 이벤트마다 1씩 증가한다. 멱등성의 정의는 "같은 날 두 번 = 상태 같다"가 아니라 **"같은 입력 → 같은 출력"** 이다.
  - 날짜는 `YYYY-MM-DD`. `todayISO(now = new Date())` 는 **로컬** `getFullYear/getMonth/getDate` 로 만든다(`toISOString()` 금지 — UTC 기준이라 KST 09:00 에 날짜가 바뀐다). 일 산술은 UTC 자정 기준 Date 로 계산해 DST 영향을 제거.
  **Must NOT do:** `Date.now()` 직접 호출 금지(시계는 인자), localStorage 접근 금지, 예외 throw 로 흐름 제어 금지, `toISOString()` 으로 오늘 날짜 만들기 금지.
  Closes: GAP-1
  Recommended task executor category: `ultrabrain`
  Parallelization: Wave 1 | Blocked by: - | Blocks: T5, T6, T7
  References: `src/progress.ts:1-20`(저장 철학), `src/marks.tsx:1-20`(3단계 표시), `src/pages/Checklist.tsx:38`(**UTC `toISOString` 선례 — 따라하지 말 것**), `DESIGN.md`(용어 톤).
  Acceptance criteria: **`bun run test`**(= `TZ=Asia/Seoul bun test`) 로 실행했을 때 `src/srs.test.ts` 통과. 최소 14케이스: 신규→첫 만기 / `x` 3연속 수렴 / **ease 2.0 인 ivl=120 카드에 `x` 후 같은 날 `o` → ivl ≤ 3**(ease 를 2.8 로 잡으면 `x`로 2.6 이 되고 다음 `o` 가 +3칸이라 7 이 되므로, 이 케이스의 픽스처 ease 는 반드시 2.0 으로 고정) / `o` 6회 후 ivl>=60 / ease 하한·상한 클램프 / **ease 가 정확히 `1.50`·`2.30` 인 경계(반올림 후 판정이 흔들리지 않음)** / 같은 입력 반복 = 같은 출력 / 월말·연말 경계 / `e` 연속 상한 / 잘못된 날짜 문자열 명시적 에러 / **로컬 08:59 와 09:01 은 같은 날짜이고, `toISOString()` 은 서로 다른 날짜를 낸다(뒤집힌 기대값 금지)** / **로컬 23:59 와 00:01 은 서로 다른 날짜** / ease 보정 경계(2.29 vs 2.31, 1.49 vs 1.51) / 사다리 밖 `ivl`(예: 5) 정규화. 시간대 의존성은 T3 의 `"test": "TZ=Asia/Seoul bun test"` 가 고정하므로 테스트 파일은 `process.env.TZ` 를 건드리지 않고, 시각은 `new Date(y,m,d,h,min)` 로 **로컬** 생성한다.
  QA scenarios: happy — `bun -e` 로 신규 카드에 `o` 3회 채점해 만기일이 단조 증가함을 출력. failure — `review(state,"o","2026-13-40")` throw 확인. Evidence `.omo/evidence/task-1-yakugaku-review-engine.txt`
  Commit: Y | `feat(srs): deterministic local-day scheduler core with injectable clock`

- [x] 2. 카드 신원·채점 브리지 모듈
  What to do: `src/srs-card.ts` 에 (a) `cardId(set, deckId, question)` — 기존 `src/pages/Chem.tsx:336` 의 `card:${set}:${id}:${q}` 와 **바이트 동일**. (b) `srsKey(id) = "srs:" + id`, `markKey` 는 기존 `src/marks.tsx:19` 재사용. (c) `gradeToMark(grade): "o"|"t"|"x"`(`e`→`o`). (d) `dayKey(date) = "srs:log:" + date`, `newKey(date) = "srs:meta:new:" + date`. (e) **직렬화·검증 규칙(필수):** `progress.ts:11` 의 `Value = number | boolean | string` 이므로 `SrsState` 객체를 그대로 넣을 수 없다. `srs:<id>` 는 **`JSON.stringify(state)` 한 문자열**로 저장한다. `readSrs(id): SrsState | null` 은 (1) `JSON.parse` 를 try/catch 로 감싸고 (2) **파싱 결과의 모양을 검사**해 `typeof due === "string" && typeof ivl === "number" && typeof ease === "number" && typeof reps === "number" && typeof lapses === "number" && typeof last === "string" && (m === "o" || m === "t" || m === "x")` 를 모두 만족하지 않으면 `null` 을 반환한다(정상 JSON 이지만 모양이 틀린 값도 거른다). `writeSrs` 도 같은 모듈에 두고 모든 호출자를 이 헬퍼로만 통일한다. (f) `applyGrade(id, grade, todayISO)` — **한 번의 `setMany` 로** `srs:<id>` 상태(`m` 을 `gradeToMark(grade)` 로 설정), `mark:<id>`, `srs:log:<date>`(+1), 그리고 **이 카드가 진짜 신규일 때만 `srs:meta:new:<date>`(+1)** 를 쓴다. "진짜 신규"의 정의: **직전 `srs:` 상태가 없고 `mark:<id>` 도 `"o"|"t"|"x"` 중 어느 것도 아닐 때**(표시가 한 번도 없던 카드). 이는 T4 `seedFromMark(...) === null` 과 **정확히 같은 조건**이지만 `src/srs-seed.ts` 를 import 하지 않고 `mark:` 만 읽어 판정한다(T2 가 Wave 1, T4 가 Wave 2 라 순방향 의존을 만들지 않기 위함). 즉 **기존 ○△× 표시가 있는 카드의 첫 채점은 신규 쿼터를 소모하지 않는다.** 신규 카드 소진은 이 증가로만 기록되고, 큐 빌더는 현재 카운트를 읽기만 한다. (g) `SRS_SOURCES = ["jitan/decks.json","yoten/decks.json","chem/decks.json"]` 상수.
  **Must NOT do:** id 규칙 변경, 기존 키 삭제, `mark:`/`srs:`/`srs:log:` 중 일부만 갱신하는 경로 금지, 표시가 없는 카드가 아닌데 `srs:meta:new:` 증가.
  **주의(테스트 함정):** `setMany` 는 `next[k] === v` 이면 그 키를 건너뜀(`src/progress.ts:158-160`). 그래서 "네 키가 동시에 갱신" 테스트는 **변경이 실제로 발생하는 픽스처**(기존 mark 와 다른 등급)로 써야 하고, `srs:log` 카운터는 값이 같아도 무조건 새 값이 되므로 항상 갱신된다.
  Closes: GAP-1, GAP-4
  Recommended task executor category: `quick`
  Parallelization: Wave 1 | Blocked by: - | Blocks: T5, T7, T9
  References: `src/pages/Chem.tsx:331-345`, `src/marks.tsx:19-35`, `src/progress.ts:150-176`(`setProgress`/`setMany`), `src/data/remote.ts:53`(Deck 타입).
  Acceptance criteria: `bun run test` 로 `src/srs-card.test.ts` 통과 — 픽스처 3개의 id 문자열이 기존 규칙과 동일, (등급이 실제로 바뀌는 픽스처에서) `applyGrade` 1회로 `srs:`·`mark:`·`srs:log:` 가 동시에 갱신되고 신규 카드만 `srs:meta:new:` 가 +1, **기존 ○△× 표시가 있는 카드를 처음 채점해도 `srs:meta:new:` 는 증가하지 않음**, `srs:` 값이 `JSON.parse` 로 원형 복원되고 **올바른 JSON 이지만 모양이 틀린 값(`"5"`, `{}`, `due` 없는 객체)도 `readSrs` 가 `null`**, 깨진 JSON 도 `null`, 세 소스 전 카드의 키 길이 400자 이하(실측 최대 235자 — jitan/yoten/chem 전수), `srs:` 값 길이 20,000자 이하(`backend/src/index.ts:28` `MAX_VAL`).
  QA scenarios: happy — 세 소스(jitan/yoten/chem) 959장 id 생성 후 키 길이 400자 이하 전수 확인. failure — 알 수 없는 grade 가 tsc 에서 막히는지 `bun run build` 로 확인. Evidence `.omo/evidence/task-2-yakugaku-review-engine.txt`
  Commit: Y | `feat(srs): shared card identity, grade bridge, and per-day activity log`

- [x] 3. Bun 테스트 인프라 + localStorage shim
  What to do: `package.json` 에 **`"test": "TZ=Asia/Seoul bun test"`**(날짜 경계 테스트를 머신 시간대와 무관하게 만든다 — macOS·리눅스 모두 `TZ` 환경변수를 존중하고, `bun run test` 는 셸을 거쳐 적용되는 것을 실측 확인했다), devDependency `@types/bun`. `tsconfig.json` `"types": []` → `["bun"]`. **`bunfig.toml`** 신규: `[test] preload = ["./src/test-setup.ts"]`. `src/test-setup.ts` 는 (1) `globalThis.localStorage` 가 없으면 Map 기반 인메모리 구현(`getItem/setItem/removeItem/clear/key/length`)을 설치하고, (2) **`Intl.DateTimeFormat().resolvedOptions().timeZone` 이 `Asia/Seoul` 인지 검사해 아니면 1회 경고를 찍는다**(`bun run test` 사용을 잊고 `bun test` 를 직접 돌렸을 때 침몰하지 않도록; 하드 실패는하지 않는다). `window` 는 `src/progress.ts:87` 이 `typeof window !== "undefined"` 로 이미 가드하므로 shim 불필요. `bun.lock` 갱신분도 함께 커밋.
  **Must NOT do:** vitest/jest 추가, tsconfig `exclude` 로 테스트 숨기기, CI 워크플로 변경, `progress.ts` 를 테스트용으로 리팩터링(이번 범위 아님), 테스트 파일 안에서 `process.env.TZ` 를 바꾸기(프로세스 전역이고 첫 `Date` 사용 이후에는 늦다).
  Closes: GAP-1
  Recommended task executor category: `quick`
  Parallelization: Wave 1 | Blocked by: - | Blocks: T1, T2, T5, T6 테스트 실행
  References: `package.json:1-30`, `tsconfig.json:1-27`, `src/progress.ts:66,93`(모듈 로드 시 localStorage 접근 지점), `.github/workflows/pages.yml`(build 만 수행).
  Acceptance criteria: `bun install` 후 **`bun run test`** 가 0 fail, `bun run build` exit 0 유지, **`src/progress.ts` 를 import 하는 테스트가 통과**(shim 이 실제로 동작한다는 증거), `bun run test` 안에서 로컬 날짜 경계 케이스가 실제로 실행됨(출력에 테스트 수 포함).
  QA scenarios: happy — `bun run test` 출력에 테스트 수·0 fail. failure — 일부러 실패 테스트를 넣어 non-zero 확인 후 즉시 제거. Evidence `.omo/evidence/task-3-yakugaku-review-engine.txt`
  Commit: Y | `chore(test): bun test wiring with in-memory localStorage preload`

- [x] 4. 기존 ○△× 표시 시딩 규칙
  What to do: `src/srs-seed.ts` — `seedFromMark(mark: "o"|"t"|"x"|undefined, markTimestamp: number|undefined, todayISO): SrsState | null`. `x` → `due=today`, `ivl=0`; `t` → `due=today`, `ivl=1`; `o` → `due = markTimestamp + 7일`(시각 정보 없으면 0 → 즉시 만기), `ivl=7`. **초기 ease 는 T1 과 동일하게 `2.0`, 그리고 반환하는 상태의 `m` 은 반드시 그 `mark` 값이다**(`m: mark`). 이를 빼먹으면 시딩된 카드는 매 빌드마다 `m` 불일치로 다시 시딩되어 `/review` 진행이 저장되지 않는다. 표시가 없으면 `null`(신규 카드 = `init()`).
  **드리프트 해소 규칙(핵심):** `srs:` 가 없으면 시딩한다. `srs:` 가 **있어도** `state.m !== 현재 mark 값` 이면 덱 화면에서 나중에 표시를 바꿈 것이므로 그 표시를 우선해 재시딩한다. `state.m === mark` 이면 `/review` 가 마지막으로 쓴 상태가 최신이므로 그대로 둔다. mark 가 `undefined` 인데 `srs:` 가 있으면(사용자가 표시를 지움) 그 카드는 신규로 되돌린다. 이로써 `src/marks.tsx` 의 기존 쓰기 경로를 **한 줄도 고치지 않고** 두 체계가 어긋나지 않는다. 시딩은 순수 계산이며 `srs:` 키를 즉시 쓰지 않는다(첫 채점 시 `applyGrade` 가 쓴다).
  **Must NOT do:** `mark:` 값을 쓰거나 지우기, 일괄 마이그레이션 스크립트로 959개 키를 미리 생성하기(첫 채점 시점에 lazy 생성), `MarkStudy` 컴포넌트 수정.
  Closes: GAP-4
  Recommended task executor category: `unspecified-high`
  Parallelization: Wave 2 | Blocked by: T1, T2 | Blocks: T5, T9
  References: `src/progress.ts:60-75`(meta 시각은 **`itemsFor([k])[0]?.t`** 로 읽는다 — `loadMeta` 는 private), `src/marks.tsx:19-40`, `src/pages/Chem.tsx:336`.
  Acceptance criteria: `bun run test` 로 `src/srs-seed.test.ts` 통과 — x/t/o/없음 4분기, 시각 0 처리, **시딩 결과의 `m` 이 입력 mark 와 일치**, **`state.m` 과 현재 mark 가 같으면 유지·다르면 재시딩**, mark 가 지워지면 신규로 복귀, **오늘 만기 수 = `x` 개수 + `t` 개수 + `o` 중 (mark 시각 + 7일 ≤ 오늘) 개수** (오래된 ○ 표시도 밀린 것으로 잡힌다), 959장 전수 시딩 후 위 공식과 카운트가 일치.
  QA scenarios: happy — 실제 데이터로 시딩 후 오늘 큐 크기 출력. failure — `mark:` 값이 깨진 문자열일 때 null 로 안전 처리. Evidence `.omo/evidence/task-4-yakugaku-review-engine.txt`
  Commit: Y | `feat(srs): seed schedule from existing mark history without migration`

- [x] 5. 오늘 큐 빌더와 백로그 집계
  What to do: `src/review-queue.ts` — 순수 함수 `buildQueue({today, decks, states, marks, lectures, newPerDay=15, softCap=120, deckFilter?}) -> { due: QueueItem[]; fresh: QueueItem[]; backlogByDeck; counts }`. **`buildQueue` 는 I/O 를 하지 않는다** — 덱 데이터는 호출자가 넘긴다(`loadData` 는 UI 레이어에서 호출; bun 테스트에서 `import.meta.env.BASE_URL` 이 `undefined` 라 `loadData` 를 직접 부르면 URL 이 깨지고, 픽스처 없이 fetch 에 의존하게 된다). **소스는 `SRS_SOURCES` 3개 파일만**(`jitan/decks.json` 461, `yoten/decks.json` 415, `chem/decks.json` 83 = 959장). `yoten/yogo.json`(762장)과 `trig/decks.json`(100장)은 **대상 아님**. 정렬: 만기 오래된 순 → 덱 id → 카드 id(결정론적). 신규는 `newPerDay` 상한. **큐 빌더는 쓰기 경로가 아니다 — `srs:meta:new:<date>` 를 읽기만 한다**(쓰기는 T2 `applyGrade` 단일 경로). 오늘 이미 시작한 신규 수 = 저장된 값이므로 **남은 신규 수 = `max(0, newPerDay - 저장값)`** 만 지급(5장 시작 후 재방문 = 10장; 음수 슬라이스 금지). 덱 필터는 `?deck=<set>:<id>` (예: `jitan:jt1`) — `MarkStudy` 의 덱 문자열과 동일. 강의 항목(`eju:review:<idx>`)은 `kind:"lecture"` 로 뒤쪽.
  **Must NOT do:** 무작위 셔플 금지(재현성), 집계값을 별도 키로 저장 금지(`srs:log:<date>`·`srs:meta:new:<date>` 만 허용), 3개 파일 외 덱 포함 금지.
  Closes: GAP-2, GAP-3, GAP-5
  Recommended task executor category: `ultrabrain`
  Parallelization: Wave 2 | Blocked by: T1, T2, T4 | Blocks: T7, T8, T9, T10
  References: `src/data/remote.ts:1-60`(`loadData`/`useData`), `src/marks.tsx:108-140`, `src/pages/Checklist.tsx:111-148`, `src/pages/Yoten.tsx:124`(yogo — 제외 대상), `src/pages/Extra.tsx:316`(trig — 제외 대상), `src/progress.ts:225-265`.
  Acceptance criteria: `bun run test` 로 `src/review-queue.test.ts` 통과 — 만기 정렬 안정성, 신규 15장 상한, 5장 시작 후 재방문 = 10장, **저장값이 80(기존 ○△× 카드 80장 채점)일 때 남은 신규 = 0이고 음수로 넘어가지 않음 + 그날 진짜 신규가 다시 15장 생기지 않음**, 959장 전량 만기 시 softCap 120 + 나머지 backlog, `?deck=jitan:jt1` 필터가 20장만 반환, yogo/trig 덱 미포함, 강의 항목 포함/제외. 테스트는 959장 픽스처를 파일에서 읽어 넣는다(fetch 없음).
  QA scenarios: happy — 가짜 저장소로 959장 만기 상태 counts 출력. failure — `srs:` 값이 `"{"` 인 깨진 JSON 에서 예외 없이 신규 취급. Evidence `.omo/evidence/task-5-yakugaku-review-engine.txt`
  Commit: Y | `feat(review): deterministic daily queue with seeding, caps, and deck filter`

- [x] 6. 복습 세션 상태 머신
  What to do: `src/review-session.ts` — `idx`, `shown`, `tally`, `undoStack`, `reveal()`, `grade(g)`, `undo()`, `capReached()`, `resume()`, `summary()`. 되돌리기는 최소 1건, **`applyGrade` 가 건드린 네 키(`srs:`, `mark:`, `srs:log:`, 해당 시 `srs:meta:new:`)를 전부** 채점 직전 값으로 복원한다(신규 카드였다면 `srs:meta:new:` 가 감소해 쿼터가 돌아와야 한다). **세션 진행 상태는 `localStorage` 의 `yk-review-session` 에 저장하고 동기화 저장소에는 넣지 않는다**(두 기기가 같은 날 서로 덮어쓰는 것을 막고, 하루치 세션 키가 무한히 쌓이는 것도 막는다).
  **Must NOT do:** 되돌리기에서 다른 카드 상태 변경, 세션 키를 `progress.ts` 저장소에 넣기, 서버 전용 상태 만들기.
  Closes: GAP-1
  Recommended task executor category: `unspecified-high`
  Parallelization: Wave 2 | Blocked by: T1, T2 | Blocks: T7
  References: `src/progress.ts:187-205`(backup/restore 패턴), `src/marks.tsx:108-140`, `src/sync.ts:1-20`(동기화 대상은 progress 저장소뿐), `src/srs-card.ts`(T2 `applyGrade`).
  Acceptance criteria: `bun run test` 로 `src/review-session.test.ts` 통과 — 채점 N회 후 undo N회로 초기 상태 복원(네 키 모두, **진짜 신규 카드**의 쿼터 포함), 새로고침 복원 후 같은 카드부터, cap 도달 종료 플래그, 요약 수치 합 = 전체, `srs:log` 가 undo 로 감소.
  QA scenarios: happy — 5장 세션 o,o,x,t,e 후 undo 2회 → 3장 상태. failure — 세션 JSON 손상 시 새 세션으로 안전 시작. Evidence `.omo/evidence/task-6-yakugaku-review-engine.txt`
  Commit: Y | `feat(review): resumable local-only session state machine with undo`

- [x] 7. `/review` 복습 실행 화면
  What to do: `src/pages/Review.tsx` — 상단 진행(남은 수/오늘 총계), 카드 앞면 → `보기` → 뒷면 → 채점 4버튼, 키보드 1~4·Space=보기, 되돌리기, 종료 요약(분포 + 다음 만기 3장), 새로고침 이어하기. 라우트 `/review` 추가. 로딩/에러 상태는 기존 `Loading` 패턴 준수.
  **Must NOT do:** 기존 `MarkStudy` 변경, 모달 남용, 이모지 사용, `toISOString()` 으로 오늘 날짜 계산.
  Closes: GAP-1
  Recommended task executor category: `visual-engineering`
  Parallelization: Wave 3 | Blocked by: T5, T6, T2 | Blocks: T11
  References: `src/pages/Chem.tsx:331-373`, `src/marks.tsx:153-230`, `src/components/ui.tsx`, `DESIGN.md` §5·§6.
  Acceptance criteria: `bun run build` exit 0; **임시 금고 dev 서버**에서 20장 세션 완주, 채점이 덱 화면 ○△× 와 일치.
  QA scenarios: happy — aside 로 `/review` 20장 채점 후 요약 확인 + 새로고침 이어하기. failure — 큐 0장일 때 "오늘 복습할 카드가 없어요" + 다음 만기 안내. Evidence `.omo/evidence/task-7-yakugaku-review-engine.png`
  Commit: Y | `feat(review): /review session runner with keyboard grading and undo`

- [x] 8. 복습 대시보드
  What to do: `src/pages/ReviewHome.tsx` — 오늘 만기/신규/밀린 합계, 연속 학습일(`srs:log:<date>` 가 1 이상인 연속 일수, 오늘 아직 없으면 어제까지로 계산), 최근 14일 스트립(`srs:log` 값), 덱별 밀린 수 표 + 행별 진입 링크(`?deck=<set>:<id>`). **`srs:log` 는 절대 정리하지 않는다** — 연속일이 하루 1키(연 365키, 약 4KB)라 보관 비용이 무의미하고, 60일만 남기면 60일 연속 학습자의 연속일이 60에서 끊긴다. 정리 대상은 **`srs:meta:new:` 중 60일 초과분만**(오늘 쿼터 계산에만 쓰이므로). 정리는 `useEffect` 에서 마운트당 1회만 실행한다(렌더 중 쓰기 금지).
  **이중 카운터의 한계(문서화):** `srs:log`·`srs:meta:new` 는 마지막 쓰기 승리(last-write-wins)로 병합되므로, 두 기기가 같은 날 동기화 전에 각자 채점하면 한쪽 수가 유실될 수 있다. 연속일(≥1)은 살아남고 14일 막대는 과소집계될 수 있다. 이를 막으려고 데이터 구조를 복잡하게 만들지 않고, T12 문서에 알려진 한계로 적는다.
  **Must NOT do:** 별도 집계 키 추가(`srs:log`·`srs:meta:new` 외), `srs:log` 삭제·tombstone, 기록 없는 날을 사용자 탓처럼 표시, 그래프 라이브러리 추가.
  Closes: GAP-2, GAP-5
  Recommended task executor category: `visual-engineering`
  Parallelization: Wave 3 | Blocked by: T5 | Blocks: T11
  References: `src/pages/Home.tsx:1-60`, `DESIGN.md` §2·§4, `src/marks.tsx:1-20`.
  Acceptance criteria: `bun run build` exit 0; 덱별 합계 = 전체 만기 수; 14일 스트립 값 = `srs:log` 실측값.
  QA scenarios: happy — 3개 덱에 걸쳐 채점 후 표 합계 일치. failure — 기록 0인 신규 방문에서 0/0/0 + 안내만 표시. Evidence `.omo/evidence/task-8-yakugaku-review-engine.png`
  Commit: Y | `feat(review): dashboard with streak, 14-day activity, and per-deck backlog`

- [x] 9. 덱 화면에 만기 배지와 진입점
  What to do: `ChemDeck`(`src/pages/Chem.tsx:331`)에 `SRS_SOURCES` 포함 여부 prop 을 두고, 포함될 때만 "오늘 이 덱: N장" 배지 + `오늘 복습` 버튼(`/review?deck=<set>:<id>`). 덱 목록 카드에도 만기 수. **`yoten/yogo.json`·`trig/decks.json` 덱에는 배지를 렌더하지 않는다.** `src/pages/Yoten.tsx:16` 의 `DeckLinks` 는 요텐 목록(`/yoten/d`)과 요고 목록(`/yoten/v`, 98·100행)을 **한 컴포넌트로 둘 다** 그리므로, 만기 수는 prop 으로 받은 소스 기준으로 계산하고 이과용어 목록에는 0장/미표시로 넘긴다.
  **Must NOT do:** 기존 회차 복습 버튼 제거·동작 변경, 덱 레이아웃 재설계, 범위 외 덱에 0장 배지 노출.
  Closes: GAP-2
  Recommended task executor category: `quick`
  Parallelization: Wave 3 | Blocked by: T2, T5, T4 | Blocks: T11
  References: `src/pages/Chem.tsx:300-373`, `src/pages/Yoten.tsx:16,98-128`(`DeckLinks` 가 요텐·요고 목록을 함께 그린다), `src/pages/Extra.tsx:316`.
  Acceptance criteria: `bun run build` exit 0; 3개 소스 덱에서 배지 수 = 해당 덱 만기 카드 수; yogo/trig 페이지에 배지 없음.
  QA scenarios: happy — 특정 덱 `오늘 복습` → 그 덱 카드만. failure — 만기 0장 덱은 버튼 비활성 + "오늘은 없음", yogo 페이지 배지 부재. Evidence `.omo/evidence/task-9-yakugaku-review-engine.png`
  Commit: Y | `feat(review): per-deck due badges scoped to SRS source decks`

- [x] 10. 인강·개념 노트를 같은 큐로
  What to do: `reviewKey` 를 `src/pages/Checklist.tsx:111` 에서 `src/pages/Eju.tsx` 로 **export 이동**(현재 `Eju.tsx` 는 `watchedKey`/`readKey` 만 export). 체크표 "복습 필요" 항목을 `/review` 큐의 `kind:"lecture"` 로 노출하고, 큐에서 처리하면 기존 키(`eju:review:<idx>`)를 그대로 해제. 개념 노트 하단에 관련 덱 링크 1개 + "이 노트 복습 표시"(`note:review:<id>` 신규 키).
  **Must NOT do:** 체크표 UI 재작성, 마크다운 파서 변경, `eju:review` 키 이름 변경.
  Closes: GAP-3
  Recommended task executor category: `unspecified-high`
  Parallelization: Wave 3 | Blocked by: T5 | Blocks: T11
  References: `src/pages/Checklist.tsx:100-170`, `src/pages/Eju.tsx:23-24`, `src/pages/Notes.tsx:1-60`, `public/data/notes/index.json`.
  Acceptance criteria: `bun run build` exit 0; 복습 필요 3건 → `/review` 에 3건, 처리 후 체크표 해제.
  QA scenarios: happy — 2건 표시 → 큐 확인 → 처리 → 반영. failure — 노트 본문 로드 실패 시 링크 영역만 숨김. Evidence `.omo/evidence/task-10-yakugaku-review-engine.png`
  Commit: Y | `feat(review): fold lecture review flags and notes into the daily queue`

- [x] 11. 내비게이션·홈 진입점·모바일/a11y 정리
  What to do: `src/App.tsx` NAV·Routes 에 `복습` 추가, `src/pages/Home.tsx` 최상단에 "오늘 복습 N장" 카드(0장이면 가장 가까운 만기 안내). 390px 1열, 터치 타깃 40px, `aria-live` 요약, 포커스 링, `prefers-reduced-motion` 유지.
  **Must NOT do:** 홈 전체 재배치, 기존 카드 축소, 새 색 토큰.
  Closes: GAP-2
  Recommended task executor category: `visual-engineering`
  Parallelization: Wave 4 | Blocked by: T7, T8, T9, T10 | Blocks: T12, T13
  References: `src/App.tsx:25-45`, `src/App.tsx:149-180`, `src/pages/Home.tsx:1-60`, `DESIGN.md` §4·§8.
  Acceptance criteria: `bun run build` exit 0; 390px·1440px 스크린샷 가로 스크롤 0.
  QA scenarios: happy — 모바일 폭 홈→복습→채점→복귀 스크린샷. failure — 키보드만으로 Tab/Enter/Space/1~4 완주. Evidence `.omo/evidence/task-11-yakugaku-review-engine.png`
  Commit: Y | `feat(review): nav, home entry point, and mobile/a11y pass`

- [x] 12. 문서 갱신
  What to do: `DESIGN.md` 에 "Review loop" 절(용어, 4단계, 색·상태 규칙, 세션 레이아웃), `README.md` 에 복습 사용법 + 저장 키 표(`srs:`, `srs:log:`, `srs:meta:new:`, `yk-review-session`(로컬 전용), `note:review:`), **`bun run test`** 실행법(= `TZ=Asia/Seoul bun test`), **QA 시 `VITE_SYNC_CODE` 로 임시 금고를 쓰는 절차**, 그리고 **알려진 한계 절** — (1) `srs:log`/`srs:meta:new` 는 last-write-wins 라 두 기기가 동기화 전에 같은 날 채점하면 한쪽 수가 유실된다, (2) `/review` 채점은 `review:<덱>` 회차 풀(`src/marks.tsx:110`)을 갱신하지 않으므로 회차 복습 풀과는 별개로 동작한다.
  **Must NOT do:** 기존 문체·구조 훼손, 문서에 없는 키를 코드에 남기기.
  Closes: GAP-4, GAP-5
  Recommended task executor category: `writing`
  Parallelization: Wave 4 | Blocked by: T11 | Blocks: T13
  References: `DESIGN.md` §1-§8, `README.md`, `backend/README.md`.
  Acceptance criteria: 문서 키 목록 = `grep -rn "srs:\|srs:log:\|yk-review-session\|note:review:" src` 결과와 정확히 일치, `bun run test` 로 적힌 명령이 실제로 통과한다.
  QA scenarios: happy — grep 대조 통과. failure — 코드에만 있는 키가 있으면 실패. Evidence `.omo/evidence/task-12-yakugaku-review-engine.txt`
  Commit: Y | `docs: review loop, stored keys, test setup, and isolated QA procedure`

- [x] 13. 임시 금고 동기화 왕복 실증
  What to do: **QA는 실제 금고를 건드릴 수 있는 경로가 네 개다** — 같은 오리진의 잔존 localStorage, `switch-shared` 자동 전환, `preview` 빌드에 박히는 공용 코드, 그리고 `attach()` 가 `allKeys()` 전체를 올리는 동작. 아래 순서를 지킨다.
  **(1) 임시 금고 발급** — `curl -X POST https://yakugaku-sync.naidis.dev/v1/vault` → `201 {code}`. `backend/src/index.ts:133-138` 이 `INSERT INTO vaults` 로 코드를 발급하고, `auth()`(`:71-79`)는 금고 행이 없는 코드를 401 로 거절하며, `validItems`(`:90-96`)는 **요청당** 1,000개 상한이다(금고 전체 상한 아님). **입의로 만든 32자를 쓰면 401 이고, 그때 환경변수를 지우는 식으로 "고치면" T13 이 블로커가 된다.**
  **(2) 사전 스냅샷(사용자 판단용 증거)** — QA 전에 실제 금고를 **리포 밖 파일**로 떠 둔다: `curl -s -X POST .../v1/sync -H "Authorization: Bearer <SHARED_CODE>" -d '{"since":0,"items":[]}' > /tmp/yk-real-vault-before.json`. `items` 가 빈 배열이면 `sync()` 의 `if (items.length)` 를 타지 않아 `seq` 가 오르지 않는다(서버 코드 확인). 여기서 `mark:` 키도 함께 떠야 사용자가 어느 키가 문제인지 직접 판단할 수 있다.
  **(3) 오리진 분리** — QA 서버는 **`127.0.0.1:5173`** 으로 띄운다(`localhost:5173` 과 **localStorage 오리진이 다르다** — `backend/src/index.ts:18-21` 은 둘 다 허용하므로 QA 는 `127.0.0.1` 만 쓴다). `VITE_SYNC_CODE=<임시코드> VITE_SYNC_URL=https://yakugaku-sync.naidis.dev bun run dev -- --host 127.0.0.1`. **`bun run preview` 금지**(빌드에 `SHARED_CODE` 가 박혀 `:4173` 에서 실제 금고로 붙는다).
  **(4) aside 프로필 2개**로 `http://127.0.0.1:5173/review` 접속 → A 10장 채점 → B 새로고침 후 만기·연속일·덱 배지 동일 확인 → B 5장 채점 → A 반영 확인.
  **(5) 실제 금고 무오염 확인** — (2)와 **같은 명령**으로 다시 떠서 `mark:`·`srs:`·`srs:log:`·`srs:meta:new:` 를 (2) 의 파일과 diff 한다. `srs:` 계열만이 아니라 **`mark:` 도 반드시 본다**(`Eju` 채점은 `mark:` 를 쓰고, `srs:` 가 없어도 오염된다).
  **(6) 정리** — `127.0.0.1:5173` 오리진의 localStorage 를 비우고(`aside` 에서 스토리지 클리어), dev 서버 종료, 임시 금고의 `srs:` 키에 tombstone 을 보내 비운다. **dev 서버를 살려 둔 채 다른 작업을 이어가지 않는다.**
  **Must NOT do:** 기본 공용 코드로 QA, 실제 사용자 기록 삭제·백업 덮어쓰기, `SHARED_CODE` 상수 변경, **QA 후 그 오리진의 스토리지를 남겨 두기**, `preview` 로 QA.
  Closes: GAP-4
  Recommended task executor category: `unspecified-high`
  Parallelization: Wave 4 | Blocked by: T11 | Blocks: -
  References: `src/sync.ts:9,101-113,137-156`(공용 자동 연결·`attach` 전체 업로드·`switch-shared`), `backend/src/index.ts:18-30,52-96,133-138`, `backend/README.md`.
  Acceptance criteria: 발급된 임시 금고로 두 프로필의 `srs:` 항목 수·만기 합계 일치, **(2) 대비 (5) 의 `mark:`·`srs:`·`srs:log:`·`srs:meta:new:` diff 0건**, 사전 백업 파일이 리포 밖에 존재, 서버 200 로그. **diff 가 0이 아니면 되돌리지 않고 중단한다** — 실제 금고는 모든 기기가 항상 붙는 살아있는 금고라서, QA 중의 `mark:` 변경은 학생이 폰으로 공부한 것일 가능성이 더 높다. 서버는 `WHERE excluded.t > items.t` 로만 쓰이므로 되돌리려면 옛 값을 "지금"으로 다시 찍어야 하고, 그러면 모든 기기의 진짜 진도가 덮인다. 중단 후 다른 키와 그 `t` 값을 증거 파일에 적고 사용자에게 보고하며, 오염 여부는 사용자가 판단한다.
  QA scenarios: happy — 왕복 스크린샷 2장 + 네트워크 로그. failure — 오프라인 채점 후 재연결 시 `yk-sync-pending` 비워지고 서버 반영. Evidence `.omo/evidence/task-13-yakugaku-review-engine.md`
  Commit: N | (검증 전용)

- [ ] 14. 시딩 상태를 첫 채점이 실제로 소비하도록 수정 (IS-5)
  What to do: F4 검토에서 `applyGrade` 가 `readSrs(id) ?? init(today)` 로 시작해 T4 가 계산한 시딩 상태를 버리는 것을 확인했다. `resolveDrift(current, mark, markTimestamp, today)` 를 `applyGrade` 안에서도 사용해, `srs:` 가 아직 없는 기존 ○ 카드는 시딩된 `ivl=7` 에서 전진하고, `state.m !== 当前 mark` 인 드리프트도 재시딩 후 채점한다. mark 시각은 `itemsFor([markKey(id)])[0]?.t` 로 읽는다.
  Closes: IS-5
  Acceptance criteria: ○ 카드 첫 `o` 채점 후 `ivl` 이 7 다음 칸, 방금 ×로 바꾼 카드의 `o` 채점이 7칸을 넘지 않음. 테스트 2건 추가.
- [ ] 15. 큐에 mark 시각을 전달해 오래된 ○ 카드를 밀린 것으로 집계 (IS-5)
  What to do: `buildQueue` 가 `resolveDrift(current, mark, undefined, today)` 로 시각을 버려 모든 기존 ○ 카드가 오늘 만기가 되던 문제. T4 규칙(`o` → mark 시각 + 7일, 시각 없으면 오늘)대로 시각을 넘긴다. `buildQueue` 는 순수 함수로 유지한다.
  Closes: IS-5
  Acceptance criteria: 30일 전 ○ 표시 카드가 backlog 로 잡히고, 시각 없는 ○ 는 오늘 만기.
- [ ] 16. 덱별 표를 전체 만기 수로 집계 (IS-3)
  What to do: `backlogByDeck` 이 softCap 초과분만 담아 100장 만기일 때 표 합계가 0이 되던 문제. `buildQueue` 에 `dueByDeck`(모든 만기 카드의 덱별 합계)을 추가하고 대시보드 표를 그것으로 그린다. `backlogByDeck` 은 세션 상한용으로 유지한다.
  Closes: IS-3
  Acceptance criteria: 만기 100장/softCap 120 → `dueByDeck` 합계 100·3개 덱, `backlogByDeck` 비어 있음. 만기 200장 → `dueByDeck` 합계 200.
- [ ] 17. 인강·노트 복습 항목을 실제 큐와 세션에 연결 (IS-4)
  What to do: F4 검토에서 `buildLectureItems` 에 호출자가 하나도 없고, `Review.tsx` 가 `queue.lectures` 를 버리는 것을 확인했다. IS-4("복습 필요로 표시한 항목과 오늘 만기된 카드가 같은 하루 큐에 함께 뜬다")가 전혀 이행되지 않은 상태였다. UI 레이어에서 강의·노트 데이터를 읽어 `buildQueue` 에 넘기고, 세션에서 강의 항목을 렌더하며, 채점하면 `eju:review:`·`note:review:` 플래그를 해제한다.
  Closes: IS-4
  Acceptance criteria: 복습 필요 2건이 세션에 뜨고, 채점 후 두 키가 사라지며, 대시보드 남은 수에 포함됨.
- [ ] 18. 홈 카드 1회 클릭 진입·덱 필터 세션 분리·되돌리기 로그 보존 (IS-1, IS-2)
  What to do: (a) 홈 오늘 카드가 대시보드로 가 두 번 눌러야 하던 것을 `/review/session` 직접 링크로. (b) 저장된 세션이 덱 필터를 기억하지 않아 덱 백로그 행을 눌러도 혼합 세션이 열리던 문제 — `SessionState` 에 `deckFilter` 를 저장하고 다르면 새 세션. (c) 되돌리기가 `srs:log:<today>` 를 tombstone 으로 지워 다른 기기 기록을 덮을 수 있던 문제 — 삭제 대신 `0` 을 쓴다(`srs:log` 는 절대 정리하지 않는다는 제약).
  Closes: IS-1, IS-2
  Acceptance criteria: 홈 카드 href = `#/review/session`; 저장 세션 필터 불일치 시 null 반환 테스트; 되돌리기 후 `srs:log:<today>` 키가 존재하고 값 0.

## Final verification wave

> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit
- [ ] F2. Code quality review
- [ ] F3. Real manual QA
- [ ] F4. Ideal-state fidelity


## Commit strategy

- `lane/yakugaku-review-engine` 워크 브랜치에서 작업, 마지막에 fast-forward 병합 제안(사용자 승인 후 푸시).
- 커밋은 todo 단위 1개, Conventional Commits. T3 는 `bun.lock` 포함.
- `public/data/vecc/01.md` 의 기존 미커밋 변경은 건드리지 않고 스테이징에서 제외.
- `bun run build` + `bun run test` 통과 시점에만 커밋.

## Success criteria

> One row per IS row. The plan is complete only when every IS row has a delivering todo and a proving QA scenario; F4 checks the delivered behavior against these rows 1:1, and a shortfall becomes new `- [ ] N.` rows, never a note.

| IS | Delivering todo(s) | Proving QA scenario | Evidence |
| --- | --- | --- | --- |
| IS-1 | T5, T7, T11 | `/review` 20장 완주 + 홈 카드 한 번에 진입 | `.omo/evidence/task-7-yakugaku-review-engine.png`, `task-11-...png` |
| IS-2 | T1, T2, T5, T13 | 채점 만기 결정성 + 두 프로필 동기화 일치 | `.omo/evidence/task-1-...txt`, `task-13-...md` |
| IS-3 | T5, T8, T9 | 덱별 밀린 수 합 = 전체 만기 수 | `.omo/evidence/task-8-...png`, `task-9-...png` |
| IS-4 | T5, T10 | 복습 필요 2건이 큐에 뜨고 처리 후 해제 | `.omo/evidence/task-10-...png` |
| IS-5 | T2, T4, T7, T9, T10, T13 | 기존 표시·회차 복습·체크표 그대로 + 시딩 반영 + 실제 금고 무오염 | `.omo/evidence/task-4-...txt`, `task-13-...md` |
