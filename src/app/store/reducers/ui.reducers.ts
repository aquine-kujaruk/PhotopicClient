import {DARK, LIGHT} from '../../constants/app.const';
import * as fromUI from '../actions/ui.actions';

export interface UIState {
	isLoading: boolean;
	theme: string;
}

const initState: UIState = {
	isLoading: false,
	theme: LIGHT,
};

export function uiReducer(state = initState, action: fromUI.actions): UIState {
	switch (action.type) {
		case fromUI.LIGHT_THEME:
			return {...state, theme: LIGHT};

		case fromUI.DARK_THEME:
			return {...state, theme: DARK};

		default:
			return state;
	}
}
