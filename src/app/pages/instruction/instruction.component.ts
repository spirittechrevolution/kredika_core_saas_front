import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, FooterComponent } from '../../components';

@Component({
  selector: 'app-instruction',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">Instructions de Paiement</h1>
                <p class="mt-2 text-sm text-gray-600">
                  Générez et gérez vos instructions de paiement (QR codes, liens, virements)
                </p>
              </div>
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Générer une instruction
              </button>
            </div>
          </div>

          <div class="px-4 sm:px-0 mt-6">
            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
              <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Fonctionnalités
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Gérez vos instructions de paiement
                </p>
              </div>
              <div class="border-t border-gray-200 px-4 py-5 sm:p-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div class="bg-gray-50 rounded-lg p-6">
                    <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">QR Codes</h3>
                    <p class="text-gray-600">
                      Générez des QR codes pour les paiements mobiles
                    </p>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-6">
                    <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Liens de paiement</h3>
                    <p class="text-gray-600">
                      Créez des liens de paiement sécurisés
                    </p>
                  </div>

                  <div class="bg-gray-50 rounded-lg p-6">
                    <div class="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Virements bancaires</h3>
                    <p class="text-gray-600">
                      Instructions de virement bancaire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class InstructionComponent {}
