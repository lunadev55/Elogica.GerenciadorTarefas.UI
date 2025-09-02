import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;        
    this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.loading = false;
          
          if (error.error?.message?.includes('Invalid credentials') || 
              error.error?.includes('UnauthorizedAccessException')) {
            Swal.fire({
              icon: 'error',
              title: 'Acesso Negado',
              text: 'Email ou senha inválidos. Por favor, tente novamente.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3f51b5'
            }).then(() => {
              this.loginForm.reset();
              this.loginForm.get('email')?.setValue('');
              this.loginForm.get('password')?.setValue('');
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erro',
              text: 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#3f51b5'
            });
          }
        }
      });
  }
}