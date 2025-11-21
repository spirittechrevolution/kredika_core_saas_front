import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';
import { InstallmentService, CreditReservationService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { InstallmentDTO, CreditReservationResponseDTO } from '../../models';

@Component({
  selector: 'app-echeance-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!-- Breadcrumb -->
          <div class="px-4 py-6 sm:px-0">
            <nav class="flex mb-4" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2 text-sm">
                <li>
                  <a routerLink="/dashboard" class="text-gray-500 hover:text-gray-700">Tableau de bord</a>
                </li>
                <li>
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </li>
                <li>
                  <a routerLink="/echeances" class="text-gray-500 hover:text-gray-700">Échéances</a>
                </li>
                <li>
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span class="text-gray-700 font-medium">Détails</span>
                </li>
              </ol>
            </nav>

            <h1 class="text-3xl font-bold text-gray-900">Détails de l'Échéance</h1>
          </div>

          @if (loading()) {
            <div class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          } @else if (installment()) {
            <!-- Installment Details Card -->
            <div class="px-4 sm:px-0 space-y-6">
              <!-- Main Info -->
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Échéance #{{ installment()?.installmentNumber }}
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Informations détaillées de l'échéance
                    </p>
                  </div>
                  <span [class]="getStatusClass(installment()!.status)">
                    {{ getStatusLabel(installment()!.status) }}
                  </span>
                </div>
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Montant dû</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold text-lg">
                        {{ formatCurrency(installment()!.amount) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Montant payé</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(installment()!.paidAmount || 0) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Reste à payer</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
                        {{ formatCurrency(installment()!.amount - (installment()!.paidAmount || 0)) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Date d'échéance</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatDate(installment()!.dueDate) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Principal</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(installment()!.principalAmount) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Intérêts</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(installment()!.interestAmount) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Frais de retard</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(installment()!.lateFee || 0) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Jours de retard</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <span [class]="(installment()!.daysLate || 0) > 0 ? 'text-red-600 font-semibold' : ''">
                          {{ installment()!.daysLate || 0 }} jour(s)
                        </span>
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Tentatives de paiement</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ installment()!.paymentAttemptCount }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Rappels envoyés</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ installment()!.reminderCount }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Paiement automatique</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ installment()!.autoPaid ? 'Oui' : 'Non' }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Créé le</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatDateTime(installment()!.createdAt) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Mis à jour le</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatDateTime(installment()!.updatedAt) }}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              <!-- Reservation Info -->
              @if (reservation()) {
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Informations de la Réservation
                    </h3>
                  </div>
                  <div class="border-t border-gray-200">
                    <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Référence commande</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ reservation()!.externalOrderRef }}
                        </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Référence client</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ reservation()!.externalCustomerRef }}
                        </dd>
                      </div>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Montant total</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ formatCurrency(reservation()!.totalAmount) }}
                        </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Nombre d'échéances</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ reservation()!.installmentCount }}
                        </dd>
                      </div>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Mensualité</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ formatCurrency(reservation()!.monthlyPayment) }}
                        </dd>
                      </div>
                      @if (reservation()!.notes) {
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">Notes</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ reservation()!.notes }}
                          </dd>
                        </div>
                      }
                    </dl>
                  </div>
                </div>
              }

              <!-- Actions -->
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Actions disponibles
                  </h3>
                  <div class="flex flex-wrap gap-3">
                    @if (installment()!.status === 'PENDING' || installment()!.status === 'PARTIALLY_PAID') {
                      <button
                        (click)="sendReminder()"
                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Envoyer un rappel
                      </button>
                    }
                    <a
                      routerLink="/reservations"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Voir toutes les réservations
                    </a>
                    <a
                      routerLink="/echeances"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Retour aux échéances
                    </a>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div class="px-4 sm:px-0">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <p class="text-gray-500">Échéance introuvable</p>
                <a
                  routerLink="/echeances"
                  class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-900"
                >
                  Retour aux échéances
                </a>
              </div>
            </div>
          }
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class EcheanceDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly installmentService = inject(InstallmentService);
  private readonly creditReservationService = inject(CreditReservationService);
  private readonly toastService = inject(ToastService);

  installment = signal<InstallmentDTO | null>(null);
  reservation = signal<CreditReservationResponseDTO | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInstallmentDetails(id);
    } else {
      this.router.navigate(['/echeances']);
    }
  }

  loadInstallmentDetails(id: string): void {
    this.installmentService.getInstallmentById(id).subscribe({
      next: (data) => {
        this.installment.set(data);
        this.loading.set(false);
        // Charger les détails de la réservation
        if (data.creditReservationId) {
          this.loadReservationDetails(data.creditReservationId);
        }
      },
      error: (error) => {
        console.error('Error loading installment:', error);
        this.toastService.error('Erreur lors du chargement de l\'échéance');
        this.loading.set(false);
      }
    });
  }

  loadReservationDetails(reservationId: string): void {
    this.creditReservationService.getCreditReservationById(reservationId).subscribe({
      next: (data) => {
        this.reservation.set(data);
      },
      error: (error) => {
        console.error('Error loading reservation:', error);
      }
    });
  }

  sendReminder(): void {
    const id = this.installment()?.installmentId;
    if (!id) return;

    this.installmentService.sendReminder(id).subscribe({
      next: () => {
        this.toastService.success('Rappel envoyé avec succès');
        // Recharger les détails pour mettre à jour le compteur de rappels
        this.loadInstallmentDetails(id);
      },
      error: (error) => {
        console.error('Error sending reminder:', error);
        this.toastService.error('Erreur lors de l\'envoi du rappel');
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  formatDateTime(date: Date | string): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getStatusClass(status: string): string {
    const baseClass = 'px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full';
    switch (status) {
      case 'PAID':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'PENDING':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'LATE':
        return `${baseClass} bg-red-100 text-red-800`;
      case 'PARTIALLY_PAID':
        return `${baseClass} bg-blue-100 text-blue-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'PAID': 'Payé',
      'PARTIALLY_PAID': 'Partiellement payé',
      'LATE': 'En retard',
      'CANCELLED': 'Annulé'
    };
    return labels[status] || status;
  }
}
