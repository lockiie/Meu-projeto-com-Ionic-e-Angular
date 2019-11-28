import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespesasmensaisPage } from './despesasmensais.page';

const routes: Routes = [
  {
    path: '',
    component: DespesasmensaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespesasmensaisPageRoutingModule {}
