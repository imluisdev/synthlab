import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonComponent } from './containers/lesson/lesson.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LessonComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LessonModule {
    
}
