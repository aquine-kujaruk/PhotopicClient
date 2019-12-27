import {ActionReducerMap} from '@ngrx/store';

import * as fromPlatform from './reducers/platform.reducers';
import * as fromUI from './reducers/ui.reducers';

export interface AppState {
	ui: fromUI.UIState;
	platform: fromPlatform.PlatformState;
}

export const appReducers: ActionReducerMap<AppState> = {
	ui: fromUI.uiReducer,
	platform: fromPlatform.platformReducer,
};
