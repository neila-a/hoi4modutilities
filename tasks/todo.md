# Focus Preview Icon Fallback Parser Error Todo

## Plan
- [x] Audit the new focus icon fallback scan path and confirm why malformed or non-sprite `.gfx` files abort preview loading
- [x] Make the fallback icon resolver resilient so parse/read failures are skipped instead of breaking the whole preview
- [x] Record review notes and rerun compile, lint, test, and package

## Notes
- Scope is limited to the recent focus icon fallback scanner regression.
- The fix should preserve sprite resolution while treating unreadable or unparsable `.gfx` files as non-matches.

## Review
- The new icon fallback path was propagating parse failures from unrelated `interface/*.gfx` files, so one malformed GUI sprite file could abort the whole focus preview load.
- The fallback resolver now skips files that throw during sprite-name discovery and keeps scanning later `.gfx` files for the unresolved icon names.
- Added a regression test that simulates a broken `.gfx` file followed by a valid one.
