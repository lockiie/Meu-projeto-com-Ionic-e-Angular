import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoxPageRoutingModule } from './box-routing.module';

import { BoxPage } from './box.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoxPageRoutingModule
  ],
  declarations: [BoxPage]
})
export class BoxPageModule {}
