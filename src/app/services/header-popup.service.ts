import {Injectable} from '@angular/core';
import {ActionSheetController, PopoverController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {ENGLISH, SPANISH, STATE_PLATFORM, WIDTH_MOBILE} from '../constants/app.const';
import {HeaderPopoverComponent} from '../popovers/app/header-popover/header-popover.component';
import {PlatformLanguageAction} from '../store/actions/platform.actions';
import {AppState} from '../store/app.reducer';

@Injectable({
	providedIn: 'root',
})
export class HeaderPopupService {
	private platformSubs: Subscription;
	private breakpoint: string;

	constructor(
		private _actionSheetCtrl: ActionSheetController,
		private _store: Store<AppState>,
		private _popoverCtrl: PopoverController,
	) {
		this.platformSubs = this._store.select(STATE_PLATFORM).subscribe((state) => {
			this.breakpoint = state.breakpoint;
		});
	}

	headerPopup(isAuthenticated, event) {
		if (this.breakpoint === WIDTH_MOBILE) {
			this.headerActionSheet(isAuthenticated);
		} else {
			this.headerPopover(isAuthenticated, event);
		}
	}

	headerActionSheet(isAuthenticated) {
		if (isAuthenticated) {
			this.authUserActionSheet();
		} else {
			this.noAuthUserActionSheet();
		}
	}

	private async noAuthUserActionSheet() {
		const actionSheet = await this._actionSheetCtrl.create({
			header: 'Bienvenido',
			buttons: [
				{
					text: 'Loguéate',
					handler: () => {
						console.log('LogIn clicked');
						this._store.dispatch(new PlatformLanguageAction(ENGLISH));
					},
				},
				{
					text: 'Ajustes',
					handler: () => {
						console.log('Cancel clicked');
						this._store.dispatch(new PlatformLanguageAction(SPANISH));
					},
				},
			],
		});
		await actionSheet.present();
	}

	private async authUserActionSheet() {
		const actionSheet = await this._actionSheetCtrl.create({
			header: 'Hola, Edgar',
			buttons: [
				{
					text: 'Perfil de cliente',
					icon: 'person',
					handler: () => {
						console.log('Register clicked');
					},
				},
				{
					text: 'Perfil de estudio',
					icon: 'camera',
					handler: () => {
						console.log('LogIn clicked');
					},
				},
				{
					text: 'Ajustes',
					icon: 'settings',
					handler: () => {
						console.log('Cancel clicked');
					},
				},
			],
		});
		await actionSheet.present();
	}

	private async headerPopover(isAuthenticated, event) {
		const popover = await this._popoverCtrl.create({
			component: HeaderPopoverComponent,
			componentProps: {
				isAuthenticated,
			},
			event,
			mode: 'ios',
			cssClass: 'custom-popover',
		});

		await popover.present();
	}

	cancelSubs() {
		this.platformSubs.unsubscribe();
	}
}
