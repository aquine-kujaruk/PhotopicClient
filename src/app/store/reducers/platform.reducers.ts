import {SPANISH, WIDTH_MOBILE} from '../../constants/app.const';
import * as fromPlatform from '../actions/platform.actions';

export interface PlatformState {
	breakpoint: string;
	names: string[];
	isWebpCompatible: boolean;
	language: string;
}

const initState: PlatformState = {
	breakpoint: WIDTH_MOBILE,
	names: [],
	isWebpCompatible: false,
	language: SPANISH,
};

export function platformReducer(state = initState, action: fromPlatform.actions): PlatformState {
	switch (action.type) {
		case fromPlatform.WIDTH:
			return {...state, breakpoint: action.breakpoint};

		case fromPlatform.NAMES:
			return {...state, names: action.names};

		case fromPlatform.WEBP:
			return {...state, isWebpCompatible: action.isWebpCompatible};

		case fromPlatform.LANGUAGE:
			return {...state, language: action.language};

		default:
			return state;
	}
}
