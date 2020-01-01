import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	Input,
	OnInit,
} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {MapboxService} from '../../../../services/mapbox.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, DoCheck {
	@Input() studio: any;

	constructor(
		public _mapboxService: MapboxService,
		private cdRef: ChangeDetectorRef,
		private iab: InAppBrowser,
	) {}

	ngOnInit() {}

	/* To bg-image fit */
	ngDoCheck() {
		this.cdRef.detectChanges();
	}

	setImageHeight(imageContainer) {
		return 0.5 * imageContainer.el.clientWidth;
	}

	getMapImage() {
		return this._mapboxService.staticImage(this.studio.coordinates);
	}

	openInGoogleMaps() {
		const url = `https://www.google.com/maps/@${this.studio.coordinates[1]},${this.studio.coordinates[0]},20z`;
		this.iab.create(url, '_system');
	}
}
