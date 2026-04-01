# HOI4 Mod Utilities Persistent Runtime Regression Todo

## Plan
- [x] Re-check the still-broken localisation highlighting and focus preview button with emphasis on actual editor language IDs and activation assumptions
- [x] Compare the fork against upstream/runtime expectations to find which language IDs or menu gates are still excluding valid HOI4 files
- [x] Implement the smallest robust fix for both preview visibility and localisation highlighting
- [x] Verify with local build/test/package steps and document the remaining manual validation step

## Notes
- The prior `0.13.1` manifest adjustment was not sufficient according to user validation.
- The next investigation should focus on concrete language IDs and preview gating rather than only extension identity collisions.
- If the command still disappears, prefer broad but safe visibility plus command-side rejection over fragile menu logic.

## Review
- Implemented:
  - inspected installed companion extensions and confirmed the active Paradox helpers on this machine use `hoi4`/`paradox` language IDs, while the Millennium Dawn fork uses file-extension-based preview visibility
  - added `onStartupFinished` activation so the fork initializes its preview/highlighting registration even if editor restore misses a language-based activation edge
  - changed the preview fallback visibility rule to key off `resourceExtname` for `.txt`, `.gfx`, `.gui`, and `.map` files instead of only language IDs
  - refreshed preview context on visible-editor and open-document changes to reduce stale toolbar state
  - bumped the package version to `0.13.2` and added manifest regression coverage for the activation/visibility rules
- Verification:
  - `npm run compile-ts`: passed
  - `npm run lint`: passed
  - `npm test`: passed
  - `npm run package`: passed and produced `hoi4modutilities-0.13.2.vsix`
