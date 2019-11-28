import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadfuncionarioPage } from './cadfuncionario.page';

const routes: Routes = [
  {
    path: '',
    component: CadfuncionarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadfuncionarioPageRoutingModule {}
