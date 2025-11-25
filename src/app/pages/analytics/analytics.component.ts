import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreditReservationService } from '../../services/credit-reservation.service';
import { InstallmentService } from '../../services/installment.service';
import { PaymentInstructionService } from '../../services/payment-instruction.service';
import { ToastService } from '../../services/toast.service';

interface DashboardMetrics {
  totalReservations: number;
  activeReservations: number;
  completedReservations: number;
  totalAmount: number;
  paidAmount: number;
  repaymentRate: number;
  defaultRate: number;
  averagePaymentDelay: number;
}

interface PaymentMethodStats {
  method: string;
  count: number;
  amount: number;
  percentage: number;
}

interface TimeSeriesData {
  date: string;
  reservations: number;
  amount: number;
  payments: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header avec filtres -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-4xl font-bold text-gray-900 mb-2">📊 Analytics Dashboard</h1>
              <p class="text-gray-600">Vue d'ensemble de vos performances crédit</p>
            </div>

            <!-- Filtres de période -->
            <div class="flex gap-3">
              <button
                *ngFor="let period of periods"
                (click)="selectedPeriod.set(period)"
                [class.bg-blue-600]="selectedPeriod() === period"
                [class.text-white]="selectedPeriod() === period"
                [class.bg-white]="selectedPeriod() !== period"
                [class.text-gray-700]="selectedPeriod() !== period"
                class="px-4 py-2 rounded-lg border border-gray-200 transition-all hover:shadow-md"
              >
                {{ period }}
              </button>
            </div>
          </div>

          <!-- Export buttons -->
          <div class="flex gap-3">
            <button
              (click)="exportToExcel()"
              class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Exporter Excel
            </button>
            <button
              (click)="exportToPDF()"
              class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Exporter PDF
            </button>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Réservations -->
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm font-medium mb-1">Réservations Totales</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ metrics().totalReservations }}</h3>
                <p class="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clip-rule="evenodd" />
                  </svg>
                  +12% vs mois dernier
                </p>
              </div>
              <div class="bg-blue-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Volume Total -->
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm font-medium mb-1">Volume Total</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ formatCurrency(metrics().totalAmount) }}</h3>
                <p class="text-gray-600 text-sm mt-2">
                  Payé : {{ formatCurrency(metrics().paidAmount) }}
                </p>
              </div>
              <div class="bg-green-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Taux de Remboursement -->
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm font-medium mb-1">Taux de Remboursement</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ metrics().repaymentRate.toFixed(1) }}%</h3>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div
                    class="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    [style.width.%]="metrics().repaymentRate"
                  ></div>
                </div>
              </div>
              <div class="bg-yellow-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0h2a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Taux de Défaut -->
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition">
            <div class="flex justify-between items-start">
              <div>
                <p class="text-gray-500 text-sm font-medium mb-1">Taux de Défaut</p>
                <h3 class="text-3xl font-bold text-gray-900">{{ metrics().defaultRate.toFixed(1) }}%</h3>
                <p class="text-red-600 text-sm mt-2 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clip-rule="evenodd" />
                  </svg>
                  -2.3% vs mois dernier
                </p>
              </div>
              <div class="bg-red-100 p-3 rounded-full">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <!-- Évolution dans le temps -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Évolution des Crédits
            </h3>
            <div class="h-64 flex items-end justify-between gap-2">
              <div *ngFor="let data of timeSeriesData()" class="flex-1 flex flex-col items-center">
                <div class="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition cursor-pointer"
                     [style.height.%]="(data.amount / maxAmount()) * 100"
                     [title]="'Montant: ' + formatCurrency(data.amount)">
                </div>
                <span class="text-xs text-gray-600 mt-2">{{ data.date }}</span>
              </div>
            </div>
          </div>

          <!-- Méthodes de paiement -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Performance par Méthode de Paiement
            </h3>
            <div class="space-y-4">
              <div *ngFor="let stat of paymentMethodsStats()" class="space-y-2">
                <div class="flex justify-between items-center">
                  <span class="font-medium text-gray-700">{{ stat.method }}</span>
                  <span class="text-sm text-gray-600">{{ stat.percentage.toFixed(1) }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    [class]="getMethodColor(stat.method)"
                    class="h-3 rounded-full transition-all duration-500"
                    [style.width.%]="stat.percentage"
                  ></div>
                </div>
                <div class="flex justify-between text-sm text-gray-600">
                  <span>{{ stat.count }} paiements</span>
                  <span class="font-medium">{{ formatCurrency(stat.amount) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Statut des réservations -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0h2a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2h-2a2 2 0 00-2 2z" />
            </svg>
            Répartition par Statut
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-400">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span class="text-sm font-medium text-gray-600">Réservées</span>
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ reservedCount() }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ getPercentage(reservedCount()) }}%</p>
            </div>

            <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span class="text-sm font-medium text-blue-600">Actives</span>
              </div>
              <p class="text-2xl font-bold text-blue-900">{{ metrics().activeReservations }}</p>
              <p class="text-xs text-blue-600 mt-1">{{ getPercentage(metrics().activeReservations) }}%</p>
            </div>

