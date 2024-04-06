import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizLeccionComponent } from './components/quiz-leccion/quiz-leccion.component';

const routes: Routes = [
  {
    path: '',
    component: QuizComponent
  },
  {
    path: ':id',
    component: QuizLeccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
