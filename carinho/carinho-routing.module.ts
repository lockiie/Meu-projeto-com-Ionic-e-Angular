import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarinhoPage } from './carinho.page';

const routes: Routes = [
  {
    path: '',
    component: CarinhoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarinhoPageRoutingModule {}
