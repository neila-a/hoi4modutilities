import * as assert from 'assert';
import Module = require('module');
import { parseHoi4File } from '../../src/hoiformat/hoiparser';
import { readFixture } from '../testUtils';

const nodeModule = Module as typeof Module & { _load: (request: string, parent: NodeModule | undefined, isMain: boolean) => unknown };
const originalLoad = nodeModule._load;
nodeModule._load = function(request: string, parent: NodeModule | undefined, isMain: boolean) {
    if (request === 'vscode') {
        return {
            workspace: {
                getConfiguration: () => ({
                    featureFlags: [],
                }),
            },
        };
    }

    return originalLoad.call(this, request, parent, isMain);
};

const { getFocusTree } = require('../../src/previewdef/focustree/schema') as typeof import('../../src/previewdef/focustree/schema');
const { buildFocusPositionTextChanges, applyTextChanges } = require('../../src/previewdef/focustree/positioneditservice') as typeof import('../../src/previewdef/focustree/positioneditservice');
const { getFocusPosition, getLocalPositionFromRenderedAbsolute } = require('../../src/previewdef/focustree/positioning') as typeof import('../../src/previewdef/focustree/positioning');

describe('focus tree position edit helpers', () => {
    it('replaces existing x and y values for a focus block', () => {
        const content = readFixture('focus', 'layout-edit.txt');
        const result = buildFocusPositionTextChanges(content, 'ROOT', 12, 34);

        assert.ifError(result.error);
        const updated = applyTextChanges(content, result.changes ?? []);

        assert.match(updated, /id = ROOT[\s\S]*?x = 12[\s\S]*?y = 34/);
        assert.match(updated, /offset = \{[\s\S]*?x = 3[\s\S]*?y = 4/);
    });

    it('inserts missing x and y before the first offset block', () => {
        const content = `focus_tree = {
    focus = {
        id = ROOT
        offset = {
            x = 3
            y = 4
        }
    }
}`;
        const result = buildFocusPositionTextChanges(content, 'ROOT', 7, 8);

        assert.ifError(result.error);
        const updated = applyTextChanges(content, result.changes ?? []);

        assert.match(updated, /id = ROOT[\s\S]*?x = 7[\s\S]*?y = 8[\s\S]*?offset = \{/);
    });

    it('preserves parser offsets when the source file starts with a BOM', () => {
        const content = '\uFEFFfocus_tree = {\n    focus = {\n        id = ROOT\n        x = 1\n        y = 2\n    }\n}';
        const result = buildFocusPositionTextChanges(content, 'ROOT', 9, 10);

        assert.ifError(result.error);
        const updated = applyTextChanges(content, result.changes ?? []);

        assert.match(updated, /^\uFEFFfocus_tree = \{/);
        assert.match(updated, /id = ROOT[\s\S]*?x = 9[\s\S]*?y = 10/);
    });

    it('derives the local x and y from rendered absolute drop positions', () => {
        const trees = getFocusTree(
            parseHoi4File(readFixture('focus', 'layout-edit.txt')),
            [],
            'common/national_focus/layout-edit.txt',
        );
        const focusTree = trees.find(tree => tree.kind === 'focus');
        const child = focusTree?.focuses.CHILD;

        assert.ok(focusTree);
        assert.ok(child);

        const exprs = [{ scopeName: '', nodeContent: 'has_government = democratic' }];
        const renderedPosition = getFocusPosition(child, {}, focusTree!, exprs);
        assert.deepStrictEqual(renderedPosition, { x: 9, y: 12 });

        const localPosition = getLocalPositionFromRenderedAbsolute(child!, focusTree!, exprs, { x: 20, y: 30 });
        assert.deepStrictEqual(localPosition, { x: 16, y: 24 });
    });

    it('applies unconditional offsets in both rendered and inverse position calculations', () => {
        const trees = getFocusTree(
            parseHoi4File(`focus_tree = {
    focus = {
        id = ROOT
        x = 1
        y = 2
        offset = {
            x = 3
            y = 4
        }
    }
}`),
            [],
            'common/national_focus/unconditional-offset.txt',
        );
        const focusTree = trees.find(tree => tree.kind === 'focus');
        const root = focusTree?.focuses.ROOT;

        assert.ok(focusTree);
        assert.ok(root);

        const renderedPosition = getFocusPosition(root!, {}, focusTree!, []);
        assert.deepStrictEqual(renderedPosition, { x: 4, y: 6 });

        const localPosition = getLocalPositionFromRenderedAbsolute(root!, focusTree!, [], { x: 10, y: 20 });
        assert.deepStrictEqual(localPosition, { x: 7, y: 16 });
    });
});
