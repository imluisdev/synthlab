import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuizComponent } from './components/quiz/quiz.component';
import { SkeletonModule } from 'primeng/skeleton';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../../shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { QuizLeccionComponent } from './components/quiz-leccion/quiz-leccion.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuizComponent,
    QuizLeccionComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    RadioButtonModule,
    SharedModule,
    MatRadioModule,
    FormsModule,
    SkeletonModule
  ]
})
export class QuizModule { }
