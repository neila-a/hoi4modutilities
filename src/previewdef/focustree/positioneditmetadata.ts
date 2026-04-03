import { Node } from "../../hoiformat/hoiparser";
import { FocusPositionMeta, ScalarFieldMeta, TextRange, createFocusPositionEditKey } from "./positioneditcommon";

export interface FocusPositionFileMetadata {
    focuses: Record<string, FocusPositionMeta | undefined>;
}

export function collectFocusPositionFileMetadata(node: Node, filePath: string): FocusPositionFileMetadata {
    const result: FocusPositionFileMetadata = {
        focuses: {},
    };

    if (!Array.isArray(node.value)) {
        return result;
    }

    for (const child of node.value) {
        const childName = child.name?.toLowerCase();
        if (!childName || !Array.isArray(child.value)) {
            continue;
        }

        if (childName === 'focus_tree') {
            for (const focusNode of child.value.filter(isNamedBlock('focus'))) {
                const metadata = collectFocusMetadata(focusNode, filePath);
                if (metadata) {
                    result.focuses[metadata.editKey] = metadata;
                }
            }
            continue;
        }

        if (childName === 'shared_focus' || childName === 'joint_focus') {
            const metadata = collectFocusMetadata(child, filePath);
            if (metadata) {
                result.focuses[metadata.editKey] = metadata;
            }
        }
    }

    return result;
}

function collectFocusMetadata(node: Node, filePath: string): FocusPositionMeta | undefined {
    if (!node.nameToken) {
        return undefined;
    }

    const id = readStringChildValue(node, 'id');
    if (!id) {
        return undefined;
    }

    const editKey = createFocusPositionEditKey(filePath, node.nameToken.start);
    return {
        editKey,
        focusId: id,
        editable: true,
        sourceFile: filePath,
        sourceRange: createNodeRange(node),
        x: collectScalarField(node, 'x'),
        y: collectScalarField(node, 'y'),
        basePosition: {
            x: readNumberChildValue(node, 'x') ?? 0,
            y: readNumberChildValue(node, 'y') ?? 0,
        },
        relativePositionId: readStringChildValue(node, 'relative_position_id'),
        offsets: collectOffsetMetadata(node),
    };
}

function collectOffsetMetadata(node: Node): FocusPositionMeta['offsets'] {
    if (!Array.isArray(node.value)) {
        return [];
    }

    return node.value
        .filter(isNamedBlock('offset'))
        .map(offsetNode => ({
            x: readNumberChildValue(offsetNode, 'x') ?? 0,
            y: readNumberChildValue(offsetNode, 'y') ?? 0,
            hasTrigger: hasNamedChild(offsetNode, 'trigger'),
            triggerText: hasNamedChild(offsetNode, 'trigger') ? 'trigger' : undefined,
        }));
}

function collectScalarField(node: Node, fieldName: string): ScalarFieldMeta | undefined {
    const child = findNamedChild(node, fieldName);
    if (!child || !child.nameToken || !child.valueStartToken || !child.valueEndToken) {
        return undefined;
    }

    return {
        nodeRange: createNodeRange(child),
        valueRange: {
            start: child.valueStartToken.start,
            end: child.valueEndToken.end,
        },
    };
}

function isNamedBlock(expectedName: string) {
    return (node: Node): boolean => node.name?.toLowerCase() === expectedName && Array.isArray(node.value);
}

function hasNamedChild(node: Node, expectedName: string): boolean {
    return findNamedChild(node, expectedName) !== undefined;
}

function findNamedChild(node: Node, expectedName: string): Node | undefined {
    if (!Array.isArray(node.value)) {
        return undefined;
    }

    return node.value.find(child => child.name?.toLowerCase() === expectedName);
}

function readStringChildValue(node: Node, expectedName: string): string | undefined {
    const child = findNamedChild(node, expectedName);
    if (!child) {
        return undefined;
    }

    if (typeof child.value === 'string') {
        return child.value;
    }

    if (typeof child.value === 'object' && child.value !== null && 'name' in child.value) {
        return child.value.name;
    }

    return undefined;
}

function readNumberChildValue(node: Node, expectedName: string): number | undefined {
    const child = findNamedChild(node, expectedName);
    if (!child) {
        return undefined;
    }

    if (typeof child.value === 'number') {
        return child.value;
    }

    if (typeof child.value === 'object' && child.value !== null && 'name' in child.value) {
        const parsed = Number(child.value.name);
        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
}

function createNodeRange(node: Node): TextRange {
    return {
        start: node.nameToken?.start ?? node.valueStartToken?.start ?? 0,
        end: node.valueEndToken?.end ?? node.valueStartToken?.end ?? node.nameToken?.end ?? 0,
    };
}
