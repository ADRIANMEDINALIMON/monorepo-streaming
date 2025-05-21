import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TmdbService } from './tmdb.service';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { of } from 'rxjs';

describe('TmdbService', () => {
  let service: TmdbService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TmdbService,
        provideHttpClientTesting() //pruebas HttpClien
      ],
    });
    service = TestBed.inject(TmdbService);
    http = TestBed.inject(HttpClient);
  });

  // Verifica que el servicio se instancie
  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  //Simula la respuesta y que getMovies devuelva los resultados
  it('debería obtener películas populares correctamente', (done) => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Mock Movie',
        overview: 'Overview',
        backdrop_path: '/img.jpg',
        poster_path: '/poster.jpg',
        release_date: '2025-01-01',
        vote_average: 7.5,
        visible: true
      }
    ];

    spyOn(http, 'get').and.returnValue(of({ results: mockMovies }));

    service.getMovies().subscribe((res) => {
      expect(res.results.length).toBe(1);
      expect(res.results[0].title).toBe('Mock Movie');
      done(); //Finaliza prueba
      
    });
  });
});
