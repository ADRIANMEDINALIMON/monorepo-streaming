import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('formulario invalido cuando esta vacio', () => {
    expect(component.loginForm.valid).toBeFalse();
  });

  it('muestra mensaje correo requerido cuando tocado y vacio', () => {
    component.submitted = true;
    fixture.detectChanges();
    const msg = fixture.nativeElement.querySelector('#email + .invalid-feedback').textContent;
    expect(msg).toContain('El correo es requerido.');
  });

  it('deshabilita boton submit si formulario invalido', () => {
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeTrue();
  });

  it('habilita boton submit si formulario valido', () => {
    component.loginForm.setValue({ email: 'a@b.com', password: '123456' });
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn.disabled).toBeFalse();
  });

});
