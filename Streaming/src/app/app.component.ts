import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'brujito';

  titulo = 'Bienvenido';
  descripcion = 'Streaming';
  
  cambiarVista(ruta: string) {
    switch (ruta) {
      case 'peliculas':
        this.titulo = 'Películas';
        this.descripcion = 'No existe vista películas';
        break;
      case 'series':
        this.titulo = 'Series';
        this.descripcion = 'Aquí van las series';
        break;
      case 'favoritos':
        this.titulo = 'Favoritos';
        this.descripcion = 'Tu lista de favoritos';
        break;
      case 'generos':
        this.titulo = 'Géneros';
        this.descripcion = 'Pues los géneros';
        break;
      default:
        this.titulo = 'Bienvenido';
        this.descripcion = 'Streaming';
    }
  }
  
}
