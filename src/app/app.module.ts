import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {SuperTabsModule} from '@ionic-super-tabs/angular';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StudioPopoverComponent} from './popovers/home/studio-popover/studio-popover.component';
import {PopoversModule} from './popovers/popovers.module';

// Ngrx
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {appReducers} from './store/app.reducer';

// Traslate
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {environment} from '../environments/environment';

// Plugins
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {HeaderPopoverComponent} from './popovers/app/header-popover/header-popover.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	declarations: [AppComponent],
	entryComponents: [StudioPopoverComponent, HeaderPopoverComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}),
		IonicModule.forRoot(),
		AppRoutingModule,
		StoreModule.forRoot(appReducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
			},
		}),
		StoreDevtoolsModule.instrument({
			maxAge: 25,
			logOnly: environment.production,
		}),
		PopoversModule,
		ServiceWorkerModule.register('main-sw.js', {
			enabled: environment.production,
		}),
		SuperTabsModule.forRoot(),
	],
	providers: [
		StatusBar,
		SplashScreen,
		InAppBrowser,
		{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
