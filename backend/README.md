# yakugaku-sync (학습 기록 동기화 백엔드)

Cloudflare Worker + D1. 프런트(GitHub Pages)와 배포가 분리되어 있다: main push 는 프런트만 배포하고, 이 Worker 는 여기서 직접 배포한다.

- URL: https://yakugaku-sync.naidis.dev (workers.dev 주소는 일부 망에서 막혀 있어 커스텀 도메인 사용)
- 인증: 계정 없이 "동기화 코드"(32자, 160비트 랜덤). 서버에는 SHA-256 해시만 저장. 코드 없으면 401.
- CORS: https://indosaram.github.io 와 localhost/127.0.0.1 의 5173·4173 만.
- 병합: 항목(key)별 updatedAt 비교, 더 새 값만 반영(last-write-wins). 응답에 없는 키는 클라이언트가 건드리지 않는다.
- 스냅샷: 첫 연결·코드 입력·전체 초기화 직전·수동 백업 때 localStorage 전체(원본 hy.* 포함)를 저장, 금고마다 최근 30개.

```sh
bun run db:init     # 원격 D1 에 schema.sql 적용 (멱등)
bun run dev         # 로컬 (wrangler dev, :8787)
bun run deploy      # 배포
```

API: `POST /v1/vault` → {code} · `GET /v1/ping` · `POST /v1/sync` {since, items:[{k,v,t}]} → {items, cursor} · `POST|GET /v1/snapshots` · `GET /v1/snapshots/:id`
