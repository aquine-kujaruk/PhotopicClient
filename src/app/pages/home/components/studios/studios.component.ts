import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {HomePopupService} from '../../services/home-popup.service';
import {ModalFilterComponent} from '../modal-filter/modal-filter.component';

@Component({
	selector: 'app-studios',
	templateUrl: './studios.component.html',
	styleUrls: ['./studios.component.scss'],
})
export class StudiosComponent implements OnInit, OnDestroy {
	@Input() selectedCategory: string;

	constructor(private _homePopUpService: HomePopupService, private _modalCtrl: ModalController) {}

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
		this._homePopUpService.cancelSubs();
	}
}
