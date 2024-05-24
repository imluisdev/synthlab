import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { sessionGuard } from './services/guards/session.guard';

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
        path: 'me',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/me/me.module').then(m => m.MeModule)
      },
      {
        path: 'registrar',
        loadChildren: () => import('./features/registrar/registrar.module').then(m => m.RegistrarModule)
      },
      {
        path: 'teoria-musical',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/lesson/lesson.module').then(m => m.LessonModule)
      },
      {
        path: 'synth',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/synth/synth.module').then(m => m.SynthModule)
      },
      {
        path: 'quiz',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/quiz/quiz.module').then(m => m.QuizModule)
      },
      {
        path: 'sintesis-sonora',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/synth-lesson/synth-lesson.module').then(m => m.SynthLessonModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'dashboard',
        canActivate: [sessionGuard],
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'features',
        loadChildren: () => import('./features/features-section/features-section.module').then(m => m.FeaturesSectionModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
