# HOI4 Definition RGB Picker Todo

## Plan
- [x] Inspect the current text-editing flow, parser token model, and country color file coverage
- [x] Extend the same RGB picker support to ideology definition files without broadening to unrelated files
- [x] Update focused unit tests to cover ideology file targeting while keeping country behavior intact
- [x] Run targeted verification again and refresh the review notes

## Notes
- Scope is limited to text-editor color picking for RGB values in country color files and ideology definition files.
- Prefer the native VS Code color picker via `DocumentColorProvider` instead of building a custom UI.
- Keep changes minimal and avoid touching unrelated preview or world map behavior.

## Review
- `src/util/countryColorProvider.ts` now registers a VS Code `DocumentColorProvider` during activation, so opening `common/countries/color.txt`, `common/countries/colors.txt`, `common/countries/cosmetic.txt`, or `common/ideologies/*.txt` exposes native RGB color picking directly in the text editor.
- `src/util/countryColorProviderShared.ts` centralizes file-path matching for both country and ideology definitions, plus shared `color`/`color_ui` RGB block detection, comment skipping, clipping, and format-preserving rewrite helpers.
- `test/unit/country-color-provider-shared.test.ts` and `test/unit/country-color-provider.test.ts` now cover ideology file targeting alongside the original country paths, while keeping RGB block discovery, comment filtering, formatting preservation, and picker-value clipping checks in place.
- Release metadata was bumped to `0.13.20` in `package.json`, `package-lock.json`, and `CHANGELOG.md`.
- Verification passed: `npm test` and `npm run package`.
- Packaged VSIX: `C:\Users\Administrator\Documents\Code\hoi4modutilities\hoi4modutilities-0.13.20.vsix`.
- Manual in-editor smoke testing of the color picker UI was not run in this terminal session.
