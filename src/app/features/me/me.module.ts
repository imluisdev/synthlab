import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeRoutingModule } from './me-routing.module';
import { MeComponent } from './containers/me/me.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MeComponent
  ],
  imports: [
    CommonModule,
    MeRoutingModule,
    SkeletonModule,
    SharedModule
  ]
})
export class MeModule { }
