import * as assert from 'assert';
import manifest from '../../package.json';

describe('extension manifest', () => {
    it('activates on HOI4 language ids used by companion syntax extensions', () => {
        assert.ok(manifest.activationEvents.includes('onStartupFinished'));
        assert.ok(manifest.activationEvents.includes('onLanguage:hoi4'));
        assert.ok(manifest.activationEvents.includes('onLanguage:paradox'));
        assert.ok(manifest.activationEvents.includes('onLanguage:yaml'));
    });

    it('keeps preview entry visible for supported HOI4 file extensions', () => {
        const editorTitlePreviewEntry = manifest.contributes.menus['editor/title']
            .find(entry => entry.command === 'server.hoi4modutilities.preview');
        assert.ok(editorTitlePreviewEntry);
        assert.ok(editorTitlePreviewEntry!.when.includes('resourceExtname =~ /^\\.(txt|gfx|gui|map)$/'));
        assert.match(editorTitlePreviewEntry!.when, /resourceScheme != webview-panel/);
    });
});
