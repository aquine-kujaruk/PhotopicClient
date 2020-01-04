import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import * as fromGallery from './reducers/gallery.reducers';

export interface StudioDetailState {
	gallery: fromGallery.GalleryState;
}

export interface IAppState extends AppState {
	studioDetail: StudioDetailState;
}

export const studioDetailReducers: ActionReducerMap<StudioDetailState> = {
	gallery: fromGallery.galleryReducer,
};
