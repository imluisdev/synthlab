import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MelodyGeneratorComponent } from './containers/melody-generator/melody-generator.component';

const routes: Routes = [
  {
    path: '',
    component: MelodyGeneratorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MelodyGeneratorRoutingModule { }
