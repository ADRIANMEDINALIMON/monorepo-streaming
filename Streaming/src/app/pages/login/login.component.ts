import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  loginError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    // inicializa form reactivo con validaciones
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // getters para acceso facil a controles
  get email()    { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  get emailError(): string {
    if (this.email.hasError('required')) return 'el correo es requerido';
    if (this.email.hasError('email'))    return 'el correo no es valido';
    return '';
  }
  get passwordError(): string {
    if (this.password.hasError('required'))  return 'la contrasena es requerida';
    if (this.password.hasError('minlength')) return 'minimo 6 caracteres';
    return '';
  }

  onSubmit(): void {
    // marca como enviado y resetea mensaje de error
    this.submitted = true;
    this.loginError = '';

    // si form invalido no continuar
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    // invoca servicio de auth y maneja respuesta
    this.auth.login(email, password).subscribe({
      next: res => {
        // si existe user guardarlo y navegar al home
        if (res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/home']);
        }
      },
      error: err => {
        // en error muestra mensaje recibido o default
        this.loginError = err.error?.message || 'credenciales incorrectas';
      }
    });
  }
}
