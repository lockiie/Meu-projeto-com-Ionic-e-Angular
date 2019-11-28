import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadprejuizoPageRoutingModule } from './cadprejuizo-routing.module';

import { CadprejuizoPage } from './cadprejuizo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadprejuizoPageRoutingModule
  ],
  declarations: [CadprejuizoPage]
})
export class CadprejuizoPageModule {}
