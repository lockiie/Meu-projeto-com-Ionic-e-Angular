import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VenderprodutoPage } from './venderproduto.page';

const routes: Routes = [
  {
    path: '',
    component: VenderprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VenderprodutoPageRoutingModule {}
