export interface TextRange {
    start: number;
    end: number;
}

export interface ScalarFieldMeta {
    nodeRange: TextRange;
    valueRange: TextRange;
}

export interface FocusPositionOffsetMeta {
    x: number;
    y: number;
    hasTrigger: boolean;
    triggerText?: string;
}

export interface FocusPositionMeta {
    editKey: string;
    focusId: string;
    editable: boolean;
    sourceFile: string;
    sourceRange?: TextRange;
    x?: ScalarFieldMeta;
    y?: ScalarFieldMeta;
    basePosition: {
        x: number;
        y: number;
    };
    relativePositionId?: string;
    offsets: FocusPositionOffsetMeta[];
}

export interface ApplyFocusPositionEditMessage {
    command: 'applyFocusPositionEdit';
    focusId: string;
    targetLocalX: number;
    targetLocalY: number;
    documentVersion: number;
}

export type FocusPositionEditMessage = ApplyFocusPositionEditMessage;

export function createFocusPositionEditKey(file: string, discriminator: string | number): string {
    return `focus:${file}:${discriminator}`;
}
