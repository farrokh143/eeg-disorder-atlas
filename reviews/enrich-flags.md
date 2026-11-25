# Entries flagged during enrichment and calibration

Flagged by the Opus calibration reviewer (25 Nov 2026). Each needs a check against the paper and, if confirmed, a fix
with `tools/revert-finding.js` plus a corrected `include` through `tools/apply-review.js`.

- pm-35699268: sites should be F3/F4 only (GSN electrodes 25 and 124, which the paper equates to F3/F4), not seven frontal sites; effect pooled over eyes open/closed.
  Resolved 2026-11-25: pm-35699268 — sites corrected to F3, F4 (full text: GSN 25/124); detail notes EO/EC pooling; rec eyes both, absolute, 6C4, dx mixed.
- pm-42872911-fc: detail says source method not named; paper uses sLORETA in Brainstorm (Desikan-Killiany regions).
  Resolved 2026-11-25: pm-42872911-fc — detail corrected: sLORETA in Brainstorm, 68 Desikan-Killiany ROIs (full text).
- pm-36057818: n = 318 is the baseline cohort; analyses used 272 matched participants.
  Resolved 2026-11-25: pm-36057818 — n corrected 318 → 272 (analysed, matched M0/M24); rec power corrected to relative.
- dep-vandervinne-2017: k is null but the paper states 16 studies (1883 MDD, 2161 controls); eyes-closed data only.
  Resolved 2026-11-25: dep-vandervinne-2017 — k 16, n 4044 (1883 MDD + 2161 controls) from the abstract; eyes-closed claim not verified (see reviews/cleanup-unverified.md).
- pm-35182242: protocol entry sites O1/O2 are where the outcome EEG was measured, not the training sites.
  Resolved 2026-11-25: pm-35182242 — sites set to [] (training sites not described; O1/O2 are outcome sites); detail says so.
- ins-hoedlmoser-2008: condition is insomnia, but the paper (Sleep 2008, PMID 18853937) studied 27 healthy subjects, not patients; coded icd11 "subclinical". Check the condition and whether the entry should stay.
  Resolved 2026-11-25: ins-hoedlmoser-2008 — moved from insomnia to cognition (27 healthy adults); design level 4 (randomised); training sites unverified.
- ins-zhao-2021: the meta-analysis pools wakefulness and sleep-stage EEG (REM, NREM); CLAUDE.md excludes sleep EEG biomarkers, so the sleep-stage results may need removing (resting wake data only).
  Resolved 2026-11-25: ins-zhao-2021 — verified, kept: wake results are reported separately from sleep stages; detail notes k/n are whole-review totals.
- pm-38969018: sample is older people with subjective memory complaints, not diagnosed AD or MCI; coded icd11 subclinical. Check whether the alzheimers condition fits.
  Resolved 2026-11-25: pm-38969018 — kept under alzheimers (no better condition; icd11 subclinical); detail now states no MCI/AD diagnosis.
- pm-39248267: Methods say the resting EEG was eyes-closed, but the limitations say only the eyes-open condition was analysed; check the eyes-state wording in the entry detail (coded open here).
- pm-22939462 and cand-mdd-alpha-sex-2012 are the same paper (Jaworska 2012). Batch 11 coded pm-22939462 from the abstract (eyes/power/dx unclear); the full text used for cand-mdd-alpha-sex-2012 gives both eyes, absolute power and DSM-IV. Re-check pm-22939462 and consider removing the duplicate.
  Resolved 2026-11-25: pm-22939462 / cand-mdd-alpha-sex-2012 — duplicate removed: cand-mdd-alpha-sex-2012 excluded as duplicate; pm-22939462 re-added from the full text (sites F7 F3 F4 F8 P3 P4 T5 T6; eyes both, absolute, DSM-IV).
- pm-28900800: ASD+ADHD comorbidity study; coded to ADHD (6A05) with dx mixed, the ASD group is not separately coded.
- pm-31903823: the measure is current source density (sLORETA), not spectral power, so power is coded unclear. Check whether the biomarker fits the power field.
- pm-32682239: the abstract does not state the eye condition, and no full text was checked; eyes coded unclear. Check the full text.
- pm-38858839: the abstract reports FFT power but does not say absolute or relative, and does not state the eye condition; both coded unclear. Check the full text.
- pm-36681294: the paper also analysed task EEG (Oddball/focus tasks); only the eyes-open and eyes-closed resting results are used here.
- pm-24090715: the paper reports 76 bipolar, 132 schizophrenia and 136 control participants (344 in total), but the entry n is 268 (not changed). Check the entry n.
  Resolved 2026-11-25: pm-24090715 — n corrected 268 → 344 (RUNBOOK: n is the whole study sample).
- pm-24439302: the paper reports 1091 participants (225 SZ, 234 PBP, 201 SZR, 231 PBPR, 200 HC), but the entry n is 425 (not changed). The 425 may be the probands plus controls subset; check the entry n.
  Resolved 2026-11-25: pm-24439302 — n corrected 425 → 1091 (all five groups entered the ANCOVA; RUNBOOK whole-sample rule).
- pm-24439302: the power measure is ICA spatial weights (dimensionless), so power is coded unclear. Check the power field.
- pm-29643331: the study also has a task condition (visual continuous performance task); only the resting eyes-open and eyes-closed results are used here.
- pm-40792462: the paper is built on an ASSR (task) paradigm and resting power; only the resting results are relevant. Eyes and power are coded unclear from the abstract, and no full text was checked.
  Resolved 2026-11-25: pm-40792462 — re-added from the full text: resting cluster is 4-8 Hz theta only (alpha removed; 4-10 Hz was ASSR induced power); eyes closed, DSM-5.
