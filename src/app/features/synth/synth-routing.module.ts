import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SynthComponent } from './containers/synth/synth.component';

const routes: Routes = [
  {
    path: '',
    component: SynthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SynthRoutingModule { }
