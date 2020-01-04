import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	Input,
	OnInit,
} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {studioGallery} from 'src/assets/tests/home';
import {ModalGalleryComponent} from '../../../../components/modal-gallery/modal-gallery.component';
import {STATE_STUDIO_DETAIL} from '../../../../constants/app.const';
import {Categories} from '../../../../enumerators/app.enum';
import {GetGallery} from '../../store/actions/gallery.action';
import {IAppState} from '../../store/studio-detail.reducer';

@Component({
	selector: 'app-gallery',
	templateUrl: './gallery.component.html',
	styleUrls: ['./gallery.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent implements OnInit, DoCheck {
	@Input() studio: any;

	photoGallery = studioGallery;
	selectedCategory: string;
	categories = Object.values(Categories).slice(0, 3);

	private gallerySubs: Subscription;

	constructor(
		private _modalCtrl: ModalController,
		private cdRef: ChangeDetectorRef,
		private _store: Store<IAppState>,
	) {}

	ngOnInit() {
		this.gallerySubs = this._store.select(STATE_STUDIO_DETAIL).subscribe((state) => {
			this.selectedCategory = state.gallery.category;
		});
	}

	slideChange(category: Categories) {
		this._store.dispatch(new GetGallery(category));
	}

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

	ngOnDestroy() {
		this.gallerySubs.unsubscribe();
	}
}
