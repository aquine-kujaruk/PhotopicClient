import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppState} from 'src/app/store/app.reducer';
import {environment} from '../../environments/environment';
import {LIGHT, STATE_UI} from '../constants/app.const';
import {MapboxOutput} from '../interfaces/mapbox.interface';
import {ExternalLinksService} from './external-links.service';

@Injectable({
	providedIn: 'root',
})
export class MapboxService {
	theme: string;
	themeSubs: Subscription;

	constructor(
		private http: HttpClient,
		private _externalLinksService: ExternalLinksService,
		private _store: Store<AppState>,
	) {
		this.themeSubs = this._store.select(STATE_UI).subscribe((state) => {
			this.theme = state.theme;
		});
	}

	searchWord(query: string) {
		const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
		const header = '.json?types=place&access_token=';

		return this.http
			.get(`${url}${query}${header}${environment.mapbox.accessToken}`)
			.pipe(map((res: MapboxOutput) => res.features));
	}

	staticImage(coordinates) {
		const lon = coordinates[0];
		const lat = coordinates[1];
		const mapTheme = this.theme === LIGHT ? 'streets-v11' : 'dark-v10';
		const url = `https://api.mapbox.com/styles/v1/mapbox/${mapTheme}/static/`;
		const marker = 'pin-s+2db89c';
		const zoom = 18;
		const width = 600;
		const height = 300;

		return `${url}${marker}(${lon},${lat})/${lon},${lat},${zoom}/
				${width}x${height}?access_token=${environment.mapbox.accessToken}`;
	}

	openInGoogleMaps(coordinates) {
		const lon = coordinates[0];
		const lat = coordinates[1];
		const url = `http://maps.google.com/maps?z=18&q=${lat},${lon}`;

		this._externalLinksService.openLink(url);
	}
}
