import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, FooterComponent } from '../../components';

interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: string;
  response?: string;
  category: string;
}

@Component({
  selector: 'app-developers',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <!-- Header -->
        <div class="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4">
              Documentation API Partenaires
            </h1>
            <p class="text-xl text-gray-300 max-w-3xl">
              Intégrez Kredika Core en quelques heures avec notre API REST complète et sécurisée
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <div class="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm">Base URL: <code class="text-indigo-400">http://localhost:7575/api</code></span>
              </div>
              <div class="flex items-center bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700">
                <svg class="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span class="text-sm">OpenAPI 3.1</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav class="flex -mb-px space-x-8 overflow-x-auto">
              <button
                *ngFor="let tab of tabs"
                (click)="activeTab = tab.id"
                [class.border-indigo-500]="activeTab === tab.id"
                [class.text-indigo-600]="activeTab === tab.id"
                [class.border-transparent]="activeTab !== tab.id"
                [class.text-gray-500]="activeTab !== tab.id"
                class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm hover:text-gray-700 hover:border-gray-300 transition-colors"
              >
                {{ tab.label }}
              </button>
            </nav>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <!-- Authentication Tab -->
          <div *ngIf="activeTab === 'auth'" class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Authentification</h2>
              <p class="text-lg text-gray-600 mb-6">
                L'API Kredika utilise un système d'authentification basé sur des clés API pour sécuriser tous les accès.
              </p>
            </div>

            <!-- Authentication Method -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Méthode d'authentification</h3>
              <p class="text-gray-600 mb-4">
                Vous devez inclure vos clés API dans les en-têtes de chaque requête :
              </p>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm text-green-400"><code>X-Partner-Key: pk_your_partner_key
X-API-Key: sk_live_your_api_key</code></pre>
              </div>
            </div>

            <!-- Login Endpoint -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <div class="flex items-center">
                  <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-md mr-3">POST</span>
                  <code class="text-white font-mono text-sm">/v1/auth/token</code>
                </div>
                <p class="text-indigo-100 mt-2 text-sm">Authentifier un partenaire et obtenir un token d'accès</p>
              </div>
              <div class="p-6">
                <h4 class="font-semibold text-gray-900 mb-3">Requête</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                  <pre class="text-sm text-green-400"><code>{{ authRequestExample }}</code></pre>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">Réponse (200 OK)</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm text-blue-400"><code>{{ authResponseExample }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Reservations Tab -->
          <div *ngIf="activeTab === 'reservations'" class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Réservations de Crédit</h2>
              <p class="text-lg text-gray-600 mb-6">
                Créez et gérez les réservations de crédit pour vos clients. Chaque réservation génère automatiquement un plan d'échéances.
              </p>
            </div>

            <!-- Create Reservation -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                <div class="flex items-center">
                  <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-md mr-3">POST</span>
                  <code class="text-white font-mono text-sm">/v1/credits/reservations</code>
                </div>
                <p class="text-green-100 mt-2 text-sm">Créer une nouvelle réservation de crédit</p>
              </div>
              <div class="p-6">
                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <p class="text-sm text-yellow-700">
                        <strong>Important:</strong> Le partnerId doit correspondre au partenaire authentifié.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">Requête</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                  <pre class="text-sm text-green-400"><code>{{ createReservationRequest }}</code></pre>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">Réponse (201 Created)</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm text-blue-400"><code>{{ createReservationResponse }}</code></pre>
                </div>
              </div>
            </div>

            <!-- List Reservations -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div class="flex items-center">
                  <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-md mr-3">GET</span>
                  <code class="text-white font-mono text-sm">/v1/credits/reservations</code>
                </div>
                <p class="text-blue-100 mt-2 text-sm">Lister toutes vos réservations avec filtre optionnel par statut</p>
              </div>
              <div class="p-6">
                <h4 class="font-semibold text-gray-900 mb-3">Paramètres optionnels</h4>
                <ul class="list-disc list-inside text-gray-600 mb-4 space-y-1">
                  <li><code class="text-sm bg-gray-100 px-2 py-1 rounded">status</code> - RESERVED, ACTIVE, COMPLETED, CANCELLED, DEFAULTED</li>
                </ul>

                <h4 class="font-semibold text-gray-900 mb-3">Exemple de réponse</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm text-blue-400"><code>{{ listReservationsResponse }}</code></pre>
                </div>
              </div>
            </div>

            <!-- Get Reservation Stats -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-4">
                <div class="flex items-center">
                  <span class="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-md mr-3">GET</span>
                  <code class="text-white font-mono text-sm">/v1/credits/reservations/stats</code>
                </div>
                <p class="text-purple-100 mt-2 text-sm">Statistiques de vos réservations</p>
              </div>
              <div class="p-6">
                <h4 class="font-semibold text-gray-900 mb-3">Réponse</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm text-blue-400"><code>{{ reservationStatsResponse }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Instructions Tab -->
          <div *ngIf="activeTab === 'instructions'" class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Instructions de Paiement</h2>
              <p class="text-lg text-gray-600 mb-6">
                Générez des instructions de paiement enrichies avec toutes les méthodes configurées (Wave, Orange Money, virements, espèces).
              </p>
            </div>

            <!-- Generate Instruction -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div class="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4">
                <div class="flex items-center">
                  <span class="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-md mr-3">POST</span>
                  <code class="text-white font-mono text-sm">/v1/payment-instructions</code>
                </div>
                <p class="text-orange-100 mt-2 text-sm">Générer une instruction de paiement enrichie pour une échéance</p>
              </div>
              <div class="p-6">
                <h4 class="font-semibold text-gray-900 mb-3">Requête</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                  <pre class="text-sm text-green-400"><code>{{ paymentInstructionRequest }}</code></pre>
                </div>

                <h4 class="font-semibold text-gray-900 mb-3">Réponse (201 Created)</h4>
                <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre class="text-sm text-blue-400"><code>{{ paymentInstructionResponse }}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Best Practices Tab -->
          <div *ngIf="activeTab === 'best-practices'" class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Bonnes Pratiques</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 class="font-bold text-green-900 mb-2">Sécurité</h3>
                    <ul class="text-sm text-green-800 space-y-1">
                      <li>• Ne jamais exposer vos clés API côté client</li>
                      <li>• Utilisez HTTPS pour toutes les requêtes</li>
                      <li>• Stockez les clés dans des variables d'environnement</li>
                      <li>• Régénérez vos clés périodiquement</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div>
                    <h3 class="font-bold text-blue-900 mb-2">Performance</h3>
                    <ul class="text-sm text-blue-800 space-y-1">
                      <li>• Utilisez la pagination pour les listes longues</li>
                      <li>• Filtrez par statut pour réduire la charge</li>
                      <li>• Mettez en cache les réponses quand possible</li>
                      <li>• Respectez les limites de rate limiting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-purple-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <div>
                    <h3 class="font-bold text-purple-900 mb-2">Webhooks</h3>
                    <ul class="text-sm text-purple-800 space-y-1">
                      <li>• Configurez une URL HTTPS pour recevoir les webhooks</li>
                      <li>• Validez la signature des webhooks</li>
                      <li>• Répondez rapidement (< 5 secondes)</li>
                      <li>• Gérez les retries en cas d'échec</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6">
                <div class="flex items-start">
                  <svg class="w-6 h-6 text-orange-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 class="font-bold text-orange-900 mb-2">Gestion d'erreurs</h3>
                    <ul class="text-sm text-orange-800 space-y-1">
                      <li>• Vérifiez toujours les codes de statut HTTP</li>
                      <li>• Loggez les erreurs avec détails</li>
                      <li>• Implémentez une logique de retry</li>
                      <li>• Gérez les timeouts appropriés</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Code Example -->
            <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">Exemple d'intégration (Node.js)</h3>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre class="text-sm text-green-400"><code>{{ nodeExample }}</code></pre>
              </div>
            </div>
          </div>

          <!-- Support Tab -->
          <div *ngIf="activeTab === 'support'" class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold text-gray-900 mb-4">Support & Ressources</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 class="ml-4 text-lg font-semibold text-gray-900">Documentation OpenAPI</h3>
                </div>
                <p class="text-gray-600 mb-4">Explorez la documentation interactive complète avec Swagger UI</p>
                <a href="http://localhost:7575/swagger-ui" target="_blank" class="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                  Accéder à Swagger UI
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="ml-4 text-lg font-semibold text-gray-900">Support Technique</h3>
                </div>
                <p class="text-gray-600 mb-4">Une question ? Contactez notre équipe technique</p>
                <a href="mailto:dev@kredika.sn" class="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                  dev&#64;kredika.sn
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 class="ml-4 text-lg font-semibold text-gray-900">État des Services</h3>
                </div>
                <p class="text-gray-600 mb-4">Vérifiez l'état en temps réel de nos services</p>
                <a href="http://localhost:7575/api/health" target="_blank" class="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                  Status Page
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div class="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <div class="flex items-center mb-4">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 class="ml-4 text-lg font-semibold text-gray-900">Guides & Tutoriels</h3>
                </div>
                <p class="text-gray-600 mb-4">Apprenez à intégrer Kredika pas à pas</p>
                <div class="space-y-2">
                  <a href="#" class="block text-orange-600 hover:text-orange-700 text-sm font-medium">→ Quick Start Guide</a>
                  <a href="#" class="block text-orange-600 hover:text-orange-700 text-sm font-medium">→ Guide d'intégration complet</a>
                  <a href="#" class="block text-orange-600 hover:text-orange-700 text-sm font-medium">→ Cas d'usage e-commerce</a>
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
export class DevelopersComponent implements OnInit {
  activeTab = 'auth';

  tabs = [
    { id: 'auth', label: 'Authentification' },
    { id: 'reservations', label: 'Réservations' },
    { id: 'instructions', label: 'Instructions de Paiement' },
    { id: 'best-practices', label: 'Bonnes Pratiques' },
    { id: 'support', label: 'Support' }
  ];

  // Code examples as properties to avoid template interpolation issues
  authRequestExample = `{
  "clientId": "pk_your_partner_key",
  "clientSecret": "sk_live_your_api_key"
}`;

  authResponseExample = `{
  "partnerId": "pk_5d549668c41741f6",
  "partnerName": "Ma Boutique",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600,
  "tokenType": "Bearer",
  "issuedAt": "2024-11-22T10:30:00Z"
}`;

  createReservationRequest = `{
  "partnerId": "pk_5d549668c41741f6",
  "externalOrderRef": "ORDER-2024-001",
  "externalCustomerRef": "CUSTOMER-12345",
  "purchaseAmount": 150000,
  "installmentCount": 3,
  "notes": "Achat smartphone Samsung Galaxy"
}`;

  createReservationResponse = `{
  "creditReservationId": "123e4567-e89b-12d3-a456-426614174000",
  "partnerId": "pk_5d549668c41741f6",
  "externalOrderRef": "ORDER-2024-001",
  "purchaseAmount": 150000,
  "installmentCount": 3,
  "status": "RESERVED",
  "createdAt": "2024-11-22T10:30:00Z",
  "installments": [
    {
      "installmentNumber": 1,
      "amount": 50000,
      "dueDate": "2024-12-22",
      "status": "PENDING"
    },
    {
      "installmentNumber": 2,
      "amount": 50000,
      "dueDate": "2025-01-22",
      "status": "PENDING"
    },
    {
      "installmentNumber": 3,
      "amount": 50000,
      "dueDate": "2025-02-22",
      "status": "PENDING"
    }
  ]
}`;

  listReservationsResponse = `[
  {
    "creditReservationId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "ACTIVE",
    "purchaseAmount": 150000,
    "paidAmount": 50000,
    "remainingAmount": 100000,
    "createdAt": "2024-11-22T10:30:00Z"
  }
]`;

  reservationStatsResponse = `{
  "totalReservations": 125,
  "activeReservations": 45,
  "completedReservations": 70,
  "totalCreditVolume": 18750000,
  "averageCreditAmount": 150000,
  "repaymentRate": 95.5
}`;

  paymentInstructionRequest = `{
  "installmentId": "123e4567-e89b-12d3-a456-426614174000",
  "partnerId": "pk_5d549668c41741f6",
  "amountDue": 50000,
  "dueDate": "2024-12-22T00:00:00Z",
  "instructionType": "STANDARD",
  "language": "fr",
  "channel": "SMS",
  "validityHours": 72
}`;

  paymentInstructionResponse = `{
  "paymentInstructionId": "pay_inst_abc123",
  "reference": "KRD-202411-A1B2C3",
  "amountDue": 50000,
  "dueDate": "2024-12-22T00:00:00Z",
  "status": "GENERATED",
  "instructionContent": {
    "title": "Paiement Échéance #1",
    "message": "Montant à payer: 50 000 F CFA",
    "paymentMethods": [
      {
        "method": "WAVE",
        "displayName": "Wave",
        "merchantPhone": "+221771234567",
        "reference": "KRD-202411-A1B2C3",
        "ussdCode": "#144#50000*771234567*KRD-202411-A1B2C3#"
      },
      {
        "method": "ORANGE_MONEY",
        "displayName": "Orange Money",
        "merchantPhone": "+221771234567",
        "reference": "KRD-202411-A1B2C3"
      }
    ]
  },
  "shortDescription": "Payer 50 000 F via Wave: #144#",
  "generatedAt": "2024-11-22T10:30:00Z",
  "expiredAt": "2024-11-25T10:30:00Z"
}`;

  nodeExample = `const axios = require('axios');

const kredikaClient = axios.create({
  baseURL: 'http://localhost:7575/api',
  headers: {
    'X-Partner-Key': process.env.KREDIKA_PARTNER_KEY,
    'X-API-Key': process.env.KREDIKA_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Créer une réservation
async function createReservation(orderData) {
  try {
    const response = await kredikaClient.post('/v1/credits/reservations', {
      partnerId: process.env.KREDIKA_PARTNER_KEY,
      externalOrderRef: orderData.orderId,
      externalCustomerRef: orderData.customerId,
      purchaseAmount: orderData.amount,
      installmentCount: orderData.installments
    });

    console.log('Réservation créée:', response.data.creditReservationId);
    return response.data;
  } catch (error) {
    console.error('Erreur:', error.response?.data || error.message);
    throw error;
  }
}

// Lister les réservations
async function getReservations(status = null) {
  try {
    const params = status ? { status } : {};
    const response = await kredikaClient.get('/v1/credits/reservations', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = { createReservation, getReservations };`;

  ngOnInit(): void {
    // Initialize component state
    if (globalThis.window !== undefined) {
      const hash = globalThis.window.location.hash.slice(1);
      if (hash && this.tabs.some(t => t.id === hash)) {
        this.activeTab = hash;
      }
    }
  }
}
