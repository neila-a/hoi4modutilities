import * as assert from 'assert';
import { resolveFocusLayoutEditorEnabled } from '../../src/util/featureflagscommon';

describe('feature flags', () => {
    it('enables the focus layout editor from the dedicated boolean setting', () => {
        assert.strictEqual(resolveFocusLayoutEditorEnabled({
            focusLayoutEditor: true,
            featureFlags: [],
        }), true);
    });

    it('keeps legacy feature flag compatibility for the focus layout editor', () => {
        assert.strictEqual(resolveFocusLayoutEditorEnabled({
            focusLayoutEditor: false,
            featureFlags: ['focusLayoutEditor'],
        }), true);
    });

    it('keeps the focus layout editor disabled when neither setting is enabled', () => {
        assert.strictEqual(resolveFocusLayoutEditorEnabled({
            focusLayoutEditor: false,
            featureFlags: [],
        }), false);
    });
});
