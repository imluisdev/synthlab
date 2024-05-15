import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturesSectionComponent } from './containers/features-section/features-section.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesSectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesSectionRoutingModule { }
