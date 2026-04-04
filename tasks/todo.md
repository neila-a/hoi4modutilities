# Focus Preview Multi Delete Todo

## Plan
- [x] Audit the current single-focus delete path in the webview context menu and host writeback service
- [x] Extend delete so a context-menu delete on a selected focus removes the whole multi-selection in one operation
- [x] Record review notes and rerun compile, lint, test, and package

## Notes
- Scope is limited to delete behavior for already selected focuses.
- Single-focus delete and dependency cleanup should continue to work unchanged.

## Review
- The webview context menu now expands `Delete focus` to the full selected set when the clicked focus is already part of a multi-selection.
- Host/writeback delete handling now accepts multiple focus ids and removes their blocks plus dependent prerequisite, mutually exclusive, and `relative_position_id` references in one grouped edit.
- Added a regression test for deleting two selected focuses at once while preserving the remaining child focus body.
