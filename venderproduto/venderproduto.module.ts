import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VenderprodutoPageRoutingModule } from './venderproduto-routing.module';

import { VenderprodutoPage } from './venderproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VenderprodutoPageRoutingModule
  ],
  declarations: [VenderprodutoPage]
})
export class VenderprodutoPageModule {}
