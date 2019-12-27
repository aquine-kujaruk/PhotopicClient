import {Action} from '@ngrx/store';

export const WIDTH = '[Platform] Width Breakpoint';
export const NAMES = '[Platform] Names';
export const WEBP = '[Platform] Webp compatibility';
export const LANGUAGE = '[Platform] Language';

export class PlatformHeightAction implements Action {
	readonly type = WIDTH;
	constructor(public breakpoint: string) {}
}

export class PlatformNamesAction implements Action {
	readonly type = NAMES;
	constructor(public names: any) {}
}

export class PlatformWebpAction implements Action {
	readonly type = WEBP;
	constructor(public isWebpCompatible: boolean) {}
}

export class PlatformLanguageAction implements Action {
	readonly type = LANGUAGE;
	constructor(public language: string) {}
}

export type actions =
	| PlatformHeightAction
	| PlatformNamesAction
	| PlatformWebpAction
	| PlatformLanguageAction;
