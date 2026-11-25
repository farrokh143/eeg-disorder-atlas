# Validation sheets

Frozen sample for `methods/validation-protocol.md` (seed 20261125, drawn 25 Nov 2026). Do not regenerate.

1. Copy `screening-sheet.csv` to `screening-<you>.csv` (human1, human2) and fill `reviewer`, `decision`
   (include / exclude), `exclusion_reason`, `minutes`.
2. Copy `extraction-sheet.csv` to `extraction-<you>.csv` and fill the field columns (formats in the protocol).
3. Do not open the atlas site, `data/research.js` or `data/research-log.csv` while reviewing.
4. Commit your file (or send it to the owner). Then run `node tools/validation-stats.js --out methods/validation-results.md`.

The sheets open in Excel or Google Sheets (File → Import).
