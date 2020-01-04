import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {Categories} from 'src/app/enumerators/app.enum';
import {STATE_HOME} from '../../constants/app.const';
import {GetStudios} from './store/actions/studios.action';
import {IAppState} from './store/home.reducer';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
	selectedCategory: string;
	categories = Object.values(Categories);

	private studiosSubs: Subscription;

	constructor(private _store: Store<IAppState>) {}

	ngOnInit() {
		this.studiosSubs = this._store.select(STATE_HOME).subscribe((state) => {
			this.selectedCategory = state.studios.category;
		});
	}

	search(text: string) {
		console.log(`home now: ${text}`);
	}

	slideChange(category: Categories) {
		this._store.dispatch(new GetStudios(category));
	}

	ngOnDestroy() {
		this.studiosSubs.unsubscribe();
	}
}
