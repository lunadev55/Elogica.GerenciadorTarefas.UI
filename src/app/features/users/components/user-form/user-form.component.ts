import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User, UserRole, UserStatus } from '../../../../shared/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditing: boolean = false;
  hidePassword: boolean = true;
  roles = Object.values(UserRole);
  statuses = Object.values(UserStatus);

  userStatuses = UserStatus;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', []],
      phone: ['', [Validators.required]],      
      userRole: this.data.userRole || UserRole.Common,
      userStatus: this.data.userStatus || UserStatus.Active
    });
  }

  ngOnInit(): void {
    if (this.data?.id) {
      this.isEditing = true;
      console.log('Editing user data:', this.data);
      this.userForm.patchValue({
        username: this.data.username,
        email: this.data.email,
        phone: this.data.phone,
        userRole: this.data.userRole,
        userStatus: this.data.userStatus
      });
      this.userForm.get('password')?.clearValidators();
    } else {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.isEditing) {
        if (!userData.password) {
          delete userData.password;
        }
        
        this.userService.updateUser(Number(this.data.id), userData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Usuário atualizado com sucesso',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Update error:', error);
            Swal.fire({
              title: 'Erro!',
              text: 'Falha ao atualizar usuário',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      } else {
        this.userService.createUser(userData).subscribe({
          next: () => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Usuário criado com sucesso',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Update error:', error);
            Swal.fire({
              title: 'Erro!',
              text: 'Falha ao criar usuário',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        });
      }
    }
  }
}