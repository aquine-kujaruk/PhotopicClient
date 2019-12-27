import {Action} from '@ngrx/store';

export const GET_STUDIOS = '[Studios] Get Studios';
export const GET_STUDIOS_FAIL = '[Studios] Get Studios Fail';
export const GET_STUDIOS_SUCCESS = '[Studios] Get Studios Success';

export class GetStudios implements Action {
	readonly type = GET_STUDIOS;
	constructor(public category: string) {}
}

export class GetStudiosFail implements Action {
	readonly type = GET_STUDIOS_FAIL;
	constructor(public payload: string) {}
}

export class GetStudiosSuccess implements Action {
	readonly type = GET_STUDIOS_SUCCESS;
	constructor(public items: any[]) {}
}

export type studiosActions = GetStudios | GetStudiosFail | GetStudiosSuccess;
