import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import * as fromApp from 'src/app/components/components.module';
import {PipesModule} from '../../../pipes/pipes.module';
import {DetailsComponent} from './details/details.component';
import {GalleryComponent} from './gallery/gallery.component';

@NgModule({
	declarations: [GalleryComponent, DetailsComponent],
	imports: [
		CommonModule,
		IonicModule,
		TranslateModule.forChild(),
		PipesModule,
		fromApp.ComponentsModule,
	],
	exports: [GalleryComponent, DetailsComponent],
})
export class ComponentsModule {}
