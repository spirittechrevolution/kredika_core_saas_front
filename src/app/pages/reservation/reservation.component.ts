import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, FooterComponent } from '../../components';
import { CreditReservationService } from '../../services';
import { CreditReservationResponseDTO } from '../../models';

@Component({
  selector: 'app-reservation',
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
                <h1 class="text-3xl font-bold text-gray-900">Réservations de Crédit</h1>
                <p class="mt-2 text-sm text-gray-600">
                  Gérez toutes vos réservations de crédit
                </p>
              </div>
              <button
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Nouvelle réservation
              </button>
            </div>
          </div>

          <div class="px-4 sm:px-0 mt-6">
            @if (loading()) {
              <div class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            } @else {
              <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Référence
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Échéances
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
                    @for (reservation of reservations(); track reservation.creditReservationId) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ reservation.externalOrderRef }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ reservation.externalCustomerRef }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatCurrency(reservation.totalAmount) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ reservation.installmentCount }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span [class]="getStatusClass(reservation.status)">
                            {{ getStatusLabel(reservation.status) }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button class="text-indigo-600 hover:text-indigo-900">
                            Détails
                          </button>
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="6" class="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune réservation trouvée
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class ReservationComponent implements OnInit {
  private readonly creditReservationService = inject(CreditReservationService);

  reservations = signal<CreditReservationResponseDTO[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.creditReservationService.getMyReservations().subscribe({
      next: (data) => {
        this.reservations.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading reservations:', error);
        this.loading.set(false);
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

  getStatusClass(status: string): string {
    const baseClass = 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full';
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
}
