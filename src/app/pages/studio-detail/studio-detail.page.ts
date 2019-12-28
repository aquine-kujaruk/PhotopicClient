import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	OnInit,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Categories} from 'src/app/enumerators/app.enum';
import {studiosJson} from 'src/assets/tests/home';

@Component({
	selector: 'app-studio-detail',
	templateUrl: './studio-detail.page.html',
	styleUrls: ['./studio-detail.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioDetailPage implements OnInit, DoCheck {
	studio: any;
	categories = Object.values(Categories);

	constructor(
		private _route: ActivatedRoute,
		private cdRef: ChangeDetectorRef,
	) {}

	ngOnInit() {
		this.studio = studiosJson.find(
			(studio) => studio.id === Number(this._route.snapshot.paramMap.get('id')),
		);
	}

	/* To bg-image fit */
	ngDoCheck() {
		this.cdRef.detectChanges();
	}

	setImageHeight(imageContainer, data) {
		return (data.height * imageContainer.el.clientWidth) / data.width;
	}
}
