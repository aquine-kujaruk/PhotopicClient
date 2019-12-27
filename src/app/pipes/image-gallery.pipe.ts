import {Pipe, PipeTransform} from '@angular/core';
import {ShuffleService} from '../services/shuffle.service';

@Pipe({
	name: 'imageGallery',
})
export class ImageGalleryPipe implements PipeTransform {
	constructor(private _shuffleService: ShuffleService) {}

	transform(objects: any, ...args: any[]): any {
		const newArray = this._shuffleService.shuffle(objects).reduce(
			(result: any, value) => {
				let height_1 = result[2][0];
				let height_2 = result[2][1];

				if (height_1 <= height_2) {
					result[0].push(value);
					height_1 += value.height;
					result[2][0] = height_1;
					return result;
				}

				result[1].push(value);
				height_2 += value.height;
				result[2][1] = height_2;
				return result;
			},
			[[], [], [0, 0]],
		);

		return [newArray[0], newArray[1]];
	}
}
