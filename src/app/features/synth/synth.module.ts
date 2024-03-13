import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynthRoutingModule } from './synth-routing.module';
import { SynthComponent } from './containers/synth/synth.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    SynthComponent
  ],
  imports: [
    CommonModule,
    SynthRoutingModule,
    SharedModule
  ]
})
export class SynthModule { }
