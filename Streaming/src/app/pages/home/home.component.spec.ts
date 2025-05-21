import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TmdbService } from '../../services/tmdb.service';
import { of } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { provideHttpClient } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tmdbServiceSpy: jasmine.SpyObj<TmdbService>;

  const mockMovies: Movie[] = [
    {
      id: 1,
      title: 'Matrix',
      overview: 'Película de ciencia ficción',
      backdrop_path: '/bg.jpg',
      poster_path: '/poster.jpg',
      release_date: '1999-03-31',
      vote_average: 8.7,
      visible: true
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TmdbService', ['getMovies']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: TmdbService, useValue: spy },
        provideHttpClient() 
      ],
      imports: [HomeComponent] 
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    tmdbServiceSpy = TestBed.inject(TmdbService) as jasmine.SpyObj<TmdbService>;

    tmdbServiceSpy.getMovies.and.returnValue(of({ results: mockMovies }));

    fixture.detectChanges(); // activa ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
