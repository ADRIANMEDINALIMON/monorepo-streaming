import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    // formulario con validaciones
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Getter de email
  get email() {
    return this.loginForm.get('email')!;
  }

  // Getter de password
  get password() {
    return this.loginForm.get('password')!;
  }

  // mensaje de error para el email
  get emailError(): string {
    if (this.email.hasError('required')) return 'El correo es requerido.';
    if (this.email.hasError('email'))    return 'El correo no es válido.';
    return '';
  }

  // mensaje de error para la contraseña
  get passwordError(): string {
    if (this.password.hasError('required'))   return 'La contraseña es requerida.';
    if (this.password.hasError('minlength'))  return 'La contraseña debe tener al menos 6 caracteres.';
    return '';
  }

  // envío del formulario y marca como enviado
  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.simulateRedirect();
    }
  }

  // navegación a la ruta /home
  simulateRedirect(): void {
    this.router.navigate(['/home']);
  }
}
