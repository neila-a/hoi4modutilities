# HOI4 Mod Utilities Focus Preview Blank Render Recovery Todo

## Plan
- [x] Keep the continuous-focus helper overlay behind rendered focus nodes
- [x] Add a safe render fallback when stale condition selections would otherwise hide every focus node
- [x] Rerun compile, lint, tests, and package after the preview recovery fix
- [x] Record review results and remaining manual smoke gaps

## Notes
- New user report: the preview opens with the toolbar and continuous-focus helper box, but no actual focus nodes are visible.
- The screenshot suggests either the helper overlay is stacked above the grid or current condition state is filtering the entire tree to zero items.

## Review
- Kept the continuous-focus helper behind the focus and inlay placeholders so the helper box no longer visually covers the rendered focus grid.
- Added a webview fallback that clears stale persisted condition selections when they would otherwise render zero focus nodes for a non-empty tree.
- Verification passed: `npm run compile-ts`, `npm run lint`, `npm test`, `npm run package`.
- Remaining gap: live manual VS Code smoke for the previously blank file was not executed in this terminal session, and VS Code log inspection was blocked here by `Access to the path 'C:\\Users\\Administrator\\AppData\\Roaming\\Code\\logs' is denied.`
