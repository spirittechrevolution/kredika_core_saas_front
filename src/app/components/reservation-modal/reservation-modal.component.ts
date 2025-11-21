import { Component, EventEmitter, Output, signal, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditReservationRequestDTO, PartnerResponseDTO } from '../../models';
import { PartnerService } from '../../services';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <!-- Background overlay -->
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            (click)="close()"
          ></div>

          <!-- Modal panel -->
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <form (ngSubmit)="onSubmit()">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Nouvelle Réservation de Crédit
                    </h3>
                    <div class="mt-6 space-y-4">
                      <div>
                        <label for="partnerId" class="block text-sm font-medium text-gray-700">Partenaire *</label>
                        <select
                          id="partnerId"
                          [(ngModel)]="formData.partnerId"
                          name="partnerId"
                          required
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez un partenaire</option>
                          @for (partner of partners(); track partner.partnerId) {
                            <option [value]="partner.partnerId">{{ partner.name }}</option>
                          }
                        </select>
                      </div>

                      <div>
                        <label for="externalCustomerRef" class="block text-sm font-medium text-gray-700">Référence Client *</label>
                        <input
                          type="text"
                          id="externalCustomerRef"
                          [(ngModel)]="formData.externalCustomerRef"
                          name="externalCustomerRef"
                          required
                          placeholder="ex: CLIENT-12345"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="externalOrderRef" class="block text-sm font-medium text-gray-700">Référence Commande *</label>
                        <input
                          type="text"
                          id="externalOrderRef"
                          [(ngModel)]="formData.externalOrderRef"
                          name="externalOrderRef"
                          required
                          placeholder="ex: ORD-2024-001"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="purchaseAmount" class="block text-sm font-medium text-gray-700">Montant de l'Achat (€) *</label>
                        <input
                          type="number"
                          id="purchaseAmount"
                          [(ngModel)]="formData.purchaseAmount"
                          name="purchaseAmount"
                          required
                          min="0"
                          step="0.01"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="downPayment" class="block text-sm font-medium text-gray-700">Nombre d'Échéances *</label>
                        <select
                          id="downPayment"
                          [(ngModel)]="formData.installmentCount"
                          name="installmentCount"
                          required
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez le nombre d'échéances</option>
                          <option [value]="3">3 échéances</option>
                          <option [value]="6">6 échéances</option>
                          <option [value]="9">9 échéances</option>
                          <option [value]="12">12 échéances</option>
                          <option [value]="18">18 échéances</option>
                          <option [value]="24">24 échéances</option>
                        </select>
                      </div>

                      <div>
                        <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          id="notes"
                          [(ngModel)]="formData.notes"
                          name="notes"
                          rows="3"
                          placeholder="Notes additionnelles sur la réservation"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Créer la Réservation
                </button>
                <button
                  type="button"
                  (click)="close()"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    }
  `
})
export class ReservationModalComponent implements OnInit {
  private readonly partnerService = inject(PartnerService);

  @Input() set open(value: boolean) {
    this.isOpen.set(value);
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitReservation = new EventEmitter<CreditReservationRequestDTO>();

  isOpen = signal(false);
  partners = signal<PartnerResponseDTO[]>([]);
  metadataString = '';
  metadataError = signal('');

  formData: CreditReservationRequestDTO = {
    partnerId: '',
    externalOrderRef: '',
    externalCustomerRef: '',
    purchaseAmount: 0,
    installmentCount: 12
  };

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.partnerService.getAllPartners().subscribe({
      next: (data) => {
        this.partners.set(data.filter(p => p.active));
      },
      error: (error) => {
        console.error('Error loading partners:', error);
      }
    });
  }

  onSubmit(): void {
    this.submitReservation.emit(this.formData);
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
    this.closeModal.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      partnerId: '',
      externalOrderRef: '',
      externalCustomerRef: '',
      purchaseAmount: 0,
      installmentCount: 12
    };
    this.metadataError.set('');
  }
}
