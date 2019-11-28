import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrejuizoPage } from './prejuizo.page';

const routes: Routes = [
  {
    path: '',
    component: PrejuizoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrejuizoPageRoutingModule {}
