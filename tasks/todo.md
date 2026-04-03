# HOI4 Mod Utilities Focus Preview Exclusive Link Symmetry Todo

## Plan
- [x] Inspect the current mutually exclusive link edit path
- [x] Make mutually exclusive link edits write to both focuses and toggle off symmetrically
- [x] Update optimistic webview state and regression tests for the symmetric behavior
- [x] Run `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`
- [x] Record review results and verification notes

## Notes
- Scope for this pass is making `mutually_exclusive` link edits symmetric on both focuses.
- Keep the current `0.13.20` release line unless the user asks for a separate version.
- Reapplying the same exclusive relation should remove it from both focuses, not only the clicked source.

## Review
- `mutually_exclusive` link edits now add and remove the relation on both editable focuses in the current file instead of only changing the clicked source focus.
- Webview optimistic state now mirrors the symmetric behavior so preview lines and local focus data stay in sync immediately after applying the edit.
- Regression tests now cover symmetric add/remove behavior for mutually exclusive links.
- Verification passed: `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`.
- Packaged VSIX: `C:\Users\Administrator\Documents\Code\hoi4modutilities\hoi4modutilities-0.13.20.vsix`.
- Manual VS Code preview smoke was not run in this terminal session.
