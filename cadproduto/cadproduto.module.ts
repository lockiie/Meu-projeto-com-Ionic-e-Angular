import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadprodutoPageRoutingModule } from './cadproduto-routing.module';

import { CadprodutoPage } from './cadproduto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CadprodutoPageRoutingModule

  ],
  declarations: [CadprodutoPage]
})
export class CadprodutoPageModule {}
