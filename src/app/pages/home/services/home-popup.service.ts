import {Injectable} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController, PopoverController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {DarkThemeAction, LightThemeAction} from 'src/app/store/actions/ui.actions';
import {AppState} from 'src/app/store/app.reducer';
import {Breackpoints} from '../../../enumerators/app.enum';
import {StudioPopoverComponent} from '../../../popovers/home/studio-popover/studio-popover.component';

@Injectable({
	providedIn: 'root',
})
export class HomePopupService {
	private platformSubs: Subscription;
	private breackpoint: string;

	constructor(
		private _actionSheetCtrl: ActionSheetController,
		private _store: Store<AppState>,
		private iab: InAppBrowser,
		private _popoverCtrl: PopoverController,
	) {
		this.platformSubs = this._store.select('platform').subscribe((state) => {
			this.breackpoint = state.breakpoint;
		});
	}

	studioPopUp(studio, event) {
		if (this.breackpoint !== Breackpoints.XS) {
			this.studioPopover(studio, event);
		} else {
			this.studioActionSheet(studio);
		}
	}

	private async studioActionSheet(studio) {
		const actionSheet = await this._actionSheetCtrl.create({
			header: 'Estudio',
			buttons: [
				{
					text: 'Compartir',
					icon: 'share',
					handler: () => {
						this._store.dispatch(new DarkThemeAction());
					},
				},
				{
					text: 'Guardar',
					icon: 'heart',
					handler: () => {
						this._store.dispatch(new LightThemeAction());
					},
				},
				{
					text: 'Página web',
					icon: 'globe',
					handler: () => {
						this.iab.create('https://ionicframework.com/', '_system');
					},
				},
				{
					text: 'Perfil de instagram',
					icon: 'logo-instagram',
					cssClass: 'instagram-color',
					handler: () => {
						this.iab.create('https://www.instagram.com/eaquine/', '_system');
					},
				},
				{
					text: 'Perfil de facebook',
					icon: 'logo-facebook',
					cssClass: 'facebook-color',
					handler: () => {
						this.iab.create('https://www.facebook.com/profile.php?id=100009445921897', '_system');
					},
				},
			],
		});
		await actionSheet.present();
	}

	private async studioPopover(studio, event) {
		const popover = await this._popoverCtrl.create({
			component: StudioPopoverComponent,
			event,
			mode: 'ios',
			cssClass: 'custom-popover',
		});

		await popover.present();

		const {data} = await popover.onWillDismiss();

		if (!data) {
			return;
		}

		if (data.res === 'share') {
			this._store.dispatch(new DarkThemeAction());
		}

		if (data.res === 'save') {
			this._store.dispatch(new LightThemeAction());
		}

		if (data.res === 'webpage') {
			this.iab.create('https://ionicframework.com/', '_system');
		}

		if (data.res === 'instagram') {
			this.iab.create('https://www.instagram.com/eaquine/', '_system');
		}

		if (data.res === 'facebook') {
			this.iab.create('https://www.facebook.com/profile.php?id=100009445921897', '_system');
		}
	}

	cancelSubs() {
		this.platformSubs.unsubscribe();
	}
}
