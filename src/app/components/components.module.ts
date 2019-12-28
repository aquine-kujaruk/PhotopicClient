import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from '../pipes/pipes.module';
import {CategoriesComponent} from './categories/categories.component';
import {HeaderComponent} from './header/header.component';
import {ModalGalleryComponent} from './modal-gallery/modal-gallery.component';
import {SearchbarComponent} from './searchbar/searchbar.component';

@NgModule({
	entryComponents: [ModalGalleryComponent],
	declarations: [
		HeaderComponent,
		SearchbarComponent,
		CategoriesComponent,
		ModalGalleryComponent,
	],
	imports: [CommonModule, IonicModule, TranslateModule.forChild(), PipesModule],
	exports: [HeaderComponent, SearchbarComponent, CategoriesComponent],
})
export class ComponentsModule {}
