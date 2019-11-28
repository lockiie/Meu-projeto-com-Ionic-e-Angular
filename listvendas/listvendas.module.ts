import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListvendasPageRoutingModule } from './listvendas-routing.module';

import { ListvendasPage } from './listvendas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListvendasPageRoutingModule
  ],
  declarations: [ListvendasPage]
})
export class ListvendasPageModule {}
