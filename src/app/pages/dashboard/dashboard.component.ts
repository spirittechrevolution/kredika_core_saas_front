import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';
import { CreditReservationService } from '../../services';
import { ReservationStatsDTO } from '../../models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Header -->
          <div class="px-4 py-6 sm:px-0">
            <h1 class="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            <p class="mt-2 text-sm text-gray-600">
              Vue d'ensemble de vos activités de crédit
            </p>
          </div>

          <!-- Stats Grid -->
          @if (stats()) {
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0">
              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate mb-1">
                          Total Réservations
                        </dt>
                        <dd class="text-3xl font-bold text-gray-900">
                          {{ stats()?.totalReservations || 0 }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate mb-1">
                          Réservations Actives
                        </dt>
                        <dd class="text-3xl font-bold text-gray-900">
                          {{ stats()?.activeReservations || 0 }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate mb-1">
                          Volume Total
                        </dt>
                        <dd class="text-3xl font-bold text-gray-900">
                          {{ formatCurrency(stats()?.totalAmount || 0) }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div class="bg-white overflow-hidden shadow-lg rounded-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-6 w-0 flex-1">
                      <dl>
                        <dt class="text-sm font-medium text-gray-500 truncate mb-1">
                          Montant Moyen
                        </dt>
                        <dd class="text-3xl font-bold text-gray-900">
                          {{ formatCurrency(stats()?.averageAmount || 0) }}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Quick Actions -->
          <div class="mt-8 px-4 sm:px-0">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                routerLink="/reservations"
                class="block bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100"
              >
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-base font-semibold text-gray-900">Voir les réservations</p>
                    </div>
                  </div>
                </div>
              </a>

              <a
                routerLink="/partenaires"
                class="block bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100"
              >
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-base font-semibold text-gray-900">Gérer les partenaires</p>
                    </div>
                  </div>
                </div>
              </a>

              <a
                routerLink="/echeances"
                class="block bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer border border-gray-100"
              >
                <div class="p-6">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="ml-4">
                      <p class="text-base font-semibold text-gray-900">Voir les échéances</p>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <!-- Recent Activity Placeholder -->
          <div class="mt-8 px-4 sm:px-0">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Activité récente</h2>
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
              <div class="px-4 py-5 sm:px-6">
                <p class="text-sm text-gray-500 text-center">
                  Aucune activité récente à afficher
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class DashboardComponent implements OnInit {
  private readonly creditReservationService = inject(CreditReservationService);

  stats = signal<ReservationStatsDTO | null>(null);

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.creditReservationService.getMyReservationStats().subscribe({
      next: (data) => this.stats.set(data),
      error: (error) => console.error('Error loading stats:', error)
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }
}
