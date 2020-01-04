import {Action} from '@ngrx/store';

export const GET_GALLERY = '[Gallery] Get Gallery';
export const GET_GALLERY_FAIL = '[Gallery] Get Gallery Fail';
export const GET_GALLERY_SUCCESS = '[Gallery] Get Gallery Success';

export class GetGallery implements Action {
	readonly type = GET_GALLERY;
	constructor(public category: string) {}
}

export class GetGalleryFail implements Action {
	readonly type = GET_GALLERY_FAIL;
	constructor(public payload: string) {}
}

export class GetGallerySuccess implements Action {
	readonly type = GET_GALLERY_SUCCESS;
	constructor(public items: any[]) {}
}

export type galleryActions = GetGallery | GetGalleryFail | GetGallerySuccess;
