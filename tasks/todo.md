# HOI4 Mod Utilities Focus Preview Blank Canvas Pan Fallback Todo

## Plan
- [x] Add a reliable blank-canvas pan fallback when the generic `#dragger` layer does not receive the initial mousedown
- [x] Keep focus clicking, inlay interactions, and edit-mode drag/create behavior unchanged
- [x] Run `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`
- [x] Record review results and the final packaged VSIX name

## Notes
- User request: blank-space drag to pan sometimes gets ignored.
- Likely cause is that some blank canvas hits land on focus preview content instead of the generic fixed `#dragger` layer, so the preview needs its own blank-canvas pan fallback.
- This should stay within the existing consolidated `0.13.19` release line unless a separate release is explicitly requested.

## Review
- `webviewsrc/focustree.ts` now adds a focus-preview-specific blank-canvas pan fallback that starts scrolling when a non-edit-mode mousedown lands on empty preview content instead of the generic `#dragger` overlay.
- The fallback explicitly excludes focuses, navigators, toolbar controls, dropdowns, and edit-mode paths, so normal focus clicks and edit interactions keep their previous behavior.
- Verification passed: `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`.
- Packaged VSIX: `C:\Users\Administrator\Documents\Code\hoi4modutilities\hoi4modutilities-0.13.19.vsix`.
