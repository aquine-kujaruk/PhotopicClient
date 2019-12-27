import {Action} from '@ngrx/store';

export const LIGHT_THEME = '[UI theme] light theme';
export const DARK_THEME = '[UI theme] dark theme';

export class LightThemeAction implements Action {
	readonly type = LIGHT_THEME;
}

export class DarkThemeAction implements Action {
	readonly type = DARK_THEME;
}

export type actions = LightThemeAction | DarkThemeAction;
