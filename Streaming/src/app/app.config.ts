import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter }     from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes }            from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Carga ReactiveFormsModule y sus providers globalmente
    importProvidersFrom(ReactiveFormsModule),

    provideRouter(routes),
    provideHttpClient(),
  ]
};