import { Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerRequestDTO } from '../../models';

@Component({
  selector: 'app-partner-modal',
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
                      {{ editMode() ? 'Modifier le partenaire' : 'Nouveau partenaire' }}
                    </h3>
                    <div class="mt-6 space-y-4">
                      <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Nom *</label>
                        <input
                          type="text"
                          id="name"
                          [(ngModel)]="formData.name"
                          name="name"
                          required
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="contactEmail" class="block text-sm font-medium text-gray-700">Email *</label>
                        <input
                          type="email"
                          id="contactEmail"
                          [(ngModel)]="formData.contactEmail"
                          name="contactEmail"
                          required
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="contactPhone" class="block text-sm font-medium text-gray-700">Téléphone</label>
                        <input
                          type="tel"
                          id="contactPhone"
                          [(ngModel)]="formData.contactPhone"
                          name="contactPhone"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="callbackUrl" class="block text-sm font-medium text-gray-700">URL de Callback *</label>
                        <input
                          type="url"
                          id="callbackUrl"
                          [(ngModel)]="formData.callbackUrl"
                          name="callbackUrl"
                          required
                          placeholder="https://example.com/callback"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="commissionRate" class="block text-sm font-medium text-gray-700">Taux de Commission (%) *</label>
                        <input
                          type="number"
                          id="commissionRate"
                          [(ngModel)]="formData.commissionRate"
                          name="commissionRate"
                          required
                          min="0"
                          max="100"
                          step="0.01"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="maxCreditAmount" class="block text-sm font-medium text-gray-700">Montant Maximum de Crédit *</label>
                        <input
                          type="number"
                          id="maxCreditAmount"
                          [(ngModel)]="formData.maxCreditAmount"
                          name="maxCreditAmount"
                          required
                          min="0"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="maxDurationMonths" class="block text-sm font-medium text-gray-700">Durée Maximum (mois) *</label>
                        <input
                          type="number"
                          id="maxDurationMonths"
                          [(ngModel)]="formData.maxDurationMonths"
                          name="maxDurationMonths"
                          required
                          min="1"
                          max="24"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="businessSector" class="block text-sm font-medium text-gray-700">Secteur d'Activité</label>
                        <input
                          type="text"
                          id="businessSector"
                          [(ngModel)]="formData.businessSector"
                          name="businessSector"
                          class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                          id="description"
                          [(ngModel)]="formData.description"
                          name="description"
                          rows="3"
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
                  {{ editMode() ? 'Modifier' : 'Créer' }}
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
export class PartnerModalComponent {
  @Input() set open(value: boolean) {
    this.isOpen.set(value);
  }

  @Input() set partner(value: PartnerRequestDTO | null) {
    if (value) {
      this.formData = { ...value };
      this.editMode.set(true);
    } else {
      this.resetForm();
      this.editMode.set(false);
    }
  }

  @Output() closeModal = new EventEmitter<void>();
  @Output() submitPartner = new EventEmitter<PartnerRequestDTO>();

  isOpen = signal(false);
  editMode = signal(false);

  formData: PartnerRequestDTO = {
    name: '',
    contactEmail: '',
    contactPhone: '',
    callbackUrl: '',
    commissionRate: 0,
    maxCreditAmount: 0,
    maxDurationMonths: 12
  };

  onSubmit(): void {
    this.submitPartner.emit(this.formData);
    this.close();
  }

  close(): void {
    this.isOpen.set(false);
    this.closeModal.emit();
    this.resetForm();
  }

  private resetForm(): void {
    this.formData = {
      name: '',
      contactEmail: '',
      contactPhone: '',
      callbackUrl: '',
      commissionRate: 0,
      maxCreditAmount: 0,
      maxDurationMonths: 12
    };
  }
}