- pm-39799666: the sample includes an ASD group as well as schizophrenia and controls; the power measure is log alpha power with a log difference score (asymmetry), coded absolute. Check the power field.
- pm-25587799: the paper's main gamma finding comes from the ASSR (task) data; the resting-state gamma comparison is null (0.006 vs 0.005, p = 0.309). The resting eye condition is not in the abstract and was coded unclear without a full-text check. Check the detail wording and the full text.
  Resolved 2026-11-25: pm-25587799 — verified: entry already describes only the null resting result; detail sentence added; resting eye state still not stated.
- pm-38280864: the sample is Parkinson's disease patients split by a BAI cut-off (>13), not a diagnosed anxiety disorder sample; the icd11 code is the general anxiety block 6B0. Check whether the anxiety condition fits.
  Resolved 2026-11-25: pm-38280864 — moved from anxiety to parkinsons (within-PD anxiety comparison, symptom anxiety); icd11 8A00.
- cand-gad-wang-2025 and cand-anx-yuan-2024 had no PMID in the entry; PMIDs 39966577 and 39588546 were matched by title and authors and filled in this batch. Check the log.
- pm-35192865: the study is in typically developing adolescents selected by social-anxiety scores (not a diagnosed sample); coded scale cut-off, icd 6B04. Check the condition.
  Resolved 2026-11-25: pm-35192865 — kept under anxiety; icd11 corrected 6B04 → subclinical (non-diagnosed adolescents).
- pm-21107671: the sample is children with autism classed by parent-report cut-offs (SCQ/ASSQ), so the dx field is scale cut-off. Check the diagnostic system wording.
- pm-39251926: participants watched a movie with eyes on the screen during the resting recording; eyes state is not stated as eyes-open or eyes-closed, so coded unclear. Check the detail wording.
- pm-39555754: the paper also has stimulus-driven alpha (task) data and an eyes-closed 20 s block; only the eyes-open baseline rest is used here. The power measure is Hilbert alpha amplitude, coded unclear.
- pm-37172019: the eyes-open state is shown by the keyword "eyes open" only; no eye statement appears in the abstract. Check the full text.
- pm-42185252: the paradigm had children watch a cartoon with sound (not an eyes-open/closed rest), so the eye state is coded unclear. The protocol departs from standard resting-state recordings; the power measure is mean log10 whole-brain power, coded absolute.
- pm-12712882: the abstract is in English but the article is Hungarian; quote taken from the English abstract. Check the citation title wording.
- pm-37937898: the abstract does not state whether total power is absolute; "total power" was analysed in linear space (absolute), so coded absolute. Check the power field.
- pm-12705421 and pm-12711923: substance-use entries coded to the parent block 6C4 because the exact ICD-11 stimulant or alcohol code was not checked against the classification; check the icd11 field.
- Batch 27 (substance use): coded from abstracts only; the full-text sources were not re-checked, so several fields are unclear that the full text may settle (pm-18974851, pm-26002855, pm-26051750, pm-27354838, pm-26660886). Check the full texts.
- pm-26051750: resting EEG power is reported without absolute or relative wording in the abstract; power coded unclear.
- Batch 28: pm-35698004, pm-35699268 and pm-36890138 are full-text entries, but were coded from the abstracts only; eye state and power wording may be clearer in the full text. Check these three.
- pm-9146819 and pm-9246556: DSM-III-R is coded as DSM-III, the closest option in the schema.
- pm-41066303 and pm-34706446: neurofeedback (protocol) entries, power set to n/a; the eye state for pm-34706446 is not stated in the abstract.
- pm-27807767, pm-26737184, pm-42642967: eye state and power measure not stated in the abstracts; coded unclear from abstracts only. Check the full texts (pm-27807767, pm-26737184) and the meta-analysis moderators (pm-42642967).
- Batch 30: pm-41534360, pm-40101271, pm-33780847 and pm-40079512 are full-text entries coded from the abstracts only; eye state and power measure are unclear in the abstracts and may be stated in the full texts. Check these four.
- pm-32815287: the measure is EEG coherence (connectivity), not spectral power; power coded unclear. Check the power field for connectivity entries.
- pm-41776190 and pm-41917996: full-text entries coded from abstracts; the entry covers several diagnoses (schizophrenia, bipolar, depression) in pm-41776190, so only the 6A20 code fits the entry condition. Check.
  Resolved 2026-11-25: pm-41776190 — condition schizophrenia verified (SZ-spectrum vs controls); icd11 corrected 6A20 → 6A2 (includes schizoaffective/delusional); eyes closed, DSM-5. pm-41917996 not checked.
- pm-28454845: sample also includes 42 ADD patients; icd11 coded 6D82+8A00 for the Lewy groups the entry is about, ADD not coded
- pm-22775582: sample is cyclothymia (n=16) plus bipolar II (n=42); cyclothymia has no code in the allowed list, so icd11 is 6A6
- pm-42876599: task-based stance EEG (baseline-corrected to resting); the resting-state group difference is uncorrected and isolated. Entry appears to conflict with the resting-state-only rule; suggest review or removal (fields coded from the eyes-closed stance result, not changed).
  Resolved 2026-11-25: pm-42876599 — kept: the result is from a separate seated resting eyes-open recording, not stance; rec eyes corrected closed → open; detail clarified.
- pm-36442376 (raised in the clean-up brief, not flagged above): n 454 vs 355 (epilepsy groups + controls).
  Resolved 2026-11-25: pm-36442376 — verified, no change: the abstract lists IGE 92, FE 149, non-seizure patients 99 and controls 114 = 454, and RUNBOOK n is the whole study sample.
