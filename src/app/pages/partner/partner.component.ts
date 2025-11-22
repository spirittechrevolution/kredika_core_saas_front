import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent, FooterComponent } from '../../components';
import { PartnerModalComponent } from '../../components/partner-modal/partner-modal.component';
import { PartnerService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { PartnerResponseDTO, PartnerRequestDTO } from '../../models';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, PartnerModalComponent],
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
                (click)="toggleCreateForm()"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <i class="fas fa-plus mr-2"></i>
                Nouveau partenaire
              </button>
            </div>
          </div>

          <!-- Formulaire de création -->
          @if (showCreateForm()) {
            <div class="px-4 sm:px-0 mt-6">
              <div class="bg-white shadow-lg rounded-lg border border-gray-200">
                <div class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <h3 class="text-lg font-semibold text-white flex items-center">
                    <i class="fas fa-user-plus mr-2"></i>
                    Créer un nouveau partenaire
                  </h3>
                </div>
                <form (ngSubmit)="onSubmitForm()" class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nom -->
                    <div>
                      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                        Nom <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        [(ngModel)]="newPartner.name"
                        name="name"
                        required
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Ex: Jumia Sénégal"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                        Email <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        [(ngModel)]="newPartner.contactEmail"
                        name="contactEmail"
                        required
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="contact@example.com"
                      />
                    </div>

                    <!-- Téléphone -->
                    <div>
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        [(ngModel)]="newPartner.contactPhone"
                        name="contactPhone"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="+221 77 123 45 67"
                      />
                    </div>

                    <!-- URL de Callback -->
                    <div>
                      <label for="callbackUrl" class="block text-sm font-medium text-gray-700 mb-2">
                        URL de Callback <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        id="callbackUrl"
                        [(ngModel)]="newPartner.callbackUrl"
                        name="callbackUrl"
                        required
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="https://example.com/callback"
                      />
                    </div>

                    <!-- Taux de Commission -->
                    <div>
                      <label for="commission" class="block text-sm font-medium text-gray-700 mb-2">
                        Taux de Commission (%) <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="commission"
                        [(ngModel)]="newPartner.commissionRate"
                        name="commissionRate"
                        required
                        min="0"
                        max="100"
                        step="0.01"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="2.5"
                      />
                    </div>

                    <!-- Montant Maximum de Crédit -->
                    <div>
                      <label for="maxCredit" class="block text-sm font-medium text-gray-700 mb-2">
                        Montant Maximum de Crédit (FCFA) <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="maxCredit"
                        [(ngModel)]="newPartner.maxCreditAmount"
                        name="maxCreditAmount"
                        required
                        min="0"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="500000"
                      />
                    </div>

                    <!-- Durée Maximum -->
                    <div>
                      <label for="maxDuration" class="block text-sm font-medium text-gray-700 mb-2">
                        Durée Maximum (mois) <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="maxDuration"
                        [(ngModel)]="newPartner.maxDurationMonths"
                        name="maxDurationMonths"
                        required
                        min="1"
                        max="24"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="12"
                      />
                    </div>

                    <!-- Secteur d'Activité -->
                    <div>
                      <label for="sector" class="block text-sm font-medium text-gray-700 mb-2">
                        Secteur d'Activité
                      </label>
                      <select
                        id="sector"
                        [(ngModel)]="newPartner.businessSector"
                        name="businessSector"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      >
                        <option value="">Sélectionner un secteur</option>
                        <option value="E-COMMERCE">E-commerce</option>
                        <option value="RETAIL">Commerce de détail</option>
                        <option value="EDUCATION">Éducation</option>
                        <option value="HEALTH">Santé</option>
                        <option value="TELECOM">Télécommunications</option>
                        <option value="TRAVEL">Voyage & Tourisme</option>
                        <option value="REAL_ESTATE">Immobilier</option>
                        <option value="AUTOMOTIVE">Automobile</option>
                        <option value="ELECTRONICS">Électronique</option>
                        <option value="FASHION">Mode & Habillement</option>
                        <option value="FOOD">Alimentation & Restauration</option>
                        <option value="SERVICES">Services divers</option>
                        <option value="OTHER">Autre</option>
                      </select>
                    </div>

                    <!-- Numéro d'enregistrement -->
                    <div>
                      <label for="registrationNumber" class="block text-sm font-medium text-gray-700 mb-2">
                        Numéro d'Enregistrement <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="registrationNumber"
                        [(ngModel)]="newPartner.registrationNumber"
                        name="registrationNumber"
                        required
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="SN-XXX-2024-001"
                      />
                    </div>

                    <!-- Statut actif/inactif -->
                    <div class="flex items-center space-x-3">
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          [(ngModel)]="newPartner.active"
                          name="active"
                          class="sr-only peer"
                        />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        <span class="ml-3 text-sm font-medium text-gray-700">
                          Partenaire {{ newPartner.active ? 'Actif' : 'Inactif' }}
                        </span>
                      </label>
                    </div>

                    <!-- Description (full width) -->
                    <div class="md:col-span-2">
                      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        id="description"
                        [(ngModel)]="newPartner.description"
                        name="description"
                        rows="3"
                        class="block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Description du partenaire..."
                      ></textarea>
                    </div>
                  </div>

                  <!-- Boutons d'action -->
                  <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      (click)="cancelCreate()"
                      class="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                    >
                      <i class="fas fa-times mr-2"></i>
                      Annuler
                    </button>
                    <button
                      type="submit"
                      [disabled]="submitting()"
                      class="px-6 py-2.5 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      @if (submitting()) {
                        <i class="fas fa-spinner fa-spin mr-2"></i>
                        Création en cours...
                      } @else {
                        <i class="fas fa-check mr-2"></i>
                        Créer le partenaire
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>
          }

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
  showCreateForm = signal(false);
  submitting = signal(false);

  newPartner: PartnerRequestDTO = {
    name: '',
    contactEmail: '',
    contactPhone: '',
    callbackUrl: '',
    commissionRate: 0,
    maxCreditAmount: 0,
    maxDurationMonths: 12,
    businessSector: '',
    description: '',
    active: true,
    registrationNumber: ''
  };

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

  toggleCreateForm(): void {
    this.showCreateForm.update(show => !show);
    if (!this.showCreateForm()) {
      this.resetNewPartner();
    }
  }

  cancelCreate(): void {
    this.showCreateForm.set(false);
    this.resetNewPartner();
  }

  onSubmitForm(): void {
    this.submitting.set(true);
    this.partnerService.createPartner(this.newPartner).subscribe({
      next: (createdPartner) => {
        this.partners.update(partners => [...partners, createdPartner]);
        this.toastService.success('Partenaire créé avec succès');
        this.showCreateForm.set(false);
        this.resetNewPartner();
        this.submitting.set(false);
      },
      error: (error) => {
        console.error('Error creating partner:', error);
        this.toastService.error('Erreur lors de la création du partenaire');
        this.submitting.set(false);
      }
    });
  }

  resetNewPartner(): void {
    this.newPartner = {
      name: '',
      contactEmail: '',
      contactPhone: '',
      callbackUrl: '',
      commissionRate: 0,
      maxCreditAmount: 0,
      maxDurationMonths: 12,
      businessSector: '',
      description: '',
      active: true,
      registrationNumber: ''
    };
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
