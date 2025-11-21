import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col">
      <app-navbar />

      <main class="flex-grow">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h1 class="text-4xl md:text-6xl font-extrabold mb-6">
                Kredika Core
              </h1>
              <p class="text-xl md:text-2xl mb-8 text-indigo-100">
                Solution de crédit moderne et flexible pour vos partenaires commerciaux
              </p>
              <div class="flex justify-center gap-4">
                <a
                  routerLink="/login"
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10"
                >
                  Commencer
                </a>
                <a
                  href="#features"
                  class="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div id="features" class="py-16 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
              <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Fonctionnalités principales
              </h2>
              <p class="mt-4 text-xl text-gray-600">
                Tout ce dont vous avez besoin pour gérer vos crédits
              </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Tableau de Bord</h3>
                <p class="text-gray-600">
                  Visualisez vos statistiques en temps réel : réservations, volume, défauts et activités récentes.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion des Partenaires</h3>
                <p class="text-gray-600">
                  Configurez vos partenaires avec des limites de crédit, taux de commission et clés API.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Réservations de Crédit</h3>
                <p class="text-gray-600">
                  Créez et gérez les réservations de crédit avec calcul automatique des échéances.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion des Échéances</h3>
                <p class="text-gray-600">
                  Suivez toutes les échéances de paiement et simulez les paiements à travers les réservations.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Instructions de Paiement</h3>
                <p class="text-gray-600">
                  Générez et gérez les instructions de paiement avec QR codes et liens de paiement.
                </p>
              </div>

              <div class="bg-gray-50 rounded-lg p-6">
                <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">Sécurité</h3>
                <p class="text-gray-600">
                  Authentification sécurisée avec gestion des clés API et tokens d'accès.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="bg-indigo-600">
          <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span class="block">Prêt à commencer?</span>
              <span class="block text-indigo-200">Connectez-vous dès maintenant.</span>
            </h2>
            <div class="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div class="inline-flex rounded-md shadow">
                <a
                  routerLink="/login"
                  class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Se connecter
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class HomeComponent {}
