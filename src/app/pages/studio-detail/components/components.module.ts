import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import * as fromApp from 'src/app/components/components.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {DetailsComponent} from './details/details.component';
import {GalleryComponent} from './gallery/gallery.component';
import {PlansComponent} from './plans/plans.component';

@NgModule({
	declarations: [GalleryComponent, DetailsComponent, PlansComponent],
	imports: [
		CommonModule,
		IonicModule,
		TranslateModule.forChild(),
		PipesModule,
		fromApp.ComponentsModule,
	],
	exports: [GalleryComponent, DetailsComponent, PlansComponent],
})
export class ComponentsModule {}
