import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AppState} from 'src/app/store/app.reducer';
import {STATE_PLATFORM, WIDTH_MOBILE} from '../../constants/app.const';
import {HeaderPopupService} from '../../services/header-popup.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input() isHome = false;
	@Input() hasSearch = false;
	@Input() backButtonUrl: string;
	@Output() searchText = new EventEmitter<string>();

	showSearchBar = false;
	breakpoint: string;

	private platformSubs: Subscription;

	constructor(private _headerPopupService: HeaderPopupService, private _store: Store<AppState>) {}

	conditions = {
		isNotHomeMobileWithSearchbar: () => {
			return this.breakpoint !== WIDTH_MOBILE || (this.isHome && !this.showSearchBar);
		},
	};

	ngOnInit() {
		this.platformSubs = this._store.select(STATE_PLATFORM).subscribe((state) => {
			this.breakpoint = state.breakpoint;
		});
	}

	presentPopup(event) {
		this._headerPopupService.headerPopup(false, event);
	}

	onSearchChange(text: string) {
		this.searchText.emit(text);
	}

	ngOnDestroy() {
		this._headerPopupService.cancelSubs();
		this.platformSubs.unsubscribe();
	}
}
