import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from "@angular/material/chips";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { Project } from '../../../../shared/models/project.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatChipsModule,
    MatDialogModule,
    MatButtonModule,
    SharedModule
],
  template: `
    <h2 mat-dialog-title>Detalhes do Projeto</h2>
    <mat-dialog-content>
      <div class="project-details">
        <div class="detail-row">
          <strong>Nome:</strong>
          <span>{{ data.name }}</span>
        </div>
        
        <div class="detail-row">
          <strong>Descrição:</strong>
          <span>{{ data.description }}</span>
        </div>
        
        <div class="detail-row">
          <strong>Data de Início:</strong>
          <span>{{ data.startDate | date }}</span>
        </div>
        
        <div class="detail-row">
          <strong>Data de Término:</strong>
          <span>{{ data.endDate | date }}</span>
        </div>
        
        <div class="detail-row">
          <strong>Status:</strong>
          <mat-chip 
            [ngClass]="{
              'status-chip': true,
              'status-not-started': data.status === 'NotStarted',
              'status-in-progress': data.status === 'InProgress',
              'status-on-hold': data.status === 'OnHold',
              'status-completed': data.status === 'Completed',
              'status-cancelled': data.status === 'Cancelled'
            }"
            [color]="getStatusColor(data.status)" 
            selected>
            {{data.status | projectStatus}}
          </mat-chip>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Fechar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .project-details {
      padding: 16px;
      min-width: 300px;
    }
    
    .detail-row {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
    }
    
    .detail-row strong {
      margin-bottom: 4px;
      color: rgba(0, 0, 0, 0.6);
    }
    
    .detail-row span {
      font-size: 16px;
    }

    .status-chip {
      margin-top: 8px;
    }

    .status-not-started { background-color: #e0e0e0; }
    .status-in-progress { background-color: #2196f3; color: white; }
    .status-on-hold { background-color: #ff9800; color: white; }
    .status-completed { background-color: #4caf50; color: white; }
    .status-cancelled { background-color: #f44336; color: white; }
  `],
})
export class ProjectDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Project) {}

  getStatusColor(status: string): string {
    switch (status) {
      case 'NotStarted': return 'default';
      case 'InProgress': return 'primary';
      case 'OnHold': return 'warn';
      case 'Completed': return 'accent';
      case 'Cancelled': return 'warn';
      default: return 'default';
    }
  }
}