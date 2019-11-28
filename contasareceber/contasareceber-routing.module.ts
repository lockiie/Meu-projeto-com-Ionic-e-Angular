import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContasareceberPage } from './contasareceber.page';

const routes: Routes = [
  {
    path: '',
    component: ContasareceberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContasareceberPageRoutingModule {}
