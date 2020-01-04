import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	Input,
	OnInit,
} from '@angular/core';
import {ExternalLinksService} from '../../../../services/external-links.service';
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
		public _externalLinksService: ExternalLinksService,
	) {}

	ngOnInit() {}

	/* To bg-image fit */
	ngDoCheck() {
		this.cdRef.detectChanges();
	}

	setImageHeight(imageContainer) {
		return 0.5 * imageContainer.el.clientWidth;
	}
}
