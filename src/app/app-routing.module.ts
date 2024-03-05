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
        path: 'melody-generator',
        loadChildren: () => import('./features/melody-generator/melody-generator.module').then(m => m.MelodyGeneratorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
