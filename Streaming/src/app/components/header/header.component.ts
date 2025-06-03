import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Ruta {
  id: string;
  nombre: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output() routeChange = new EventEmitter<string>();


  readonly rutas: Ruta[] = [
    { id: 'peliculas',   nombre: 'Películas' },
    { id: 'series',      nombre: 'Series'    },
    { id: 'favoritos',   nombre: 'Favoritos' },
    { id: 'generos',     nombre: 'Géneros'   },
    { id: 'cerrar-sesion', nombre: 'Cerrar Sesión' }
  ];

  constructor() {}

  navigate(route: string): void {
    if (route === 'cerrar-sesion') {
      // limpia todo el localStorage 
      localStorage.clear();
      // redirige a la ruta de login
      window.location.href = '/login';
    } else {
      window.scrollTo(0, 0);
      this.routeChange.emit(route);
    }
  }
}
