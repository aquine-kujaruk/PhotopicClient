import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ShuffleService {
	constructor() {}

	shuffle(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
}
