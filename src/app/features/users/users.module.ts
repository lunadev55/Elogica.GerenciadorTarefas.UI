import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: UserListComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'new', 
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  { 
    path: 'edit/:id', 
    component: UserFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin'] }
  }
];

@NgModule({
  declarations: [    
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }