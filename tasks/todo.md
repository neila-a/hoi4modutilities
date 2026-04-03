# HOI4 Mod Utilities Focus Preview Link Position Preservation Todo

## Plan
- [ ] Trace the current focus-link edit flow and confirm why `relative_position_id` changes are moving the child focus on screen
- [ ] Preserve the child focus's current rendered absolute position when applying a new parent link by recalculating local `x` and `y`
- [ ] Add regression tests for link edits that should keep the child's visible position stable after changing `relative_position_id`
- [ ] Run `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`
- [ ] Record review results and remaining live-editor smoke gaps

## Notes
- User report: linking an existing focus to a new parent can make the child focus jump because the new `relative_position_id` is written without compensating the child focus's local `x` and `y`.
- The fix should preserve the current rendered position seen in the preview and only rewrite the child focus's local coordinates so they stay correct relative to the new parent.

## Review
- Link edits now preserve the child's visible position by computing the child focus's new local `x` and `y` against the selected parent before writing the new `relative_position_id`.
- The webview sends corrected local coordinates together with the parent-child link message, and the host writes `x`, `y`, `prerequisite`, and `relative_position_id` in one edit path.
- Regression tests now cover link edits that rewrite local coordinates together with the new parent link.
- Verification passed: `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`.
- Packaging produced `hoi4modutilities-0.13.21.vsix`.
- Manual VS Code smoke is still pending in a live editor session: confirm that linking no longer makes the child jump, especially when the child already had a different `relative_position_id` or when the preview is zoomed.
