import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, ToastService } from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-4xl font-extrabold text-white">
            Kredika Core
          </h2>
          <p class="mt-2 text-center text-sm text-indigo-100">
            Connectez-vous à votre compte partenaire
          </p>
        </div>
        <div class="mt-8 bg-white rounded-lg shadow-2xl p-8">
          <form class="space-y-6" (ngSubmit)="onSubmit()">
            @if (errorMessage()) {
              <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm text-red-800">{{ errorMessage() }}</p>
                  </div>
                </div>
              </div>
            }

            <div>
              <label for="clientId" class="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <div class="mt-1">
                <input
                  id="clientId"
                  name="clientId"
                  type="text"
                  required
                  [(ngModel)]="clientId"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Votre Client ID"
                />
              </div>
            </div>

            <div>
              <label for="clientSecret" class="block text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <div class="mt-1">
                <input
                  id="clientSecret"
                  name="clientSecret"
                  type="password"
                  required
                  [(ngModel)]="clientSecret"
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Votre Client Secret"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="loading()"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                @if (loading()) {
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                } @else {
                  <span>Se connecter</span>
                }
              </button>
            </div>
          </form>

          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Nouveau partenaire?</span>
              </div>
            </div>

            <div class="mt-6 text-center">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                Contactez-nous pour créer un compte
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);

  clientId = '';
  clientSecret = '';
  loading = signal(false);
  errorMessage = signal('');

  onSubmit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.authService.authenticate({
      clientId: this.clientId,
      clientSecret: this.clientSecret
    }).subscribe({
      next: (response) => {
        if (response.success && response.accessToken) {
          this.authService.saveToken(response.accessToken);
          this.toastService.success('Connexion réussie');
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage.set(response.message || 'Authentification échouée');
          this.toastService.error('Authentification échouée');
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Erreur de connexion. Vérifiez vos identifiants.');
        this.toastService.error('Erreur de connexion');
        this.loading.set(false);
      }
    });
  }
}
