import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { CardsComponent } from '../../components/cards/cards.component';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  titulo = 'Bienvenido';
  descripcion = 'Streaming';

  constructor(private tmdbService: TmdbService) {}

  // inicializa el componente
  ngOnInit() {
    this.loadMovies();
  }

  // Carga las películas populares
  loadMovies() {
    this.tmdbService.getMovies().subscribe((response) => {
      this.movies = response.results.map((movie: Movie) => ({
        ...movie,
        visible: true,
      }));
    });
  }

  // Muestra por indice
  verCard(index: number): void {
    this.movies[index].visible = true;
  }

  // Oculta la tarjeta porindice
  ocultarCard(index: number): void {
    this.movies[index].visible = false;
  }
}
