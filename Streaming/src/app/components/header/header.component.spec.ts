import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent, Ruta } from './header.component';
import { CommonModule } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hrefSpy: jasmine.Spy<(value: string) => void>;

  beforeEach(async () => {
    // Espía el setter de window.location.href para evitar recarga real
    hrefSpy = spyOnProperty(window.location, 'href', 'set').and.callFake(() => {});

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia tener la lista de rutas definida', () => {
    expect(component.rutas.length).toBe(5);
    expect(component.rutas.map((r: Ruta) => r.id)).toContain('series');
  });

  it('deberia emitir routeChange al pulsar una ruta interna', () => {
    spyOn(component.routeChange, 'emit');
    component.navigate('peliculas');
    expect(component.routeChange.emit).toHaveBeenCalledWith('peliculas');
  });

  it('deberia hacer scroll y emitir ruta', () => {
    spyOn(window, 'scrollTo');
    spyOn(component.routeChange, 'emit');

    component.navigate('generos');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(component.routeChange.emit).toHaveBeenCalledWith('generos');
  });

  it('deberia redirigir al home al cerrar sesion sin recargar', () => {
    component.navigate('cerrar-sesion');
    expect(hrefSpy).toHaveBeenCalledWith('/');
  });
});
