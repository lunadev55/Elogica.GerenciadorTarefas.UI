import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ProjectListComponent },
  { 
    path: 'new', 
    component: ProjectFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'edit/:id', 
    component: ProjectFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  }
];

@NgModule({
  declarations: [
    ProjectListComponent,
    ProjectFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
})
export class ProjectsModule { }