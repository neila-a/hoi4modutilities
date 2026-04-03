# HOI4 Mod Utilities Focus Preview Drag Edit Immediate Refresh Todo

## Plan
- [ ] Restore immediate visible preview updates after a successful drag edit
- [ ] Keep the delayed duplicate host rerender suppressed so the previous performance fix remains
- [ ] Re-run compile, lint, tests, and package after the refresh-path correction
- [ ] Record the corrected immediate-update behavior and remaining live smoke gap

## Notes
- New user report: the code coordinates change, but the preview does not visibly update until edit mode is toggled off.
- The likely regression is that the delayed host rerender was suppressed without adding an immediate local rebuild to replace it.

## Review
- Pending immediate-refresh correction.
