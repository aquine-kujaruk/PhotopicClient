import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, RendererFactory2} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Plugins} from '@capacitor/core';
import {Store} from '@ngrx/store';
import {NavigationBarPlugin} from 'capacitor-navigationbar';
import {Subscription} from 'rxjs';
import {DARK, LIGHT, STATE_PLATFORM, STATE_UI} from '../constants/app.const';
import {AppState} from '../store/app.reducer';

const {StatusBar} = Plugins;
const NavigationBar = Plugins.NavigationBar as NavigationBarPlugin;

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private renderer;
	private platforms: string[];

	themeSubs: Subscription;
	platformSubs: Subscription;

	constructor(
		private rendererFactory: RendererFactory2,
		@Inject(DOCUMENT) private document: Document,
		private _store: Store<AppState>,
		private meta: Meta,
	) {
		this.renderer = rendererFactory.createRenderer(null, null);

		this.themeSubs = this._store.select(STATE_UI).subscribe((state) => {
			this.removeBodyClass(state.theme);
			this.addBodyClass(state.theme);
		});

		this.platformSubs = this._store.select(STATE_PLATFORM).subscribe((state) => {
			this.platforms = state.names;
		});
	}

	addBodyClass(bodyClass) {
		this.renderer.addClass(this.document.body, bodyClass);
	}

	removeBodyClass(bodyClass) {
		if (bodyClass === LIGHT) {
			/* Browser */
			this.renderer.removeClass(this.document.body, DARK);

			/* Mobile Browser Header */
			this.meta.updateTag({name: 'theme-color', content: '#f8f8f8'});

			/* Android and PWA */
			if (this.platforms && this.platforms.includes('capacitor')) {
				StatusBar.setBackgroundColor({color: '#f8f8f8'});
				NavigationBar.setBackgroundColor({color: '#f8f8f8'});
			}
		}

		if (bodyClass === DARK) {
			/* Browser */
			this.renderer.removeClass(this.document.body, LIGHT);

			/* Mobile Browser Header */
			this.meta.updateTag({name: 'theme-color', content: '#0f1012'});

			/* Mobile and PWA */
			if (this.platforms && this.platforms.includes('capacitor')) {
				StatusBar.setBackgroundColor({color: '#0f1012'});
				NavigationBar.setBackgroundColor({color: '#0f1012'});
			}
		}
	}

	unsubscribeTheme() {
		this.themeSubs.unsubscribe();
		this.platformSubs.unsubscribe();
	}
}
