import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
        pathMatch: 'full'
      },
      {
        path: 'registrar',
        loadChildren: () => import('./features/registrar/registrar.module').then(m => m.RegistrarModule)
      },
      {
        path: 'lesson',
        loadChildren: () => import('./features/lesson/lesson.module').then(m => m.LessonModule)
      },
      {
        path: 'synth',
        loadChildren: () => import('./features/synth/synth.module').then(m => m.SynthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
