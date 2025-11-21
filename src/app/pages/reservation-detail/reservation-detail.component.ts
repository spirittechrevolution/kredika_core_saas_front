import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';
import { CreditReservationService, PartnerService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { CreditReservationResponseDTO, PartnerResponseDTO, InstallmentDTO } from '../../models';

@Component({
  selector: 'app-reservation-detail',
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
                  <a routerLink="/reservations" class="text-gray-500 hover:text-gray-700">Réservations</a>
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

            <h1 class="text-3xl font-bold text-gray-900">Détails de la Réservation</h1>
          </div>

          @if (loading()) {
            <div class="text-center py-12">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          } @else if (reservation()) {
            <div class="px-4 sm:px-0 space-y-6">
              <!-- Main Info -->
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 flex justify-between items-start">
                  <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Réservation {{ reservation()!.externalOrderRef }}
                    </h3>
                    <p class="mt-1 max-w-2xl text-sm text-gray-500">
                      Informations détaillées de la réservation de crédit
                    </p>
                  </div>
                  <span [class]="getStatusClass(reservation()!.status)">
                    {{ getStatusLabel(reservation()!.status) }}
                  </span>
                </div>
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Référence commande</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
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
                      <dt class="text-sm font-medium text-gray-500">Montant de l'achat</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(reservation()!.purchaseAmount) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Montant total à rembourser</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold text-lg">
                        {{ formatCurrency(reservation()!.totalAmount) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Intérêts</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(reservation()!.interestAmount) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Mensualité</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-semibold">
                        {{ formatCurrency(reservation()!.monthlyPayment) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Apport initial</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatCurrency(reservation()!.downPaymentAmount) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Nombre d'échéances</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ reservation()!.installmentCount }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Date de réservation</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatDate(reservation()!.reservationDate) }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Date de fin prévue</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ formatDate(reservation()!.expectedCompletionDate) }}
                      </dd>
                    </div>
                    @if (reservation()!.actualCompletionDate) {
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Date de fin effective</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ formatDate(reservation()!.actualCompletionDate) }}
                        </dd>
                      </div>
                    }
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

              <!-- Payment Statistics -->
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Statistiques de Paiement
                  </h3>
                </div>
                <div class="border-t border-gray-200">
                  <dl>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Taux de remboursement</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <div class="flex items-center">
                          <span class="font-semibold">{{ reservation()!.repaymentRate }}%</span>
                          <div class="ml-4 flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                            <div
                              class="bg-green-500 h-2 rounded-full"
                              [style.width.%]="reservation()!.repaymentRate"
                            ></div>
                          </div>
                        </div>
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Échéances payées</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ reservation()!.totalInstallmentsPaid }} / {{ reservation()!.installmentCount }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Échéances en retard</dt>
                      <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2" [class]="reservation()!.totalInstallmentsLate > 0 ? 'text-red-600 font-semibold' : 'text-gray-900'">
                        {{ reservation()!.totalInstallmentsLate }}
                      </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Comportement de paiement</dt>
                      <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {{ getPaymentBehaviorLabel(reservation()!.overallPaymentBehavior) }}
                      </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt class="text-sm font-medium text-gray-500">Défaut de paiement</dt>
                      <dd class="mt-1 text-sm sm:mt-0 sm:col-span-2" [class]="reservation()!.hasDefaulted ? 'text-red-600 font-semibold' : 'text-green-600'">
                        {{ reservation()!.hasDefaulted ? 'Oui' : 'Non' }}
                      </dd>
                    </div>
                    @if (reservation()!.firstDefaultDate) {
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Date du premier défaut</dt>
                        <dd class="mt-1 text-sm text-red-600 sm:mt-0 sm:col-span-2">
                          {{ formatDate(reservation()!.firstDefaultDate) }}
                        </dd>
                      </div>
                    }
                  </dl>
                </div>
              </div>

              <!-- Partner Info -->
              @if (partner()) {
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Informations du Partenaire
                    </h3>
                  </div>
                  <div class="border-t border-gray-200">
                    <dl>
                      <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Nom</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ partner()!.name }}
                        </dd>
                      </div>
                      <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {{ partner()!.contactEmail }}
                        </dd>
                      </div>
                      @if (partner()!.contactPhone) {
                        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ partner()!.contactPhone }}
                          </dd>
                        </div>
                      }
                    </dl>
                  </div>
                </div>
              }

              <!-- Installments List -->
              @if (reservation()!.installments && reservation()!.installments!.length > 0) {
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div class="px-4 py-5 sm:px-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900">
                      Échéances de Paiement ({{ reservation()!.installments!.length }})
                    </h3>
                  </div>
                  <div class="border-t border-gray-200">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            N°
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date d'échéance
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Montant
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Payé
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statut
                          </th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        @for (installment of reservation()!.installments!; track installment.installmentId) {
                          <tr [class]="getInstallmentRowClass(installment)">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{{ installment.installmentNumber }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {{ formatDate(installment.dueDate) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {{ formatCurrency(installment.amount) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {{ formatCurrency(installment.paidAmount || 0) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span [class]="getInstallmentStatusClass(installment.status)">
                                {{ getInstallmentStatusLabel(installment.status) }}
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <a
                                [routerLink]="['/echeances', installment.installmentId]"
                                class="text-indigo-600 hover:text-indigo-900"
                              >
                                Détails
                              </a>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
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
                    <a
                      routerLink="/reservations"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Retour aux réservations
                    </a>
                    <a
                      routerLink="/echeances"
                      class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Voir toutes les échéances
                    </a>
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div class="px-4 sm:px-0">
              <div class="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                <p class="text-gray-500">Réservation introuvable</p>
                <a
                  routerLink="/reservations"
                  class="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-900"
                >
                  Retour aux réservations
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
export class ReservationDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly creditReservationService = inject(CreditReservationService);
  private readonly partnerService = inject(PartnerService);
  private readonly toastService = inject(ToastService);

  reservation = signal<CreditReservationResponseDTO | null>(null);
  partner = signal<PartnerResponseDTO | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReservationDetails(id);
    } else {
      this.router.navigate(['/reservations']);
    }
  }

  loadReservationDetails(id: string): void {
    this.creditReservationService.getCreditReservationById(id).subscribe({
      next: (data) => {
        this.reservation.set(data);
        this.loading.set(false);
        // Charger les détails du partenaire
        if (data.partnerId) {
          this.loadPartnerDetails(data.partnerId);
        }
      },
      error: (error) => {
        console.error('Error loading reservation:', error);
        this.toastService.error('Erreur lors du chargement de la réservation');
        this.loading.set(false);
      }
    });
  }

  loadPartnerDetails(partnerId: string): void {
    this.partnerService.getPartnerById(partnerId).subscribe({
      next: (data) => {
        this.partner.set(data);
      },
      error: (error) => {
        console.error('Error loading partner:', error);
      }
    });
  }

  getInstallmentRowClass(installment: InstallmentDTO): string {
    const today = new Date();
    const dueDate = new Date(installment.dueDate);
    const isPending = installment.status === 'PENDING';

    // Colorer la prochaine échéance à venir en bleu clair
    if (isPending && dueDate > today) {
      const allPendingFuture = this.reservation()?.installments?.filter(i =>
        i.status === 'PENDING' && new Date(i.dueDate) > today
      ) || [];

      // Si c'est la première échéance à venir
      if (allPendingFuture.length > 0 && allPendingFuture[0].installmentId === installment.installmentId) {
        return 'bg-blue-50';
      }
    }

    return '';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getStatusClass(status: string): string {
    const baseClass = 'px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full';
    switch (status) {
      case 'ACTIVE':
        return `${baseClass} bg-green-100 text-green-800`;
      case 'RESERVED':
        return `${baseClass} bg-yellow-100 text-yellow-800`;
      case 'COMPLETED':
        return `${baseClass} bg-blue-100 text-blue-800`;
      case 'CANCELLED':
        return `${baseClass} bg-red-100 text-red-800`;
      case 'DEFAULTED':
        return `${baseClass} bg-red-100 text-red-800`;
      default:
        return `${baseClass} bg-gray-100 text-gray-800`;
    }
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'RESERVED': 'Réservé',
      'ACTIVE': 'Actif',
      'COMPLETED': 'Complété',
      'CANCELLED': 'Annulé',
      'DEFAULTED': 'En défaut'
    };
    return labels[status] || status;
  }

  getInstallmentStatusClass(status: string): string {
    const baseClass = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
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

  getInstallmentStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDING': 'En attente',
      'PAID': 'Payé',
      'PARTIALLY_PAID': 'Partiellement payé',
      'LATE': 'En retard',
      'CANCELLED': 'Annulé'
    };
    return labels[status] || status;
  }

  getPaymentBehaviorLabel(behavior: string | undefined): string {
    const labels: Record<string, string> = {
      'PENDING_FIRST_PAYMENT': 'En attente du premier paiement',
      'EXCELLENT': 'Excellent',
      'GOOD': 'Bon',
      'AVERAGE': 'Moyen',
      'POOR': 'Faible',
      'DEFAULTED': 'Défaut de paiement'
    };
    return labels[behavior || ''] || behavior || 'N/A';
  }
}
