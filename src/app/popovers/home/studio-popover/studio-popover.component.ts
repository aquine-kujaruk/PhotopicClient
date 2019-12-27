import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';

@Component({
	selector: 'app-studio-popover',
	templateUrl: './studio-popover.component.html',
	styleUrls: ['./studio-popover.component.scss'],
})
export class StudioPopoverComponent implements OnInit {
	constructor(private _popoverCtrl: PopoverController) {}

	ngOnInit() {}

	share() {
		this._popoverCtrl.dismiss({
			res: 'share',
		});
	}

	save() {
		this._popoverCtrl.dismiss({
			res: 'save',
		});
	}

	webpage() {
		this._popoverCtrl.dismiss({
			res: 'webpage',
		});
	}

	instagramProfile() {
		this._popoverCtrl.dismiss({
			res: 'instagram',
		});
	}

	facebookProfie() {
		this._popoverCtrl.dismiss({
			res: 'facebook',
		});
	}
}
