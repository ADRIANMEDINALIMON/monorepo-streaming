import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Output() routeChange = new EventEmitter<string>();

  rutas = [
    { id: 'peliculas', nombre: 'Películas' },
    { id: 'series', nombre: 'Series' },
    { id: 'favoritos', nombre: 'Favoritos' },
    { id: 'generos', nombre: 'Géneros' }
  ];

  navigate(route: string) {
    if (route === 'cerrar-sesion') {
      window.location.href = '/';
    } else {
      window.scrollTo(0, 0);
      this.routeChange.emit(route);
    }
  }
}
