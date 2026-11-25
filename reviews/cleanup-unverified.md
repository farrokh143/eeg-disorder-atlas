# Clean-up: items that could not be fully verified (2026-11-25)

- ins-hoedlmoser-2008: moved to `cognition` (healthy adults, from the abstract), but PMC2572745 has no full text, so the
  training sites (C3, Cz, C4) are carried over unverified. Needs the Sleep 2008 full text.
- dep-vandervinne-2017: the flag says the pooled data are eyes-closed only; the abstract does not say so and no full
  text was read here, so the eye state (rec eyes unclear) was not changed. PMC5524421 exists if someone wants to check.
- pm-25587799: the main text does not state the resting eye condition (eAppendix not available); rec eyes stays unclear.
- pm-35182242: the trained band of the neurofeedback arm is not described in the paper; the entry still records
  `alpha: up`, which is the measured outcome, not the training target. A schema decision is needed on whether a protocol
  entry with an unknown training target should stay.
