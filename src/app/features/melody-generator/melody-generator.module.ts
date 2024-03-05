import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MelodyGeneratorRoutingModule } from './melody-generator-routing.module';
import { MelodyGeneratorComponent } from './containers/melody-generator/melody-generator.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MelodyGeneratorComponent
  ],
  imports: [
    CommonModule,
    MelodyGeneratorRoutingModule,
    SharedModule
  ]
})
export class MelodyGeneratorModule { }
