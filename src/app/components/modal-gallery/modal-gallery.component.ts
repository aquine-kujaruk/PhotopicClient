import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
	selector: 'app-modal-gallery',
	templateUrl: './modal-gallery.component.html',
	styleUrls: ['./modal-gallery.component.scss'],
})
export class ModalGalleryComponent implements OnInit {
	@Input() photo;
	@ViewChild('slider', {read: ElementRef, static: true}) slider: ElementRef;

	sliderOpts = {
		zoom: {
			maxRatio: 3,
		},
	};

	constructor(private _modalCtrl: ModalController) {}

	ngOnInit() {}

	zoom(zoomIn: boolean) {
		const zoom = this.slider.nativeElement.swiper.zoom;
		if (zoomIn) {
			zoom.in();
		} else {
			zoom.out();
		}
	}

	discardModal() {
		this._modalCtrl.dismiss();
	}
}
