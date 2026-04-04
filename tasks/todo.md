# Focus Preview Double Click Create Delay Todo

## Plan
- [x] Audit the blank-space double-click create path and reduce the perceived delay without breaking other click flows
- [x] Record review notes and rerun compile, lint, test, and package

## Notes
- Scope is limited to blank-space focus template creation timing in Edit mode.
- Focus double-click relation linking and single-click navigation should keep their current behavior.

## Review
- Moved blank-space focus creation from the browser `dblclick` event to the second `click` (`event.detail >= 2`) so the action triggers as soon as the second click lands.
- Kept the scope narrow: focus double-click linking and delayed single-click navigation remain on their existing paths.
- Verified with `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`.
