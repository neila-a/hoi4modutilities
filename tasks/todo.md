# HOI4 Mod Utilities Focus Layout Editor UI Cleanup Todo

## Plan
- [x] Inspect the current focus layout editor UI structure and identify why controls overlap the preview
- [x] Rework the layout editor UI so Edit appears to the left of Search, position editing is drag-only, and no popup inspector is rendered
- [x] Verify the revised UI build, update task notes, and capture the lesson from the overlapping popup design

## Notes
- The focus layout editor currently renders a floating inspector panel that overlaps the focus preview content.
- The requested UX changes are explicit: move the `Edit` text/button to the left of `Search`, make position changes drag-only, and remove popup behavior.
- The safest implementation is to collapse the inspector into inline toolbar status/actions instead of keeping a floating editor surface.

## Review
- Removed the floating focus layout inspector and replaced it with inline toolbar status/actions so the editor no longer overlays the preview canvas.
- Moved the `Edit Layout` control to the left of `Search` in the focus preview toolbar.
- Limited direct position editing to drag interactions only by removing the popup numeric position controls from the webview UI.
- Kept `Apply`, `Discard`, stale-draft recovery, and `Open Source` as inline toolbar actions instead of popup controls.
- Verified with `npm test` and `npm run package`; the packaged output is `C:\Users\Administrator\Documents\Code\hoi4modutilities\hoi4modutilities-0.13.7.vsix`.
- `npm run test-ui` was not rerun in this pass.
