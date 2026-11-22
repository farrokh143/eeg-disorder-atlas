#!/usr/bin/env node
// Checks the statistics in tools/synthesize.js against known values. Usage: node tools/test-synthesize.js
const { signTest, wilson, weightedSignFlip, adjust } = require("./synthesize");
let fail = 0; const near = (a, b, tol, msg) => { const ok = Math.abs(a - b) <= tol; if (!ok) fail++; console.log(`${ok ? "ok  " : "FAIL"} ${msg}: got ${a.toFixed(5)}, expected ${b}`); };
// Cochrane Handbook ch.12 worked example: 10 of 12 studies favour; 83% (95% CI 55% to 95%), P = 0.039
near(signTest(10, 12), 0.0386, 0.0005, "sign test 10/12 (Cochrane example)");
const [lo, hi] = wilson(10, 12); near(lo, 0.552, 0.005, "Wilson lower 10/12"); near(hi, 0.953, 0.005, "Wilson upper 10/12");
near(signTest(5, 5), 0.0625, 1e-9, "sign test 5/5 cannot reach 0.05");
near(signTest(6, 6), 0.03125, 1e-9, "sign test 6/6");
near(signTest(3, 6), 1, 1e-9, "sign test balanced");
// Equal weights: weighted sign-flip p equals the exact sign test
near(weightedSignFlip(Array(8).fill(1), [1, 1, 1, 1, 1, 1, 1, -1]), signTest(7, 8), 1e-9, "sign-flip with equal weights = sign test (7/8)");
// Unequal weights: one large opposing study raises p
// One study 10x heavier than six small ones in the other direction: every flip has |S| >= 4, so p = 1 exactly
near(weightedSignFlip([1, 1, 1, 1, 1, 1, 10], [1, 1, 1, 1, 1, 1, -1]), 1, 1e-9, "sign-flip, one dominant opposing study");
near(weightedSignFlip([3, 3, 3, 3, 3, 3, 1], [1, 1, 1, 1, 1, 1, -1]), 4 / 128, 1e-9, "sign-flip, large studies agree, small one opposes");
// Monte Carlo path (m > 20) agrees with the exact sign test for equal weights
near(weightedSignFlip(Array(24).fill(1), Array(19).fill(1).concat(Array(5).fill(-1))), signTest(19, 24), 0.002, "Monte Carlo sign-flip (24 studies)");
// BH / BY against hand calculation for p = [0.01, 0.04, 0.03, 0.5]
const bh = adjust([0.01, 0.04, 0.03, 0.5], "BH"); near(bh[0], 0.04, 1e-9, "BH q1"); near(bh[1], 0.05333, 1e-4, "BH q2"); near(bh[2], 0.05333, 1e-4, "BH q3"); near(bh[3], 0.5, 1e-9, "BH q4");
const by = adjust([0.01, 0.04, 0.03, 0.5], "BY"), c = 1 + 1 / 2 + 1 / 3 + 1 / 4; near(by[0], 0.04 * c, 1e-9, "BY q1"); near(by[3], Math.min(1, 0.5 * c), 1e-9, "BY q4");
console.log(fail ? `\n${fail} test(s) failed` : "\nAll tests passed"); process.exit(fail ? 1 : 0);
