import {Component, HostListener} from '@angular/core';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AlertController, Platform} from '@ionic/angular';

import {SwUpdate, UpdateAvailableEvent} from '@angular/service-worker';
import {Theme} from './enumerators/app.enum';
import {PlatformService} from './services/platform.service';
import {ThemeService} from './services/theme.service';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private _themeService: ThemeService,
		private _platformService: PlatformService,
		private swUpdate: SwUpdate,
		private alertController: AlertController,
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this._themeService.addBodyClass(Theme.LIGHT_THEME);
			this._platformService.setBreackpoint(this.platform.width());
			this._platformService.setPlatformNames(this.platform.platforms());
			this._platformService.setWebpCompatibility();
			this.setLanguage();
			this.handleAppUpdate();
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this._platformService.setBreackpoint(event.target.innerWidth);
	}

	setLanguage() {
		if (navigator.language) {
			this._platformService.setLanguage(navigator.language.substring(0, 2));
		}
	}

	handleAppUpdate() {
		if (this.swUpdate.isEnabled) {
			this.swUpdate.available.subscribe(async (event: UpdateAvailableEvent) => {
				const alert = await this.alertController.create({
					header: `App update!`,
					message: `Newer version - v${
						(event.available.appData as any).version
					} is available.
						Change log: ${(event.available.appData as any).changelog}`,
					buttons: [
						{
							text: 'Cancel',
							role: 'cancel',
							cssClass: 'secondary',
						},
						{
							text: 'Refresh',
							handler: () => {
								window.location.reload();
							},
						},
					],
				});

				await alert.present();
			});
		}
	}
}
