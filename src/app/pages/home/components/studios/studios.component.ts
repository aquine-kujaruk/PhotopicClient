import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {HomePopupService} from '../../services/home-popup.service';
import {AppState} from '../../store/home.reducer';
import {ModalFilterComponent} from '../modal-filter/modal-filter.component';

@Component({
	selector: 'app-studios',
	templateUrl: './studios.component.html',
	styleUrls: ['./studios.component.scss'],
})
export class StudiosComponent implements OnInit, OnDestroy {
	studiosSubs: Subscription;
	selectedCategory: string;

	constructor(
		private _homePopUpService: HomePopupService,
		private _store: Store<AppState>,
		private _modalCtrl: ModalController,
	) {
		this.studiosSubs = this._store.select('home').subscribe((state) => {
			this.selectedCategory = state.studios.category;
		});
	}

	ngOnInit() {}

	async filterSettings() {
		const modal = await this._modalCtrl.create({
			component: ModalFilterComponent,
			componentProps: {
				nombre: 'Edgar',
				apellidos: 'Aquine',
			},
			cssClass: 'info-modal',
		});

		await modal.present();

		const {data} = await modal.onDidDismiss();

		console.log(data);
	}

	ngOnDestroy() {
		this.studiosSubs.unsubscribe();
		this._homePopUpService.cancelSubs();
	}
}
