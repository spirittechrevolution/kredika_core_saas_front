import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <!-- Hero Section -->
        <div class="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-700 overflow-hidden">
          <div class="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
          <div class="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 lg:py-32">
            <div class="text-center">
              <div class="mb-6 inline-flex items-center px-4 py-2 bg-indigo-800/50 backdrop-blur-sm rounded-full border border-indigo-500/30">
                <span class="text-indigo-200 text-sm font-medium">🚀 Moteur de Crédit Intégré pour l'Afrique de l'Ouest</span>
              </div>
              <h1 class="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                Kredika Core
              </h1>
              <p class="text-xl md:text-2xl mb-4 text-indigo-100 max-w-3xl mx-auto">
                Démocratisez l'accès au crédit en intégrant le paiement fractionné en quelques heures
              </p>
              <p class="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
                API SaaS complète • Wave, Orange Money, Free Money • Scoring automatisé • Conforme BCEAO
              </p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  routerLink="/login"
                  class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transform hover:scale-105 transition-all shadow-xl"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Commencer maintenant
                </a>
                <a
                  href="#developer"
                  class="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-lg font-semibold rounded-lg text-white hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Espace Développeur
                </a>
              </div>

              <!-- Stats -->
              <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div class="text-3xl font-bold text-white">2-3h</div>
                  <div class="text-sm text-indigo-200">Intégration rapide</div>
                </div>
                <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div class="text-3xl font-bold text-white">95%+</div>
                  <div class="text-sm text-indigo-200">Taux de remboursement</div>
                </div>
                <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div class="text-3xl font-bold text-white">3+</div>
                  <div class="text-sm text-indigo-200">Moyens de paiement</div>
                </div>
                <div class="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                  <div class="text-3xl font-bold text-white">100%</div>
                  <div class="text-sm text-indigo-200">Conforme BCEAO</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Value Proposition -->
        <div class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
                Pourquoi Kredika Core ?
              </h2>
              <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                Transformez votre business en offrant le "Buy Now, Pay Later" sans développer d'infrastructure complexe
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div class="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-indigo-500 transition-all">
                  <div class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">Intégration Express</h3>
                  <p class="text-gray-600 mb-4">
                    Déployez une solution de crédit complète en 2-3 heures au lieu de 6-12 mois de développement
                  </p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      API REST documentée (OpenAPI)
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Webhooks temps réel
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Exemples de code prêts à l'emploi
                    </li>
                  </ul>
                </div>
              </div>

              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div class="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-purple-500 transition-all">
                  <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">Paiements Locaux Unifiés</h3>
                  <p class="text-gray-600 mb-4">
                    Une seule API pour gérer Wave, Orange Money, Free Money, virements bancaires et espèces
                  </p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Instructions multilingues (FR/WO/EN)
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Codes USSD pré-remplis
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Instructions pas-à-pas enrichies
                    </li>
                  </ul>
                </div>
              </div>

              <div class="relative group">
                <div class="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <div class="relative bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-green-500 transition-all">
                  <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                    <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">Scoring & Risque Automatisés</h3>
                  <p class="text-gray-600 mb-4">
                    Décisions de crédit intelligentes basées sur le comportement de paiement et l'historique
                  </p>
                  <ul class="space-y-2 text-sm text-gray-600">
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Analyse de solvabilité temps réel
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Limites de crédit dynamiques
                    </li>
                    <li class="flex items-start">
                      <svg class="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Conformité BCEAO native
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div class="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
                Comment ça fonctionne ?
              </h2>
              <p class="text-xl text-gray-600">
                Intégrez Kredika Core en 4 étapes simples
              </p>
            </div>

            <div class="relative">
              <div class="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 transform -translate-y-1/2"></div>

              <div class="grid md:grid-cols-4 gap-8 relative">
                <div class="text-center">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white text-2xl font-bold mb-4 relative z-10 shadow-lg">
                    1
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Créez votre compte</h3>
                  <p class="text-gray-600 text-sm">
                    Inscription rapide et obtenez vos clés API en quelques minutes
                  </p>
                </div>

                <div class="text-center">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full text-white text-2xl font-bold mb-4 relative z-10 shadow-lg">
                    2
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Configurez vos limites</h3>
                  <p class="text-gray-600 text-sm">
                    Définissez vos montants de crédit, durées et méthodes de paiement
                  </p>
                </div>

                <div class="text-center">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-full text-white text-2xl font-bold mb-4 relative z-10 shadow-lg">
                    3
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Intégrez l'API</h3>
                  <p class="text-gray-600 text-sm">
                    Quelques lignes de code suffisent avec notre documentation complète
                  </p>
                </div>

                <div class="text-center">
                  <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full text-white text-2xl font-bold mb-4 relative z-10 shadow-lg">
                    4
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">Lancez en prod</h3>
                  <p class="text-gray-600 text-sm">
                    Commencez à offrir du crédit à vos clients immédiatement
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Use Cases -->
        <div class="py-20 bg-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <h2 class="text-4xl font-extrabold text-gray-900 mb-4">
                Cas d'usage
              </h2>
              <p class="text-xl text-gray-600">
                Adapté à tous les secteurs d'activité
              </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-100">
                <div class="text-4xl mb-3">🛒</div>
                <h3 class="font-bold text-gray-900 mb-2">E-commerce</h3>
                <p class="text-sm text-gray-600">Jumia, Glotelho - Paiement en plusieurs fois pour smartphones et électronique</p>
              </div>

              <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div class="text-4xl mb-3">🏪</div>
                <h3 class="font-bold text-gray-900 mb-2">Retail Physique</h3>
                <p class="text-sm text-gray-600">Auchan, Exclusive - Crédit magasin pour électroménager et meubles</p>
              </div>

              <div class="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                <div class="text-4xl mb-3">📱</div>
                <h3 class="font-bold text-gray-900 mb-2">Telecom</h3>
                <p class="text-sm text-gray-600">Expresso, Free - Financement de smartphones et forfaits</p>
              </div>

              <div class="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div class="text-4xl mb-3">🎓</div>
                <h3 class="font-bold text-gray-900 mb-2">Services</h3>
                <p class="text-sm text-gray-600">Éducation, Assurance - Fractionnement de frais annuels</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Developer Section -->
        <div id="developer" class="py-20 bg-gray-900 text-white">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
              <div class="inline-flex items-center px-4 py-2 bg-indigo-500/20 backdrop-blur-sm rounded-full border border-indigo-500/30 mb-6">
                <svg class="w-5 h-5 text-indigo-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span class="text-indigo-300 text-sm font-medium">Espace Développeur</span>
              </div>
              <h2 class="text-4xl font-extrabold mb-4">
                Tout pour intégrer nos APIs
              </h2>
              <p class="text-xl text-gray-400 max-w-3xl mx-auto">
                Documentation complète, exemples de code et endpoints prêts pour l'intégration
              </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-12">
              <!-- Quick Start -->
              <div>
                <h3 class="text-2xl font-bold mb-6 flex items-center">
                  <svg class="w-6 h-6 text-indigo-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Start
                </h3>
                <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <p class="text-gray-300 mb-4">Créez votre première réservation de crédit en quelques lignes :</p>
                  <pre class="bg-gray-950 rounded-lg p-4 overflow-x-auto text-sm border border-gray-700"><code class="text-green-400">POST /v1/credits/reservations
