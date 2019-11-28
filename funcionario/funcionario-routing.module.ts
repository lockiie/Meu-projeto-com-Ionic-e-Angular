import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionarioPage } from './funcionario.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioPageRoutingModule {}
