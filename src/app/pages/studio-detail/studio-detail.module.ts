import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {HidenavModule} from 'ionic4-hidenav';

import {SuperTabsModule} from '@ionic-super-tabs/angular';
import * as fromApp from 'src/app/components/components.module';
import * as fromStudioDetails from 'src/app/pages/studio-detail/components/components.module';
import {PipesModule} from '../../pipes/pipes.module';
import {StudioDetailPageRoutingModule} from './studio-detail-routing.module';

import {StudioDetailPage} from './studio-detail.page';

// Store
import {StoreModule} from '@ngrx/store';
import {STATE_STUDIO_DETAIL} from '../../constants/app.const';
import {studioDetailReducers} from './store/studio-detail.reducer';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		StoreModule.forFeature(STATE_STUDIO_DETAIL, studioDetailReducers),
		StudioDetailPageRoutingModule,
		fromApp.ComponentsModule,
		fromStudioDetails.ComponentsModule,
		PipesModule,
		HidenavModule,
		SuperTabsModule,
	],
	declarations: [StudioDetailPage],
})
export class StudioDetailPageModule {}
