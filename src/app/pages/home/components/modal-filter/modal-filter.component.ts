import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Feature} from 'src/app/interfaces/mapbox.interface';
import {MapboxService} from 'src/app/services/mapbox.service';
import {environment} from '../../../../../environments/environment';

declare var mapboxgl: any;

@Component({
	selector: 'app-modal-filter',
	templateUrl: './modal-filter.component.html',
	styleUrls: ['./modal-filter.component.scss'],
})
export class ModalFilterComponent implements OnInit, AfterViewInit {
	@Input() nombre;
	@Input() apellidos;

	addresses: Feature[] = [];
	selectedAddress = null;
	onSelectEvent = false;

	constructor(
		private _modalCtrl: ModalController,
		private _mapboxService: MapboxService,
	) {}

	ngOnInit() {}

	ngAfterViewInit() {
		this.loadMap([-74.5, 40]);
	}

	loadMap(actualCenter: number[]) {
		mapboxgl.accessToken = environment.mapbox.accessToken;
		const map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/streets-v11',
			center: actualCenter,
			zoom: 15,
		});

		map.on('load', () => {
			map.resize();

			new mapboxgl.Marker().setLngLat(actualCenter).addTo(map);
		});
	}

	onSearchChange(event) {
		if (this.onSelectEvent) {
			this.onSelectEvent = false;
			return;
		}

		const searchTerm = event.target.value.toLowerCase();
		if (searchTerm && searchTerm.length > 0) {
			this._mapboxService
				.searchWord(searchTerm)
				.subscribe((features: Feature[]) => {
					this.addresses = features.map((feat) => {
						return {
							place_name: feat.place_name,
							center: feat.center,
							context: feat.context,
						};
					});
				});
		} else {
			this.addresses = [];
		}
	}

	onSelect(address: Feature) {
		this.loadMap(address.center);
		this.selectedAddress = address.place_name;
		console.log(address);

		this.addresses = [];
		this.onSelectEvent = true;
	}

	discardModal() {
		this._modalCtrl.dismiss();
	}

	setFilters() {
		this._modalCtrl.dismiss({
			nombre: 'Adriana',
			apellidos: 'Ulloa',
		});
	}
}
