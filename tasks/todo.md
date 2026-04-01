# HOI4 Mod Utilities Fork Coexistence Regression Todo

## Plan
- [x] Namespace the fork-specific runtime identifiers so `server.hoi4modutilities` can coexist with the upstream extension
- [x] Update manifest metadata and runtime constants for commands, custom editors, webview types, activation hooks, and context keys
- [x] Update tests and docs to the new fork-specific identifiers while preserving the actual feature set
- [x] Verify with `npm run compile-ts`, `npm run lint`, and `npm test`

## Notes
- Root cause: the fork changed only the distribution identity while reusing upstream command/view/context identifiers, which breaks side-by-side installation through duplicate registrations.
- Keep the forked extension visually and operationally distinct from upstream.
- Configuration keys are lower priority than command/view/runtime identifiers for the immediate activation fix.

## Review
- Implemented:
  - identified the regression cause as duplicate runtime registrations when both the upstream and forked extensions are installed together
  - namespaced the fork-specific command IDs, custom editor view types, webview panel types, context keys, and HOI4 filesystem provider schema under the `server.*` prefix
  - updated the manifest activation hooks and menu `when` clauses to the new fork-specific identifiers
  - updated the development-only test command registration to use the fork namespace
  - kept the existing `hoi4ModUtilities.*` settings keys intact to avoid breaking current user configuration
- Verification:
  - `npm run compile-ts`: passed
  - `npm run lint`: passed
  - `npm test`: passed
  - `npm run package`: passed and produced `hoi4modutilities-0.13.0.vsix`
- Root cause:
  - changing only the extension publisher allowed the fork to install separately, but runtime identifiers were still shared with upstream, which caused duplicate command/view/context/provider registrations and broke activation when both extensions coexisted