            <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                <span class="text-sm font-medium text-green-600">Complétées</span>
              </div>
              <p class="text-2xl font-bold text-green-900">{{ metrics().completedReservations }}</p>
              <p class="text-xs text-green-600 mt-1">{{ getPercentage(metrics().completedReservations) }}%</p>
            </div>

            <div class="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                <span class="text-sm font-medium text-red-600">Défaut</span>
              </div>
              <p class="text-2xl font-bold text-red-900">{{ defaultedCount() }}</p>
              <p class="text-xs text-red-600 mt-1">{{ getPercentage(defaultedCount()) }}%</p>
            </div>

            <div class="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-600">
              <div class="flex items-center gap-2 mb-2">
                <div class="w-3 h-3 bg-gray-600 rounded-full"></div>
                <span class="text-sm font-medium text-gray-600">Annulées</span>
              </div>
              <p class="text-2xl font-bold text-gray-900">{{ cancelledCount() }}</p>
              <p class="text-xs text-gray-500 mt-1">{{ getPercentage(cancelledCount()) }}%</p>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            (click)="navigateTo('/reservations')"
            class="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-lg font-bold">Nouvelle Réservation</h4>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p class="text-blue-100 text-sm">Créer une nouvelle réservation de crédit</p>
          </button>

          <button
            (click)="navigateTo('/echeances')"
            class="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-lg font-bold">Gérer Échéances</h4>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p class="text-green-100 text-sm">Voir et gérer les échéances de paiement</p>
          </button>

          <button
            (click)="navigateTo('/instructions')"
            class="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-6 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-lg font-bold">Instructions</h4>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-purple-100 text-sm">Générer des instructions de paiement</p>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    :host {
      display: block;
      animation: fadeIn 0.5s ease-out;
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  private creditReservationService = inject(CreditReservationService);
  private installmentService = inject(InstallmentService);
  private paymentInstructionService = inject(PaymentInstructionService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  periods = ['Aujourd\'hui', 'Cette semaine', 'Ce mois', 'Cette année'];
  selectedPeriod = signal('Ce mois');

  metrics = signal<DashboardMetrics>({
    totalReservations: 0,
    activeReservations: 0,
    completedReservations: 0,
    totalAmount: 0,
    paidAmount: 0,
    repaymentRate: 0,
    defaultRate: 0,
    averagePaymentDelay: 0
  });

  paymentMethodsStats = signal<PaymentMethodStats[]>([]);
  timeSeriesData = signal<TimeSeriesData[]>([]);
  maxAmount = signal(0);

  reservedCount = signal(0);
  defaultedCount = signal(0);
  cancelledCount = signal(0);

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Simuler des données pour le moment
    // TODO: Remplacer par de vrais appels API
    this.metrics.set({
      totalReservations: 243,
      activeReservations: 87,
      completedReservations: 142,
      totalAmount: 125000000,
      paidAmount: 98500000,
      repaymentRate: 94.2,
      defaultRate: 3.7,
      averagePaymentDelay: 2.3
    });

    this.reservedCount.set(8);
    this.defaultedCount.set(9);
    this.cancelledCount.set(6);

    this.paymentMethodsStats.set([
      { method: 'Wave', count: 145, amount: 45000000, percentage: 45 },
      { method: 'Orange Money', count: 98, amount: 32000000, percentage: 32 },
      { method: 'Free Money', count: 42, amount: 15000000, percentage: 15 },
      { method: 'Virement Bancaire', count: 25, amount: 8000000, percentage: 8 }
    ]);

    const data: TimeSeriesData[] = [
      { date: 'Lun', reservations: 12, amount: 4200000, payments: 8 },
      { date: 'Mar', reservations: 18, amount: 6300000, payments: 12 },
      { date: 'Mer', reservations: 15, amount: 5250000, payments: 10 },
      { date: 'Jeu', reservations: 22, amount: 7700000, payments: 15 },
      { date: 'Ven', reservations: 20, amount: 7000000, payments: 14 },
      { date: 'Sam', reservations: 16, amount: 5600000, payments: 11 },
      { date: 'Dim', reservations: 10, amount: 3500000, payments: 7 }
    ];

    this.timeSeriesData.set(data);
    this.maxAmount.set(Math.max(...data.map(d => d.amount)));
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  getPercentage(count: number): string {
    const total = this.metrics().totalReservations;
    return total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
  }

  getMethodColor(method: string): string {
    const colors: Record<string, string> = {
      'Wave': 'bg-blue-500',
      'Orange Money': 'bg-orange-500',
      'Free Money': 'bg-green-500',
      'Virement Bancaire': 'bg-purple-500'
    };
    return colors[method] || 'bg-gray-500';
  }

  exportToExcel() {
    this.toastService.info('Export Excel en cours...', 3000);
    // TODO: Implémenter l'export Excel
  }

  exportToPDF() {
    this.toastService.info('Export PDF en cours...', 3000);
    // TODO: Implémenter l'export PDF
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
