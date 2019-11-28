import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadloginPage } from './cadlogin.page';

const routes: Routes = [
  {
    path: '',
    component: CadloginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadloginPageRoutingModule {}
