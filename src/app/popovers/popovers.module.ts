import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {HeaderPopoverComponent} from './app/header-popover/header-popover.component';
import {StudioPopoverComponent} from './home/studio-popover/studio-popover.component';

@NgModule({
	declarations: [StudioPopoverComponent, HeaderPopoverComponent],
	imports: [CommonModule, IonicModule, TranslateModule.forChild()],
	exports: [StudioPopoverComponent, HeaderPopoverComponent],
})
export class PopoversModule {}
