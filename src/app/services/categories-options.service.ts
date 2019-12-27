import {Injectable} from '@angular/core';
import {Breackpoints} from '../enumerators/app.enum';

@Injectable({
	providedIn: 'root',
})
export class CategoriesOptionsService {
	constructor() {}

	setSlidesOtions(breackpoint) {
		if (breackpoint === Breackpoints.SM || breackpoint === Breackpoints.MD) {
			return {
				slidesPerView: 6.2,
				allowTouchMove: true,
			};
		}

		if (breackpoint === Breackpoints.LG || breackpoint === Breackpoints.XL) {
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
