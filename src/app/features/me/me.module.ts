import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './containers/me/me.component';


@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule
  ]
})
export class MeModule { }
