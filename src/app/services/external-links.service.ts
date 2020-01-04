import {Injectable} from '@angular/core';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

@Injectable({
	providedIn: 'root',
})
export class ExternalLinksService {
	constructor(private iab: InAppBrowser) {}

	openLink(url: string) {
		this.iab.create(url, '_system');
	}
}
