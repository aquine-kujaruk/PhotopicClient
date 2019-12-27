import {Theme} from '../../enumerators/app.enum';
import * as fromUI from '../actions/ui.actions';

export interface UIState {
	isLoading: boolean;
	theme: string;
}

const initState: UIState = {
	isLoading: false,
	theme: Theme.LIGHT_THEME,
};

export function uiReducer(state = initState, action: fromUI.actions): UIState {
	switch (action.type) {
		case fromUI.LIGHT_THEME:
			return {...state, theme: Theme.LIGHT_THEME};

		case fromUI.DARK_THEME:
			return {...state, theme: Theme.DARK_THEME};

		default:
			return state;
	}
}
