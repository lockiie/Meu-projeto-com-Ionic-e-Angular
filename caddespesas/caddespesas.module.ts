import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaddespesasPageRoutingModule } from './caddespesas-routing.module';

import { CaddespesasPage } from './caddespesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CaddespesasPageRoutingModule
  ],
  declarations: [CaddespesasPage]
})
export class CaddespesasPageModule {}
