import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SynthLessonRoutingModule } from './synth-lesson-routing.module';
import { SynthLessonComponent } from './containers/synth-lesson/synth-lesson.component';
import { SharedModule } from '../../shared/shared.module';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SynthLessonComponent
  ],
  imports: [
    CommonModule,
    SynthLessonRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class SynthLessonModule { }
