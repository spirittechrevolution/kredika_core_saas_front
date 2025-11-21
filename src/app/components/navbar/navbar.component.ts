import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-white shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a routerLink="/" class="text-2xl font-bold text-indigo-600">Kredika</a>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                routerLink="/"
                routerLinkActive="border-indigo-500 text-gray-900"
                [routerLinkActiveOptions]="{ exact: true }"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Accueil
              </a>
              @if (isAuthenticated()) {
                <a
                  routerLink="/dashboard"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Tableau de Bord
                </a>
                <a
                  routerLink="/partenaires"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Partenaires
                </a>
                <a
                  routerLink="/reservations"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Réservations
                </a>
                <a
                  routerLink="/echeances"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Échéances
                </a>
                <a
                  routerLink="/instructions"
                  routerLinkActive="border-indigo-500 text-gray-900"
                  class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Instructions
                </a>
              }
            </div>
          </div>
          <div class="flex items-center">
            @if (isAuthenticated()) {
              <button
                (click)="logout()"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Déconnexion
              </button>
            } @else {
              <a
                routerLink="/login"
                class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Connexion
              </a>
            }
          </div>
          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button
              type="button"
              (click)="mobileMenuOpen = !mobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <!-- Icon when menu is closed -->
              @if (!mobileMenuOpen) {
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
              <!-- Icon when menu is open -->
              @if (mobileMenuOpen) {
                <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (mobileMenuOpen) {
        <div class="sm:hidden">
          <div class="pt-2 pb-3 space-y-1">
            <a
              routerLink="/"
              (click)="mobileMenuOpen = false"
              routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
              [routerLinkActiveOptions]="{ exact: true }"
              class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Accueil
            </a>
            @if (isAuthenticated()) {
              <a
                routerLink="/dashboard"
                (click)="mobileMenuOpen = false"
                routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
                class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Tableau de Bord
              </a>
              <a
                routerLink="/partenaires"
                (click)="mobileMenuOpen = false"
                routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
                class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Partenaires
              </a>
              <a
                routerLink="/reservations"
                (click)="mobileMenuOpen = false"
                routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
                class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Réservations
              </a>
              <a
                routerLink="/echeances"
                (click)="mobileMenuOpen = false"
                routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
                class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Échéances
              </a>
              <a
                routerLink="/instructions"
                (click)="mobileMenuOpen = false"
                routerLinkActive="bg-indigo-50 border-indigo-500 text-indigo-700"
                class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Instructions
              </a>
              <button
                (click)="logout()"
                class="w-full text-left border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Déconnexion
              </button>
            }
          </div>
        </div>
      }
    </nav>
  `
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  mobileMenuOpen = false;

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.removeToken();
    this.mobileMenuOpen = false;
    this.router.navigate(['/login']);
  }
}
