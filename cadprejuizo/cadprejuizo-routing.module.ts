import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadprejuizoPage } from './cadprejuizo.page';

const routes: Routes = [
  {
    path: '',
    component: CadprejuizoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadprejuizoPageRoutingModule {}
