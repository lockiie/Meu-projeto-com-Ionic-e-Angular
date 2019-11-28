import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadprodutoPage } from './cadproduto.page';

const routes: Routes = [
  {
    path: '',
    component: CadprodutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadprodutoPageRoutingModule {}
