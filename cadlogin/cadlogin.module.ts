import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadloginPageRoutingModule } from './cadlogin-routing.module';

import { CadloginPage } from './cadlogin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadloginPageRoutingModule
  ],
  declarations: [CadloginPage]
})
export class CadloginPageModule {}
