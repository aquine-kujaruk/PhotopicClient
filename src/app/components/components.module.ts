import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {CategoriesComponent} from './categories/categories.component';
import {HeaderComponent} from './header/header.component';
import {SearchbarComponent} from './searchbar/searchbar.component';

@NgModule({
	declarations: [HeaderComponent, SearchbarComponent, CategoriesComponent],
	imports: [CommonModule, IonicModule, TranslateModule.forChild()],
	exports: [HeaderComponent, SearchbarComponent, CategoriesComponent],
})
export class ComponentsModule {}
