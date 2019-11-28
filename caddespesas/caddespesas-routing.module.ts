import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaddespesasPage } from './caddespesas.page';

const routes: Routes = [
  {
    path: '',
    component: CaddespesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaddespesasPageRoutingModule {}
