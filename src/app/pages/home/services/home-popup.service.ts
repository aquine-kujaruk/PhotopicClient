import {Injectable} from '@angular/core';
import {ActionSheetController, PopoverController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {DarkThemeAction, LightThemeAction} from 'src/app/store/actions/ui.actions';
import {AppState} from 'src/app/store/app.reducer';
import {STATE_PLATFORM, WIDTH_MOBILE} from '../../../constants/app.const';
import {StudioPopoverComponent} from '../../../popovers/home/studio-popover/studio-popover.component';
import {ExternalLinksService} from '../../../services/external-links.service';

@Injectable({
	providedIn: 'root',
})
export class HomePopupService {
	private platformSubs: Subscription;
	private breakpoint: string;

	constructor(
		private _actionSheetCtrl: ActionSheetController,
		private _store: Store<AppState>,
		private _externalLinksService: ExternalLinksService,
		private _popoverCtrl: PopoverController,
	) {
		this.platformSubs = this._store.select(STATE_PLATFORM).subscribe((state) => {
			this.breakpoint = state.breakpoint;
		});
	}

	studioPopUp(studio, event) {
		if (this.breakpoint !== WIDTH_MOBILE) {
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
						this._externalLinksService.openLink(studio.webpage);
					},
				},
				{
					text: 'Perfil de instagram',
					icon: 'logo-instagram',
					cssClass: 'instagram-color',
					handler: () => {
						this._externalLinksService.openLink(studio.instagramProfile);
					},
				},
				{
					text: 'Perfil de facebook',
					icon: 'logo-facebook',
					cssClass: 'facebook-color',
					handler: () => {
						this._externalLinksService.openLink(studio.facebookProfile);
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
			this._externalLinksService.openLink(studio.webpage);
		}

		if (data.res === 'instagram') {
			this._externalLinksService.openLink(studio.instagramProfile);
		}

		if (data.res === 'facebook') {
			this._externalLinksService.openLink(studio.facebookProfile);
		}
	}

	cancelSubs() {
		this.platformSubs.unsubscribe();
	}
}
