import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header *ngIf="showHeader" (routeChange)="onRouteChange($event)"></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  showHeader = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // suscribe eventos de navegacion para mostrar u ocultar header
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.showHeader = e.urlAfterRedirects !== '/login';
      });
  }

  onRouteChange(ruta: string): void {
    // maneja menu cerrar sesion o cambio de ruta
    if (ruta === 'cerrar-sesion') {
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([`/${ruta}`]);
    }
  }
}

