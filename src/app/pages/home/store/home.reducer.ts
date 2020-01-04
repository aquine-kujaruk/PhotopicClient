import {ActionReducerMap} from '@ngrx/store';
import {AppState} from '../../../store/app.reducer';
import * as fromStudios from './reducers/studios.reducers';

export interface HomeState {
	studios: fromStudios.StudiosState;
}

export interface IAppState extends AppState {
	home: HomeState;
}

export const homeReducers: ActionReducerMap<HomeState> = {
	studios: fromStudios.studiosReducer,
};
