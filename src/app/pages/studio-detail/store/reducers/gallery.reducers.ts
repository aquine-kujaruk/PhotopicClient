import {Categories} from 'src/app/enumerators/app.enum';
import * as fromGallery from '../actions/gallery.action';

export interface GalleryState {
	items: any[];
	category: any;
	loaded: boolean;
	loading: boolean;
	error: any;
}

const initState: GalleryState = {
	items: [],
	category: Object.values(Categories).shift(),
	loaded: false,
	loading: false,
	error: null,
};

export function galleryReducer(
	state = initState,
	action: fromGallery.galleryActions,
): GalleryState {
	switch (action.type) {
		case fromGallery.GET_GALLERY:
			return {
				...state,
				loading: true,
				category: action.category,
			};

		case fromGallery.GET_GALLERY_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.payload,
			};

		case fromGallery.GET_GALLERY_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				items: [...action.items],
			};

		default:
			return state;
	}
}
