# yakugaku · 호시약대 영어·화학 공부방

星薬科大学 薬学部(6년제) 一般選抜 B方式을 준비하는 한 사람을 위한 개인 학습 사이트입니다. 예전 `hoshi-eigo`(영어)와 `hapgyeok-yuki`(합격화학)를 하나로 합쳤습니다.

## 들어 있는 것
- **영어** (`/en`): 시험 분석, 6개월 로드맵, 왕기초 문법 27강, B방식 영어 기출 2024~2026 전 문항 해설, 어휘·숙어, 의약 장문
- **영어 교재** (`/books`): 『빈출 영문법·어법 문제 1000』과 영숙어장을 한국어로. 정답·해설은 접어 둠
- **화학** (`/chem`): 『합격화학 연습문제 유기편』 350문항 해설(赤シート), 무기화학 정리 교재, 암기 카드
- **EJU 강의** (`/eju`): 유튜브 「EJU화학/전범위」 75강을 대단원별 한국어 교재로
- **기출 분석** (`/exam`): 호시 화학 2024~2026 9회분 출제 분석. 모든 강의·단원에 필수/권장/패스 태그
- **체크표** (`/check`): 강의·교재 진도 체크

학습 기록은 브라우저 localStorage에만 저장됩니다.

## 개발
```bash
bun install
bun run dev
bun run build   # tsc -b && vite build -> dist/
```
React 19 + Vite + Tailwind CSS 4. 큰 콘텐츠는 `public/data/`의 JSON/MD를 필요할 때 불러옵니다.
GitHub Actions로 Pages에 자동 배포됩니다.

## 복습

카드마다 만기일을 두고, 그날 볼 카드만 모아 보여 줍니다. 대시보드(`#/review`)에서 오늘 만기·새 카드·밀린 양과 연속 학습일을 확인하고, **복습 시작**을 누르면 세션(`#/review/session`)이 열립니다. 세션은 앞면 → `보기` → 뒷면 → 채점 네 버튼 순서이고, 채점하면 다음 카드로 넘어갑니다. `되돌리기`는 마지막 채점을 취소합니다. 끝까지 가면 채점 분포와 다음에 볼 카드가 나옵니다.

키보드로도 됩니다. `Space` 보기, `1`~`4` 채점(모름·어려움·알맞음·쉬움), `u` 또는 `Backspace` 되돌리기. 입력창에 초점이 있으면 키를 받지 않습니다.

새로고침해도 같은 카드부터 이어집니다. 세션 진행 상태는 그 브라우저에만 남고 동기화되지 않습니다. 날짜가 바뀌면 버려집니다.

### 저장 키

동기화되는 값은 `hoshi-eigo-progress-v1` 저장소 안에 항목별로 들어가고, 코드가 같으면 기기끼리 오갑니다. `mark:`는 예전 ○/△/× 표시와 같은 키입니다. `yk-review-session`만 이 저장소 밖의 별도 키이고 서버로 가지 않습니다.

| key | scope | meaning |
| --- | --- | --- |
| `srs:card:<set>:<deck>:<q>` | synced | 카드별 일정 상태 `{due,ivl,ease,reps,lapses,last,m}` (JSON 문자열) |
| `srs:log:<YYYY-MM-DD>` | synced | 그날 채점한 카드 수. 정리하지 않음 |
| `srs:meta:new:<YYYY-MM-DD>` | synced | 그날 처음 꺼낸 새 카드 수. 60일 지나면 정리 |
| `mark:<card-id>` | synced | ○/△/× 표시. 기존 표시 체계와 같은 값 |
| `yk-review-session` | LOCAL ONLY | 진행 중인 세션. 동기화하지 않음 |
| `note:review:<id>` | synced | 복습 표시한 개념 노트 |
| `eju:review:<idx>` | synced | 복습 표시한 강의·체크표 항목 |

### 테스트

```bash
bun run test   # = TZ=Asia/Seoul bun test
```

`bun test`를 직접 부르지 마세요. 스케줄러는 기기 로컬 날짜로 만기일을 비교하므로, UTC로 돌면 하루 경계가 KST 09:00에 뒤집혀 날짜 테스트가 환경마다 갈립니다.

### 임시 금고로 QA

실제 학습 기록을 건드리지 않으려면 별도 동기화 금고를 띄워 확인합니다.

```bash
curl -X POST https://yakugaku-sync.naidis.dev/v1/vault   # 32자 코드 발급
VITE_SYNC_CODE=<code> VITE_SYNC_URL=https://yakugaku-sync.naidis.dev bun run dev -- --host 127.0.0.1
```

`127.0.0.1`과 `localhost`는 서로 다른 localStorage 오리진입니다. 한쪽에서 채점한 기록은 다른 쪽에 보이지 않으니, QA는 `127.0.0.1`로만 열고 끝나면 그 오리진의 스토리지를 지우세요.

`bun run preview`는 QA에 쓰지 마세요. 빌드에 공용 코드가 박혀 있어 `:4173`에서 열면 실제 금고에 붙습니다.

### 알려진 한계

1. `srs:log`와 `srs:meta:new`는 항목 단위 last-write-wins로 병합됩니다. 두 기기가 같은 날 동기화 전에 각자 채점하면 한쪽 숫자가 유실됩니다. 연속일(1 이상)은 살아남지만 14일 막대는 과소집계될 수 있습니다.
2. `/review` 채점은 `MarkStudy`가 쓰는 회차 풀 `review:<deck>`을 갱신하지 않습니다. 회차 복습과 SRS 복습은 별개로 흘러갑니다.

## 주의
비공식 개인 사이트이며 星薬科大学과 무관합니다. 기출·교재 저작권은 각 저작권자에게 있습니다.
