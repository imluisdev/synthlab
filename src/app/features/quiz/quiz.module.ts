import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuizComponent } from './components/quiz/quiz.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '../../shared/shared.module';
import { QuizLeccionComponent } from './components/quiz-leccion/quiz-leccion.component';


@NgModule({
  declarations: [
    QuizComponent,
    QuizLeccionComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MatExpansionModule,
    SharedModule,
    SkeletonModule
  ]
})
export class QuizModule { }
