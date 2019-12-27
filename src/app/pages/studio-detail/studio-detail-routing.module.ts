import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudioDetailPage } from './studio-detail.page';

const routes: Routes = [
  {
    path: '',
    component: StudioDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudioDetailPageRoutingModule {}
