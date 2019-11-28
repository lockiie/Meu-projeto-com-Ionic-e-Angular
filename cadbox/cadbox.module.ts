import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadboxPageRoutingModule } from './cadbox-routing.module';

import { CadboxPage } from './cadbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CadboxPageRoutingModule
  ],
  declarations: [CadboxPage]
})
export class CadboxPageModule {}
