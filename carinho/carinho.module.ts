import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarinhoPageRoutingModule } from './carinho-routing.module';

import { CarinhoPage } from './carinho.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CarinhoPageRoutingModule
  ],
  declarations: [CarinhoPage]
})
export class CarinhoPageModule {}
