import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent, FooterComponent } from '../../components';
import { PartnerService, AuthService } from '../../services';
import { ToastService } from '../../services/toast.service';
import { PartnerResponseDTO, PartnerRequestDTO } from '../../models';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50">
      <app-navbar />

      <main class="flex-grow">
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div class="px-4 py-6 sm:px-0">
            <div class="flex justify-between items-center">
              <div>
                <h1 class="text-3xl font-bold text-gray-900">Mon Profil Partenaire</h1>
                <p class="mt-2 text-sm text-gray-600">
                  Consultez vos informations et vos limites de crédit
                </p>
              </div>
              @if (currentPartner()) {
                <div class="flex items-center space-x-3">
                  <span [class]="currentPartner()!.active ? 'px-4 py-2 text-sm font-semibold rounded-full bg-green-100 text-green-800' : 'px-4 py-2 text-sm font-semibold rounded-full bg-red-100 text-red-800'">
                    <i [class]="currentPartner()!.active ? 'fas fa-check-circle mr-2' : 'fas fa-times-circle mr-2'"></i>
                    {{ currentPartner()!.active ? 'Compte Actif' : 'Compte Inactif' }}
                  </span>
                </div>
              }
            </div>
          </div>

          <!-- Carte d'information du partenaire -->
          @if (currentPartner() && !showCreateForm()) {
            <div class="px-4 sm:px-0 mt-6">
              <div class="bg-white shadow-lg rounded-lg overflow-hidden">
                <!-- Header avec gradient -->
                <div class="px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <h3 class="text-lg font-semibold text-white flex items-center">
                    <i class="fas fa-user-circle mr-2"></i>
                    Informations du Partenaire
                  </h3>
                </div>

                <!-- Contenu -->
                <div class="p-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nom -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Nom</label>
                      <p class="text-base font-semibold text-gray-900">{{ currentPartner()!.name }}</p>
                    </div>

                    <!-- Email -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p class="text-base text-gray-900">{{ currentPartner()!.contactEmail }}</p>
                    </div>

                    <!-- Téléphone -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Téléphone</label>
                      <p class="text-base text-gray-900">{{ currentPartner()!.contactPhone || 'Non renseigné' }}</p>
                    </div>

                    <!-- Partner ID -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Partner ID</label>
                      <p class="text-base text-gray-900 font-mono text-sm">{{ currentPartner()!.partnerId }}</p>
                    </div>

                    <!-- Taux de commission -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Taux de Commission</label>
                      <p class="text-base font-semibold text-indigo-600">{{ currentPartner()!.commissionRate }}%</p>
                    </div>

                    <!-- Secteur d'activité -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Secteur d'Activité</label>
                      <p class="text-base text-gray-900">{{ currentPartner()!.businessSector || 'Non renseigné' }}</p>
                    </div>

                    <!-- Montant max de crédit -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Crédit Maximum</label>
                      <p class="text-base font-semibold text-gray-900">{{ formatCurrency(currentPartner()!.maxCreditAmount) }}</p>
                    </div>

                    <!-- Durée max -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Durée Maximum</label>
                      <p class="text-base text-gray-900">{{ currentPartner()!.maxDurationMonths }} mois</p>
                    </div>

                    <!-- Numéro d'enregistrement -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Numéro d'Enregistrement</label>
                      <p class="text-base text-gray-900">{{ currentPartner()!.registrationNumber || 'Non renseigné' }}</p>
                    </div>

                    <!-- Date de création -->
                    <div>
                      <label class="block text-sm font-medium text-gray-500 mb-1">Date de Création</label>
                      <p class="text-base text-gray-900">{{ formatDate(currentPartner()!.createdAt) }}</p>
                    </div>

                    <!-- Description (full width) -->
                    @if (currentPartner()!.description) {
                      <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-gray-500 mb-1">Description</label>
                        <p class="text-base text-gray-900">{{ currentPartner()!.description }}</p>
                      </div>
                    }
                  </div>

                  <!-- Statistiques -->
                  <div class="mt-6 pt-6 border-t border-gray-200">
                    <h4 class="text-sm font-semibold text-gray-900 mb-4">Statistiques</h4>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div class="bg-blue-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600">Réservations Totales</p>
                        <p class="text-2xl font-bold text-blue-600">{{ currentPartner()!.totalReservations || 0 }}</p>
                      </div>
                      <div class="bg-green-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600">Volume Total</p>
                        <p class="text-2xl font-bold text-green-600">{{ formatCurrency(currentPartner()!.totalCreditVolume || 0) }}</p>
                      </div>
                      <div class="bg-purple-50 rounded-lg p-4">
                        <p class="text-sm text-gray-600">Commission Totale</p>
                        <p class="text-2xl font-bold text-purple-600">{{ formatCurrency(currentPartner()!.totalCommissionEarned || 0) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }

          <!-- Formulaire de création (réservé aux admins) -->
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

          <!-- Ancienne table (cachée car remplacée par la carte d'info) -->
          @if (false) {
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
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">
                          Aucun partenaire trouvé
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            }
          </div>
          }
        </div>
      </main>

      <app-footer />
    </div>
  `
})
export class PartnerComponent implements OnInit {
  private readonly partnerService = inject(PartnerService);
  private readonly authService = inject(AuthService);
  private readonly toastService = inject(ToastService);

  partners = signal<PartnerResponseDTO[]>([]);
  loading = signal(true);
  showCreateForm = signal(false);
  submitting = signal(false);
  currentPartner = signal<PartnerResponseDTO | null>(null);

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
    this.loadPartnerProfile();
  }

  loadPartnerProfile(): void {
    const partnerId = this.authService.getPartnerId();

    if (!partnerId) {
      this.toastService.error('Impossible de récupérer votre identifiant');
      this.loading.set(false);
      return;
    }

    this.partnerService.getPartnerById(partnerId).subscribe({
      next: (partner) => {
        this.currentPartner.set(partner);
        this.partners.set([partner]); // Afficher uniquement le partenaire connecté
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading partner profile:', error);
        this.toastService.error('Erreur lors du chargement de votre profil');
        this.loading.set(false);
      }
    });
  }

  loadPartners(): void {
    // Cette méthode n'est plus utilisée car un partenaire ne voit que son profil
    // Gardée pour compatibilité future (admin pourrait voir tous les partenaires)
    this.loadPartnerProfile();
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

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }
}
