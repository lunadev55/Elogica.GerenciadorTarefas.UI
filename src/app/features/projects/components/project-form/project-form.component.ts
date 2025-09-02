import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project, ProjectStatus } from '../../../../shared/models/project.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  form: FormGroup;
  
  projectStatusOptions = [
    { value: ProjectStatus.NotStarted, viewValue: 'Not Started' },
    { value: ProjectStatus.InProgress, viewValue: 'In Progress' },
    { value: ProjectStatus.OnHold, viewValue: 'On Hold' },
    { value: ProjectStatus.Completed, viewValue: 'Completed' },
    { value: ProjectStatus.Cancelled, viewValue: 'Cancelled' }
  ];
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Project>
  ) {
    this.isEditMode = !!data.id;
    
    this.form = this.fb.group({
      id: [data.id],
      name: [data.name || '', [Validators.required, Validators.minLength(3)]],
      description: [data.description || '', [Validators.required, Validators.minLength(10)]],
      startDate: [data.startDate || null, Validators.required],
      endDate: [data.endDate || null, Validators.required],
      status: [data.status || ProjectStatus.NotStarted, Validators.required]
    }, { validators: this.dateRangeValidator });
  }

  ngOnInit(): void {}

  dateRangeValidator(form: FormGroup) {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { dateRange: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;
            
      if (formValue.startDate) {
        formValue.startDate = new Date(formValue.startDate).toISOString();
      }
      if (formValue.endDate) {
        formValue.endDate = new Date(formValue.endDate).toISOString();
      }
      
      this.dialogRef.close(formValue);
    }else {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please check all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}