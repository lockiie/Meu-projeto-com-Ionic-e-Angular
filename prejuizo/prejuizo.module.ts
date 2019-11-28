import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrejuizoPageRoutingModule } from './prejuizo-routing.module';

import { PrejuizoPage } from './prejuizo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrejuizoPageRoutingModule
  ],
  declarations: [PrejuizoPage]
})
export class PrejuizoPageModule {}
