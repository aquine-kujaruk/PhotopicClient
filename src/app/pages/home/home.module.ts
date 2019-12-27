import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {HidenavModule} from 'ionic4-hidenav';

import * as fromApp from 'src/app/components/components.module';
import * as fromHome from './components/components.module';
import {HomePageRoutingModule} from './home-routing.module';
import {HomePage} from './home.page';

// Traslate

import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

// Store
import {StoreModule} from '@ngrx/store';
import {homeReducers} from './store/home.reducer';
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/-', '.json');
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TranslateModule.forChild({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		StoreModule.forFeature('home', homeReducers),
		fromHome.ComponentsModule,
		fromApp.ComponentsModule,
		HidenavModule,
		HomePageRoutingModule,
	],
	declarations: [HomePage],
})
export class HomePageModule {}
