import {Injectable} from '@angular/core';
import {WIDTH_DESKTOP, WIDTH_DESKTOP_HD, WIDTH_PHABLET, WIDTH_TABLET} from '../constants/app.const';

@Injectable({
	providedIn: 'root',
})
export class CategoriesOptionsService {
	constructor() {}

	setSlidesOtions(breakpoint) {
		if (breakpoint === WIDTH_PHABLET || breakpoint === WIDTH_TABLET) {
			return {
				slidesPerView: 6.2,
				allowTouchMove: true,
			};
		}

		if (breakpoint === WIDTH_DESKTOP || breakpoint === WIDTH_DESKTOP_HD) {
			return {
				slidesPerView: 12.5,
				allowTouchMove: false,
			};
		}

		return {
			slidesPerView: 4.2,
			allowTouchMove: true,
		};
	}
}
