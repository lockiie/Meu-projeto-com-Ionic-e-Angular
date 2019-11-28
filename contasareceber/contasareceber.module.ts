import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContasareceberPageRoutingModule } from './contasareceber-routing.module';

import { ContasareceberPage } from './contasareceber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContasareceberPageRoutingModule
  ],
  declarations: [ContasareceberPage]
})
export class ContasareceberPageModule {}
