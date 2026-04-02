# HOI4 Mod Utilities Focus Layout Editor Setting Todo

## Plan
- [x] Inspect the existing settings manifest, localized strings, and focus layout editor flag wiring
- [x] Add a dedicated VS Code settings UI toggle for the focus layout editor while preserving legacy `featureFlags` compatibility
- [x] Run verification, update task notes, and summarize the user-facing behavior

## Notes
- The user wants the focus layout editor to appear in the VS Code extension settings UI.
- The existing implementation is hidden behind `hoi4ModUtilities.featureFlags` with `focusLayoutEditor`.
- The safest rollout is additive: introduce a boolean setting and let runtime accept either the new setting or the legacy feature flag.

## Review
- Added `hoi4ModUtilities.focusLayoutEditor` as a dedicated boolean setting so the experimental focus layout editor appears in the VS Code Settings UI.
- Preserved backward compatibility by letting runtime enable the feature when either the new boolean setting is `true` or the legacy `hoi4ModUtilities.featureFlags` array contains `focusLayoutEditor`.
- Verified with `npm test` (`compile-ts`, `lint`, and `test:unit`) and confirmed the manifest regression test for the new settings UI entry passes.
- Previously verified `npm run package`, which produced `C:\Users\Administrator\Documents\Code\hoi4modutilities\hoi4modutilities-0.13.7.vsix`.
