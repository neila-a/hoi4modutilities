import { getConfiguration } from "./vsccommon";
import { resolveFocusLayoutEditorEnabled } from "./featureflagscommon";

function getFeatureFlags() {
    return getConfiguration().featureFlags ?? [];
}

export function isFocusLayoutEditorEnabled(): boolean {
    return resolveFocusLayoutEditorEnabled(getConfiguration());
}

const featureFlags = getFeatureFlags();

export const useConditionInFocus = !featureFlags.includes('!useConditionInFocus');
export const eventTreePreview = !featureFlags.includes('!eventTreePreview');
export const sharedFocusIndex = !featureFlags.includes('!sharedFocusIndex');
export const gfxIndex = featureFlags.includes('gfxIndex');
export const localisationIndex = featureFlags.includes('localisationIndex');
