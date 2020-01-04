import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {
	WIDTH_DESKTOP,
	WIDTH_DESKTOP_HD,
	WIDTH_MOBILE,
	WIDTH_PHABLET,
	WIDTH_TABLET,
} from '../constants/app.const';
import {ENGLISH, SPANISH, STATE_PLATFORM} from '../constants/app.const';
import {
	PlatformHeightAction,
	PlatformNamesAction,
	PlatformWebpAction,
} from '../store/actions/platform.actions';
import {PlatformLanguageAction} from '../store/actions/platform.actions';
import {AppState} from '../store/app.reducer';
import {WebpService} from './webp.service';

@Injectable({
	providedIn: 'root',
})
export class PlatformService {
	breakpoint: string;
	language: string;

	platformSubs: Subscription;

	constructor(
		private _store: Store<AppState>,
		private _webpService: WebpService,
		public _translate: TranslateService,
	) {
		this._store.select(STATE_PLATFORM).subscribe((state) => {
			this.breakpoint = state.breakpoint;
			this.language = state.language;

			_translate.addLangs([ENGLISH, SPANISH]);
			_translate.setDefaultLang(ENGLISH);
			_translate.use(this.language);
		});
	}

	setPlatformNames(platforms) {
		const action = new PlatformNamesAction(platforms);
		this._store.dispatch(action);
	}

	setBreakpoint(width) {
		if (width < 576 && this.breakpoint !== WIDTH_MOBILE) {
			this.dispatchActionBreakpoint(WIDTH_MOBILE);
			return;
		}

		if (width >= 576 && width < 768 && this.breakpoint !== WIDTH_PHABLET) {
			this.dispatchActionBreakpoint(WIDTH_PHABLET);
			return;
		}

		if (width >= 768 && width < 992 && this.breakpoint !== WIDTH_TABLET) {
			this.dispatchActionBreakpoint(WIDTH_TABLET);
			return;
		}

		if (width >= 992 && width < 1200 && this.breakpoint !== WIDTH_DESKTOP) {
			this.dispatchActionBreakpoint(WIDTH_DESKTOP);
			return;
		}

		if (width >= 1200 && this.breakpoint !== WIDTH_DESKTOP_HD) {
			this.dispatchActionBreakpoint(WIDTH_DESKTOP_HD);
			return;
		}
	}

	dispatchActionBreakpoint(breakpoint) {
		const action = new PlatformHeightAction(breakpoint);
		this._store.dispatch(action);
	}

	async setWebpCompatibility() {
		const isWebpCompatible = await this._webpService.supportsWebp();
		const action = new PlatformWebpAction(isWebpCompatible);
		this._store.dispatch(action);
	}

	setLanguage(language) {
		if (language === SPANISH || language === ENGLISH) {
			const action = new PlatformLanguageAction(language);
			this._store.dispatch(action);
		}
	}

	unsubscribePlatform() {
		this.platformSubs.unsubscribe();
	}
}
