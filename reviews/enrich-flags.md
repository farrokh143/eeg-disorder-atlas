# Entries flagged during enrichment and calibration

Flagged by the Opus calibration reviewer (25 Nov 2026). Each needs a check against the paper and, if confirmed, a fix
with `tools/revert-finding.js` plus a corrected `include` through `tools/apply-review.js`.

- pm-35699268: sites should be F3/F4 only (GSN electrodes 25 and 124, which the paper equates to F3/F4), not seven frontal sites; effect pooled over eyes open/closed.
- pm-42872911-fc: detail says source method not named; paper uses sLORETA in Brainstorm (Desikan-Killiany regions).
- pm-36057818: n = 318 is the baseline cohort; analyses used 272 matched participants.
- dep-vandervinne-2017: k is null but the paper states 16 studies (1883 MDD, 2161 controls); eyes-closed data only.
- pm-35182242: protocol entry sites O1/O2 are where the outcome EEG was measured, not the training sites.
