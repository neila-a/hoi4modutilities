# HOI4 Mod Utilities Performance Todo

## Plan
- [x] Analyze current hotspots in activation, indexing, and bundled webview assets
- [x] Reduce bundle size by stopping full-library lodash bundling
- [x] Defer optional index construction until first real lookup instead of activation time
- [x] Verify `npm run compile-ts`, `npm run lint`, `npm test`, and `npm run package`

## Notes
- Keep command IDs, settings keys, and preview behavior stable.
- Prefer low-risk changes that improve cold-start and first-preview latency.
- `npm run test-ui` is still environment-blocked by `spawn EPERM`, so performance verification will use build, unit tests, and VSIX bundle output.

## Review
- Hotspots found:
  - optional GFX/localisation/shared-focus indexes were built during activation instead of first use
  - webpack was bundling the full `lodash` entry for both extension and webview code paths
  - activation eagerly created and showed the output channel
- Improvements implemented:
  - added a webpack-only lodash shim so bundles only include the lodash helpers actually used
  - deferred GFX/localisation/shared-focus index construction until the first lookup
  - stopped auto-showing the output channel during activation
- Verification:
  - `npm run compile-ts`: passed
  - `npm run lint`: passed
  - `npm test`: passed
  - `npm run package`: passed and produced `hoi4modutilities-0.13.0.vsix`
- Bundle impact from `npm run package` output:
  - `dist/extension.js`: `955.41 KB -> 916.95 KB`
  - `static/common.js`: `251.11 KB -> 223.87 KB`
  - VSIX size: `558.25 KB -> 531.71 KB`
- Remaining known limitation:
  - `npm run test-ui` remains environment-blocked by `spawn EPERM`, so UI-host performance was not re-verified here.
