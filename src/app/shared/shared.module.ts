import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ProjectStatusPipe } from './pipes/project-status-pipe';

@NgModule({
  declarations: [
    ProjectStatusPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    ProjectStatusPipe
  ]
})
export class SharedModule { }