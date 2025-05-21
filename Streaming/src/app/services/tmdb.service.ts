import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Movie } from '../models/movie.model'; 

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private readonly apiKey = environment.API_KEY;
  private readonly apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  //array tipado de peliculas
  getMovies(): Observable<{ results: Movie[] }> {
    const url = `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=es-ES&page=1`;
    return this.http.get<{ results: Movie[] }>(url);
  }
}
