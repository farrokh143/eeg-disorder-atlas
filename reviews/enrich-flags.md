# Entries flagged during enrichment and calibration

Flagged by the Opus calibration reviewer (25 Nov 2026). Each needs a check against the paper and, if confirmed, a fix
with `tools/revert-finding.js` plus a corrected `include` through `tools/apply-review.js`.

- pm-35699268: sites should be F3/F4 only (GSN electrodes 25 and 124, which the paper equates to F3/F4), not seven frontal sites; effect pooled over eyes open/closed.
- pm-42872911-fc: detail says source method not named; paper uses sLORETA in Brainstorm (Desikan-Killiany regions).
- pm-36057818: n = 318 is the baseline cohort; analyses used 272 matched participants.
- dep-vandervinne-2017: k is null but the paper states 16 studies (1883 MDD, 2161 controls); eyes-closed data only.
- pm-35182242: protocol entry sites O1/O2 are where the outcome EEG was measured, not the training sites.
- ins-hoedlmoser-2008: condition is insomnia, but the paper (Sleep 2008, PMID 18853937) studied 27 healthy subjects, not patients; coded icd11 "subclinical". Check the condition and whether the entry should stay.
- ins-zhao-2021: the meta-analysis pools wakefulness and sleep-stage EEG (REM, NREM); CLAUDE.md excludes sleep EEG biomarkers, so the sleep-stage results may need removing (resting wake data only).
- pm-38969018: sample is older people with subjective memory complaints, not diagnosed AD or MCI; coded icd11 subclinical. Check whether the alzheimers condition fits.
- pm-39248267: Methods say the resting EEG was eyes-closed, but the limitations say only the eyes-open condition was analysed; check the eyes-state wording in the entry detail (coded open here).
- pm-22939462 and cand-mdd-alpha-sex-2012 are the same paper (Jaworska 2012). Batch 11 coded pm-22939462 from the abstract (eyes/power/dx unclear); the full text used for cand-mdd-alpha-sex-2012 gives both eyes, absolute power and DSM-IV. Re-check pm-22939462 and consider removing the duplicate.
- pm-28900800: ASD+ADHD comorbidity study; coded to ADHD (6A05) with dx mixed, the ASD group is not separately coded.
- pm-31903823: the measure is current source density (sLORETA), not spectral power, so power is coded unclear. Check whether the biomarker fits the power field.
- pm-32682239: the abstract does not state the eye condition, and no full text was checked; eyes coded unclear. Check the full text.
- pm-38858839: the abstract reports FFT power but does not say absolute or relative, and does not state the eye condition; both coded unclear. Check the full text.
- pm-36681294: the paper also analysed task EEG (Oddball/focus tasks); only the eyes-open and eyes-closed resting results are used here.
- pm-24090715: the paper reports 76 bipolar, 132 schizophrenia and 136 control participants (344 in total), but the entry n is 268 (not changed). Check the entry n.
- pm-24439302: the paper reports 1091 participants (225 SZ, 234 PBP, 201 SZR, 231 PBPR, 200 HC), but the entry n is 425 (not changed). The 425 may be the probands plus controls subset; check the entry n.
- pm-24439302: the power measure is ICA spatial weights (dimensionless), so power is coded unclear. Check the power field.
- pm-29643331: the study also has a task condition (visual continuous performance task); only the resting eyes-open and eyes-closed results are used here.
- pm-40792462: the paper is built on an ASSR (task) paradigm and resting power; only the resting results are relevant. Eyes and power are coded unclear from the abstract, and no full text was checked.
- pm-39799666: the sample includes an ASD group as well as schizophrenia and controls; the power measure is log alpha power with a log difference score (asymmetry), coded absolute. Check the power field.
