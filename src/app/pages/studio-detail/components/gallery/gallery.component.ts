import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	Input,
	OnInit,
} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {studioGallery} from 'src/assets/tests/home';
import {ModalGalleryComponent} from '../../../../components/modal-gallery/modal-gallery.component';
import {Categories} from '../../../../enumerators/app.enum';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, DoCheck {
	@Input() studio: any;

	photoGallery = studioGallery;
	categories = Object.values(Categories);

	constructor(
		private _modalCtrl: ModalController,
		private cdRef: ChangeDetectorRef,
	) {}

	ngOnInit() {}

	/* To bg-image fit */
	ngDoCheck() {
		this.cdRef.detectChanges();
	}

	setImageHeight(imageContainer, data) {
		return (data.height * imageContainer.el.clientWidth) / data.width;
	}

	async gallery(photo: string) {
		const modal = await this._modalCtrl.create({
			component: ModalGalleryComponent,
			componentProps: {
				photo,
			},
			cssClass: 'gallery-modal',
		});

		await modal.present();
	}
}
