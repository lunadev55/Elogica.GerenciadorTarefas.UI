import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'tasks',
  //   loadChildren: () => import('./features/tasks/tasks.module').then(m => m.TasksModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: '', 
    redirectTo: 'dashboard', 
    pathMatch: 'full' 
  },
  {
    path: '**', 
    redirectTo: 'dashboard',     
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }