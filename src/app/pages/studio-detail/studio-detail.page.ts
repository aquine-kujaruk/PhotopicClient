import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {studiosJson} from 'src/assets/tests/home';

@Component({
	selector: 'app-studio-detail',
	templateUrl: './studio-detail.page.html',
	styleUrls: ['./studio-detail.page.scss'],
})
export class StudioDetailPage implements OnInit {
	studio: any;

	constructor(private _route: ActivatedRoute) {}

	ngOnInit() {
		this.studio = studiosJson.find(
			(studio) => studio.id === Number(this._route.snapshot.paramMap.get('id')),
		);
	}
}
