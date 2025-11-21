import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent, FooterComponent } from '../../components';
import { InstallmentService } from '../../services';
import { InstallmentDTO } from '../../models';

@Component({
  selector: 'app-echeance',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <h1 class="text-3xl font-bold text-gray-900">Échéances de Paiement</h1>
            <p class="mt-2 text-sm text-gray-600">
              Suivez toutes vos échéances de paiement
            </p>
          </div>

          <!-- Tabs -->
          <div class="px-4 sm:px-0 mt-6">
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  (click)="activeTab.set('upcoming')"
                  [class]="activeTab() === 'upcoming' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  À venir
                </button>
                <button
                  (click)="activeTab.set('overdue')"
                  [class]="activeTab() === 'overdue' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
                  class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  En retard
                </button>
              </nav>
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
                        N° Échéance
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date d'échéance
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Montant
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
                    @for (installment of displayedInstallments(); track installment.installmentId) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{{ installment.installmentNumber }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatDate(installment.dueDate) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ formatCurrency(installment.amount) }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span [class]="getStatusClass(installment.status)">
                            {{ getStatusLabel(installment.status) }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <a
                            [routerLink]="['/echeances', installment.installmentId]"
                            class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          >
                            Détails
                          </a>
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune échéance trouvée
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
export class EcheanceComponent implements OnInit {
  private readonly installmentService = inject(InstallmentService);

  upcomingInstallments = signal<InstallmentDTO[]>([]);
  overdueInstallments = signal<InstallmentDTO[]>([]);
  activeTab = signal<'upcoming' | 'overdue'>('upcoming');
  loading = signal(true);

  ngOnInit(): void {
    this.loadInstallments();
  }

  loadInstallments(): void {
    this.installmentService.getUpcomingInstallments().subscribe({
      next: (data) => {
        this.upcomingInstallments.set(data);
        this.loading.set(false);
      },
      error: (error) => console.error('Error loading upcoming installments:', error)
    });

    this.installmentService.getOverdueInstallments().subscribe({
      next: (data) => {
        this.overdueInstallments.set(data);
      },
      error: (error) => console.error('Error loading overdue installments:', error)
    });
  }

  get displayedInstallments() {
    return this.activeTab() === 'upcoming' ? this.upcomingInstallments : this.overdueInstallments;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  getStatusClass(status: string): string {
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
