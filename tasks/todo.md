# HOI4 Mod Utilities Focus Preview Drag Edit Wiki Alignment Todo

## Plan
- [x] Read the official HOI4 national focus modding guidance and identify the coordinate-rule improvement it implies for preview editing
- [x] Replace the hard-coded focus spacing assumption with GUI-derived spacing while preserving the existing fallback
- [x] Add regression coverage for focus-spacing extraction and rerun compile, lint, tests, and package
- [x] Record the wiki-backed behavior change and the remaining live smoke gap

## Notes
- Official HOI4 wiki guidance says focus coordinate unit size comes from `focus_spacing` in `interface/nationalfocusview.gui`, so hard-coded `96 x 130` should only be the fallback.
- This pass aligns preview rendering and drag snapping with that documented source of truth.

## Review
- Focus preview loading now reads `interface/nationalfocusview.gui` and extracts `focus_spacing` as the preferred coordinate unit source for both rendering and drag snapping, with `96 x 130` retained as the fallback when the GUI file is absent or incomplete.
- Added dedicated extraction coverage in `test/unit/focustree-focusspacing.test.ts` so modded GUI spacing changes are exercised in unit tests instead of being left as runtime-only behavior.
- Verification passed with `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`.
- Manual VS Code smoke is still the remaining proof point for live drag feel inside the running preview.
