import * as fromStudios from '../actions/studios.action';
import {Categories} from 'src/app/enumerators/app.enum';

export interface StudiosState {
	items: any[];
	category: any;
	loaded: boolean;
	loading: boolean;
	error: any;
}

const initState: StudiosState = {
	items: [],
	category: Object.values(Categories).shift(),
	loaded: false,
	loading: false,
	error: null
};

export function studiosReducer(
	state = initState,
	action: fromStudios.studiosActions
): StudiosState {
	switch (action.type) {
		case fromStudios.GET_STUDIOS:
			return {
				...state,
				loading: true,
				category: action.category
			};

		case fromStudios.GET_STUDIOS_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.payload
			};

		case fromStudios.GET_STUDIOS_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				items: [...action.items]
			};

		default:
			return state;
	}
}
