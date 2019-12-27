import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Breackpoints, Languages} from '../enumerators/app.enum';
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
		this._store.select('platform').subscribe((state) => {
			this.breakpoint = state.breakpoint;
			this.language = state.language;

			_translate.addLangs([Languages.EN, Languages.ES]);
			_translate.setDefaultLang(Languages.EN);
			_translate.use(this.language);
		});
	}

	setPlatformNames(platforms) {
		const action = new PlatformNamesAction(platforms);
		this._store.dispatch(action);
	}

	setBreackpoint(width) {
		if (width < 576 && this.breakpoint !== Breackpoints.XS) {
			this.dispatchActionBreakpoint(Breackpoints.XS);
			return;
		}

		if (width >= 576 && width < 768 && this.breakpoint !== Breackpoints.SM) {
			this.dispatchActionBreakpoint(Breackpoints.SM);
			return;
		}

		if (width >= 768 && width < 992 && this.breakpoint !== Breackpoints.MD) {
			this.dispatchActionBreakpoint(Breackpoints.MD);
			return;
		}

		if (width >= 992 && width < 1200 && this.breakpoint !== Breackpoints.LG) {
			this.dispatchActionBreakpoint(Breackpoints.LG);
			return;
		}

		if (width >= 1200 && this.breakpoint !== Breackpoints.XL) {
			this.dispatchActionBreakpoint(Breackpoints.XL);
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
		if (language === Languages.ES || language === Languages.EN) {
			const action = new PlatformLanguageAction(language);
			this._store.dispatch(action);
		}
	}

	unsubscribePlatform() {
		this.platformSubs.unsubscribe();
	}
}
