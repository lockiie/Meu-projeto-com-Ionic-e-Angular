import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadfuncionarioPageRoutingModule } from './cadfuncionario-routing.module';

import { CadfuncionarioPage } from './cadfuncionario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadfuncionarioPageRoutingModule
  ],
  declarations: [CadfuncionarioPage]
})
export class CadfuncionarioPageModule {}
