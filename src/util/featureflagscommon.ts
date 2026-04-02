export interface FocusLayoutEditorConfigurationLike {
    readonly featureFlags?: readonly string[];
    readonly focusLayoutEditor?: boolean;
}

export function resolveFocusLayoutEditorEnabled(configuration: FocusLayoutEditorConfigurationLike): boolean {
    return !!configuration.focusLayoutEditor || (configuration.featureFlags ?? []).includes('focusLayoutEditor');
}
