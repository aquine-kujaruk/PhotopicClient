import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, RendererFactory2} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {AppState} from '../store/app.reducer';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	private renderer;

	themeSubs: Subscription;

	constructor(
		private rendererFactory: RendererFactory2,
		@Inject(DOCUMENT) private document: Document,
		private _store: Store<AppState>,
		private meta: Meta,
	) {
		this.renderer = rendererFactory.createRenderer(null, null);
		this._store.select('ui').subscribe((state) => {
			this.removeBodyClass(state.theme);
			this.addBodyClass(state.theme);
		});
	}

	addBodyClass(bodyClass) {
		this.renderer.addClass(this.document.body, bodyClass);
	}

	removeBodyClass(bodyClass) {
		if (bodyClass === 'light-theme') {
			/* Browser */
			this.renderer.removeClass(this.document.body, 'dark-theme');

			/* Mobile Browser Header */
			this.meta.updateTag({name: 'theme-color', content: '#f8f8f8'});

			/* PWA Status Bar */
			/* this.document.getElementsByTagName('link')[1].href =
				'manifest.webmanifest'; */
		}

		if (bodyClass === 'dark-theme') {
			/* Browser */
			this.renderer.removeClass(this.document.body, 'light-theme');

			/* Mobile Browser Header */
			this.meta.updateTag({name: 'theme-color', content: '#0f1012'});

			/* PWA Status Bar */
			/* this.document.getElementsByTagName('link')[0].href = 'manifest-dark.json'; */
		}
	}

	unsubscribeTheme() {
		this.themeSubs.unsubscribe();
	}
}
