import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {MapboxOutput} from '../interfaces/mapbox.interface';

@Injectable({
	providedIn: 'root',
})
export class MapboxService {
	constructor(private http: HttpClient) {}

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
		const url = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/';
		const marker = 'pin-s+2db89c';
		const zoom = 18;
		const width = 400;
		const height = 200;

		return `${url}${marker}(${lon},${lat})/${lon},${lat},${zoom}/
				${width}x${height}?access_token=${environment.mapbox.accessToken}`;
	}
}
