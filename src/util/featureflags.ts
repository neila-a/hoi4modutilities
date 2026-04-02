import { getConfiguration } from "./vsccommon";

const featureFlags = getConfiguration().featureFlags;
const focusLayoutEditorSetting = getConfiguration().focusLayoutEditor;

export const useConditionInFocus = !featureFlags.includes('!useConditionInFocus');
export const eventTreePreview = !featureFlags.includes('!eventTreePreview');
export const sharedFocusIndex = !featureFlags.includes('!sharedFocusIndex');
export const gfxIndex = featureFlags.includes('gfxIndex');
export const localisationIndex = featureFlags.includes('localisationIndex');
export const focusLayoutEditor = focusLayoutEditorSetting || featureFlags.includes('focusLayoutEditor');
