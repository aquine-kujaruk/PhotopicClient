import {Component, Input, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {AppState} from 'src/app/store/app.reducer';
import {Languages} from '../../../enumerators/app.enum';
import {PlatformLanguageAction} from '../../../store/actions/platform.actions';

@Component({
	selector: 'app-header-popover',
	templateUrl: './header-popover.component.html',
	styleUrls: ['./header-popover.component.scss'],
})
export class HeaderPopoverComponent implements OnInit {
	@Input() isAuthenticated;

	constructor(
		private _store: Store<AppState>,
		public _popoverCtrl: PopoverController,
	) {}

	ngOnInit() {}

	english() {
		this._store.dispatch(new PlatformLanguageAction(Languages.EN));
		this._popoverCtrl.dismiss();
	}

	spanish() {
		this._store.dispatch(new PlatformLanguageAction(Languages.ES));
		this._popoverCtrl.dismiss();
	}
}
