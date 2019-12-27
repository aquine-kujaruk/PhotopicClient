import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
	name: 'imageUrlToBase64',
})
export class ImageUrlToBase64Pipe implements PipeTransform {
	constructor(private domSanitizer: DomSanitizer) {}

	async transform(image: string, ...args: any[]): Promise<any> {
		const response = await this.getBase64ImageFromUrl(image)
			.then((res: string) => {
				const mimeType = res.split(',')[1][0];

				if (mimeType === '/' || mimeType === 'i' || mimeType === 'U') {
					return res;
				}

				return '';
			})
			.catch((err) => {
				return '';
			});

		const domImg = `url('${response}')`;
		return this.domSanitizer.bypassSecurityTrustStyle(domImg);
	}

	async getBase64ImageFromUrl(imageUrl) {
		const res = await fetch(imageUrl);
		const blob = await res.blob();

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.addEventListener(
				'load',
				/* function */ () => {
					resolve(reader.result);
				},
				false,
			);

			reader.onerror = () => {
				return reject(this);
			};
			reader.readAsDataURL(blob);
		});
	}
}
