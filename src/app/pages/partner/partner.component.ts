import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent, FooterComponent } from '../../components';
import { PartnerModalComponent } from '../../components/partner-modal/partner-modal.component';
import { PartnerService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { PartnerResponseDTO, PartnerRequestDTO } from '../../models';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, PartnerModalComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">Partenaires</h1>
                <p class="mt-2 text-sm text-gray-600">
                  Gérez vos partenaires commerciaux et leurs limites de crédit
                </p>
              </div>
              <button
                (click)="openCreateModal()"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Nouveau partenaire
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
                        Nom
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Commission
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (partner of partners(); track partner.partnerId) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {{ partner.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ partner.contactEmail }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span [class]="partner.active ? 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800' : 'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800'">
                            {{ partner.active ? 'Actif' : 'Inactif' }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {{ partner.commissionRate }}%
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            (click)="openEditModal(partner)"
                            class="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Modifier
                          </button>
                          <button
                            (click)="deletePartner(partner.partnerId)"
                            class="text-red-600 hover:text-red-900"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="5" class="px-6 py-4 text-center text-sm text-gray-500">
                          Aucun partenaire trouvé
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

    <app-partner-modal
      [open]="isModalOpen()"
      [partner]="selectedPartner()"
      (closeModal)="closeModal()"
      (submitPartner)="handleSubmit($event)"
    />
  `
})
export class PartnerComponent implements OnInit {
  private readonly partnerService = inject(PartnerService);
  private readonly toastService = inject(ToastService);

  partners = signal<PartnerResponseDTO[]>([]);
  loading = signal(true);
  isModalOpen = signal(false);
  selectedPartner = signal<PartnerRequestDTO | null>(null);

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partners.set(data);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading partners:', error);
        this.toastService.error('Erreur lors du chargement des partenaires');
        this.loading.set(false);
      }
    });
  }

  openCreateModal(): void {
    this.selectedPartner.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(partner: PartnerResponseDTO): void {
    const partnerRequest: PartnerRequestDTO = {
      name: partner.name,
      contactEmail: partner.contactEmail,
      contactPhone: partner.contactPhone || '',
      callbackUrl: partner.callbackUrl,
      commissionRate: partner.commissionRate,
      maxCreditAmount: partner.maxCreditAmount,
      maxDurationMonths: partner.maxDurationMonths,
      businessSector: partner.businessSector,
      description: partner.description
    };
    this.selectedPartner.set(partnerRequest);
    this.isModalOpen.set(true);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedPartner.set(null);
  }

  handleSubmit(partnerData: PartnerRequestDTO): void {
    if (this.selectedPartner()) {
      this.toastService.info('Fonctionnalité de modification en cours de développement');
    } else {
      this.partnerService.createPartner(partnerData).subscribe({
        next: (newPartner) => {
          this.partners.update(partners => [...partners, newPartner]);
          this.toastService.success('Partenaire créé avec succès');
        },
        error: (error) => {
          console.error('Error creating partner:', error);
          this.toastService.error('Erreur lors de la création du partenaire');
        }
      });
    }
  }

  deletePartner(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      this.partnerService.deletePartner(id).subscribe({
        next: () => {
          this.partners.update(partners => partners.filter(p => p.partnerId !== id));
          this.toastService.success('Partenaire supprimé avec succès');
        },
        error: (error) => {
          console.error('Error deleting partner:', error);
          this.toastService.error('Erreur lors de la suppression du partenaire');
        }
      });
    }
  }
}
