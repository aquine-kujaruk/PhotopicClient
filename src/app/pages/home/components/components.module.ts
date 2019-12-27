import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {PipesModule} from 'src/app/pipes/pipes.module';
import {ModalFilterComponent} from './modal-filter/modal-filter.component';
import {StudioComponent} from './studio/studio.component';
import {StudiosComponent} from './studios/studios.component';

@NgModule({
	entryComponents: [ModalFilterComponent],
	declarations: [StudiosComponent, StudioComponent, ModalFilterComponent],
	imports: [
		CommonModule,
		IonicModule,
		TranslateModule.forChild(),
		FormsModule,
		PipesModule,
	],
	exports: [StudiosComponent],
})
export class ComponentsModule {}
