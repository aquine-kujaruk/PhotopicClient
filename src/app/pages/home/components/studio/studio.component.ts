import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	DoCheck,
	OnInit,
} from '@angular/core';
import {Router} from '@angular/router';
import {studiosJson} from 'src/assets/tests/home';
import {HomePopupService} from '../../services/home-popup.service';

@Component({
	selector: 'app-studio',
	templateUrl: './studio.component.html',
	styleUrls: ['./studio.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioComponent implements OnInit, DoCheck {
	studios = studiosJson;

	constructor(
		private _homePopUpService: HomePopupService,
		private _router: Router,
		private cdRef: ChangeDetectorRef,
	) {}

	ngOnInit() {}

	/* To bg-image fit */
	ngDoCheck() {
		this.cdRef.detectChanges();
	}

	setImageHeight(imageContainer, data) {
		return (data.height * imageContainer.el.clientWidth) / data.width;
	}

	presentPopUp(studio, event) {
		this._homePopUpService.studioPopUp(studio, event);
	}

	studioDetails(id) {
		const myurl = `studio/${id}`;
		this._router.navigateByUrl(myurl);
	}
}
