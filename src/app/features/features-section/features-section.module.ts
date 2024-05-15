import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesSectionRoutingModule } from './features-section-routing.module';
import { FeaturesSectionComponent } from './containers/features-section/features-section.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    FeaturesSectionComponent
  ],
  imports: [
    CommonModule,
    FeaturesSectionRoutingModule,
    SharedModule
  ]
})
export class FeaturesSectionModule { }
