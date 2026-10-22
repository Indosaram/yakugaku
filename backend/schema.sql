-- yakugaku 학습 기록 동기화 (Cloudflare D1)
-- vault: 동기화 코드 하나 = 금고 하나. 코드는 저장하지 않고 SHA-256 해시만 둔다.
-- seq: 금고별 단조 증가 카운터. 기기는 마지막으로 받은 seq 이후 바뀐 항목만 받아 간다.
CREATE TABLE IF NOT EXISTS vaults (
  id TEXT PRIMARY KEY,
  created_at INTEGER NOT NULL,
  seq INTEGER NOT NULL DEFAULT 0
);

-- 항목별 마지막 값. v 는 JSON 문자열, NULL 이면 삭제 표시(tombstone).
-- t: 클라이언트가 바꾼 시각(ms). 더 큰 t 만 이긴다(last-write-wins per key).
CREATE TABLE IF NOT EXISTS items (
  vault TEXT NOT NULL,
  k TEXT NOT NULL,
  v TEXT,
  t INTEGER NOT NULL,
  seq INTEGER NOT NULL,
  PRIMARY KEY (vault, k)
);
CREATE INDEX IF NOT EXISTS items_seq ON items (vault, seq);

-- 기기의 localStorage 전체 사본(원본 hy.* 포함). 복구용, 금고마다 최근 30개만 유지.
CREATE TABLE IF NOT EXISTS snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vault TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  reason TEXT NOT NULL,
  device TEXT,
  body TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS snapshots_vault ON snapshots (vault, created_at);
