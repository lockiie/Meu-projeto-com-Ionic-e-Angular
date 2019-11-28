import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespesasmensaisPageRoutingModule } from './despesasmensais-routing.module';

import { DespesasmensaisPage } from './despesasmensais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespesasmensaisPageRoutingModule
  ],
  declarations: [DespesasmensaisPage]
})
export class DespesasmensaisPageModule {}
