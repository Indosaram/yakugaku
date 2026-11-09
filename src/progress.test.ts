import { expect, test } from "bun:test";
import { allKeys, itemsFor, setMany } from "./progress";
import { markKey, readMark, writeMark } from "./marks";

test("writeMark stores a mark readable back through itemsFor", () => {
  writeMark("probe", "o");
  const value = readMark((k) => JSON.parse(itemsFor([k])[0]?.v ?? "null"), "probe");
  expect(value).toBe("o");
  expect(allKeys()).toContain(markKey("probe"));
});

test("the localStorage shim persists progress written by setMany", () => {
  setMany({ "probe:count": 2 });
  expect(globalThis.localStorage.getItem("hoshi-eigo-progress-v1")).toContain("probe:count");
});
