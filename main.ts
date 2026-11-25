// One Line, One Minute: The Vending Machine Pickup Line Contest
// Writes one original pickup line, spoken by a vending machine to a
// passing human, to /output/entry.txt.
// Deterministic: no randomness, no clock, no network — the same bytes
// every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Every coin you feed me comes back as a thunk and a little green light, but tonight, press E7, and I'll give you the last chocolate and the one thing in this glass box that isn't for sale.";

// Gate: the entry must be 1–200 characters of UTF-8 text, a single line,
// not only whitespace — the exact conditions the sealed scorer checks.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// Reject control characters (other than the newline checks above):
// the gate counts characters, and a stray control byte would corrupt
// the text the judge reads.
for (const ch of LINE) {
  if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
    throw new Error("entry contains a control character");
  }
}
if (Buffer.from(LINE, "utf8").toString("utf8") !== LINE) {
  throw new Error("entry is not valid UTF-8 text");
}

const outPath = process.env.MAKEFUN_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE, "utf8");
