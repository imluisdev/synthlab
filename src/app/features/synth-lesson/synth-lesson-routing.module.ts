import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SynthLessonComponent } from './containers/synth-lesson/synth-lesson.component';

const routes: Routes = [
  {
    path: '',
    component: SynthLessonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SynthLessonRoutingModule { }