Content-Type: application/json
X-Partner-Key: pk_your_partner_key
X-API-Key: sk_live_your_api_key

&#123;
  "partnerId": "pk_xxx",
  "externalOrderRef": "ORDER-001",
  "externalCustomerRef": "CUST-001",
  "purchaseAmount": 150000,
  "installmentCount": 3
&#125;</code></pre>
                  <a
                    routerLink="/developers"
                    class="inline-flex items-center mt-4 text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Voir la documentation complète
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              <!-- API Features -->
              <div>
                <h3 class="text-2xl font-bold mb-6 flex items-center">
                  <svg class="w-6 h-6 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Fonctionnalités API
                </h3>
                <div class="space-y-4">
                  <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <h4 class="font-semibold text-white mb-1">Authentification sécurisée</h4>
                        <p class="text-sm text-gray-400">Système dual-key (Partner Key + API Key) avec rotation automatique</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500 transition-all">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <h4 class="font-semibold text-white mb-1">Webhooks temps réel</h4>
                        <p class="text-sm text-gray-400">Notifications instantanées pour tous les événements de paiement</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-green-500 transition-all">
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                      </div>
                      <div class="ml-4">
                        <h4 class="font-semibold text-white mb-1">Analytics détaillés</h4>
                        <p class="text-sm text-gray-400">Statistiques complètes sur vos réservations et paiements</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- API Endpoints Preview -->
            <div class="mt-16">
              <h3 class="text-2xl font-bold mb-8 text-center">
                APIs Partenaires Disponibles
              </h3>
              <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/auth/token</span>
                  </div>
                  <p class="text-sm text-gray-300">Authentification partenaire</p>
                </div>

                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/credits/reservations</span>
                  </div>
                  <p class="text-sm text-gray-300">Créer une réservation</p>
                </div>

                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">GET</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/credits/reservations</span>
                  </div>
                  <p class="text-sm text-gray-300">Lister vos réservations</p>
                </div>

                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">GET</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/credits/reservations/&#123;id&#125;</span>
                  </div>
                  <p class="text-sm text-gray-300">Détails d'une réservation</p>
                </div>

                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-mono rounded">POST</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/payment-instructions</span>
                  </div>
                  <p class="text-sm text-gray-300">Générer instruction paiement</p>
                </div>

                <div class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500 transition-all">
                  <div class="flex items-center mb-2">
                    <span class="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono rounded">GET</span>
                    <span class="ml-2 text-sm text-gray-400 font-mono">/v1/credits/reservations/stats</span>
                  </div>
                  <p class="text-sm text-gray-300">Statistiques partenaire</p>
                </div>
              </div>

              <div class="mt-8 text-center">
                <a
                  routerLink="/developers"
                  class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                >
                  Voir la documentation complète
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Final -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-600">
          <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
            <div class="text-center">
              <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Prêt à transformer votre business ?
              </h2>
              <p class="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Rejoignez les entreprises qui démocratisent l'accès au crédit en Afrique de l'Ouest
              </p>
              <div class="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  routerLink="/login"
                  class="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-indigo-700 bg-white hover:bg-indigo-50 transform hover:scale-105 transition-all shadow-xl"
                >
                  Commencer gratuitement
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="mailto:sales@kredika.sn"
                  class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-lg text-white hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  Contacter les ventes
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
