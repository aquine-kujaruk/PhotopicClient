import {Breackpoints, Languages} from '../../enumerators/app.enum';
import * as fromPlatform from '../actions/platform.actions';

export interface PlatformState {
	breakpoint: string;
	names: any;
	isWebpCompatible: boolean;
	language: string;
}

const initState: PlatformState = {
	breakpoint: Breackpoints.XS,
	names: [],
	isWebpCompatible: false,
	language: Languages.ES,
};

export function platformReducer(
	state = initState,
	action: fromPlatform.actions,
): PlatformState {
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
