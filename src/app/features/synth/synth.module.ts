import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynthRoutingModule } from './synth-routing.module';
import { SynthComponent } from './containers/synth/synth.component';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';


@NgModule({
  declarations: [
    SynthComponent
  ],
  imports: [
    CommonModule,
    SynthRoutingModule,
    SharedModule,
    FormsModule,
    KnobModule
  ]
})
export class SynthModule { }
