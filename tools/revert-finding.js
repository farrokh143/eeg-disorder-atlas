#!/usr/bin/env node
// Takes an included finding back out of the atlas (e.g. after a spot-check finds it doesn't qualify).
// Usage: node tools/revert-finding.js <finding id> excluded "<reason>"   remove finding, mark the log row excluded
//        node tools/revert-finding.js <id> full-text "<note>"    remove finding, send it back to the review queue
const fs = require("fs");
const { readLog, writeLog, loadData, DATA } = require("./lib");
const { validate } = require("./validate-data");
const [id, status, text] = process.argv.slice(2);
if (!id || !["excluded", "full-text"].includes(status) || !text) { console.log('Usage: node tools/revert-finding.js <id> excluded|full-text "<reason or note>"'); process.exit(1); }
// <id> is a finding id: a log id for a power entry, or "<log id>-fc" for its connectivity entry.
const { src, data } = loadData(); const L = readLog(); const logId = id.replace(/-fc$/, ""); const r = L.rows.find(x => x.id === logId);
if (!r || r.status !== "included") { console.log(`${logId}: not an included row in the log`); process.exit(1); }
const start = src.indexOf(`\n    {\n      id: ${JSON.stringify(id)},`);
if (start < 0) { console.log(`${id}: could not find its entry in research.js (only entries written by apply-review.js can be reverted)`); process.exit(1); }
let end = src.indexOf("\n    }", start) + 6;
let s0 = start;
if (src[end] === ",") end += 1;              // entry in the middle: drop its trailing comma
else if (src[s0 - 1] === ",") s0 -= 1;       // last entry: drop the comma before it
const out = src.slice(0, s0) + src.slice(end);
fs.writeFileSync(DATA, out);
const today = new Date().toISOString().slice(0, 10);
const sibling = id.endsWith("-fc") ? logId : logId + "-fc";
const siblingExists = data.findings.concat(data.connectivity || []).some(f => f.id === sibling);
if (siblingExists) r.notes += `; Reverted ${id.endsWith("-fc") ? "connectivity" : "power"} entry ${today}: ${text}`;
else { r.status = status; r.reason = status === "excluded" ? text : ""; r.notes += `; Reverted ${today}: ${text}`; }
writeLog(L);
const e = validate(); console.log(e.length ? "WARNING:\n" + e.join("\n") : `${id} reverted to ${status}. Validation OK.`);
