import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  PaymentMethodConfigService,
  ToastService,
  AuthService
} from '../../services';
import {
  PartnerPaymentMethodsDTO,
  MobileMoneyConfigDTO,
  BankTransferConfigDTO,
  CashPaymentConfigDTO,
  PaymentLocationDTO
} from '../../models';

@Component({
  selector: 'app-payment-methods-config',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './payment-methods-config.component.html',
  styleUrl: './payment-methods-config.component.css'
})
export class PaymentMethodsConfigComponent implements OnInit {
  private readonly paymentMethodService = inject(PaymentMethodConfigService);
  private readonly toastService = inject(ToastService);
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  partnerId = '355a950b-994c-430a-ab2d-a021e1bc11de'; // Jumia Sénégal UUID, will be replaced by auth token
  paymentMethods: PartnerPaymentMethodsDTO | null = null;
  loading = true;
  saving = false;
  activeTab: 'mobile-money' | 'bank-transfer' | 'cash' = 'mobile-money';

  // Mobile Money providers
  availableProviders = [
    { code: 'WAVE', name: 'Wave', color: '#00D9FF' },
    { code: 'ORANGE_MONEY', name: 'Orange Money', color: '#FF6B00' },
    { code: 'MTN_MONEY', name: 'MTN Mobile Money', color: '#FFCC00' },
    { code: 'FREE_MONEY', name: 'Free Money', color: '#E60000' }
  ];

  ngOnInit(): void {
    // Try to get partnerId from auth token
    const authPartnerId = this.authService.getPartnerId();
    if (authPartnerId) {
      this.partnerId = authPartnerId;
    }
    this.loadPaymentMethods();
  }

  loadPaymentMethods(): void {
    this.loading = true;
    console.log('Loading payment methods for partner:', this.partnerId);
    this.paymentMethodService.getPaymentMethods(this.partnerId).subscribe({
      next: (data) => {
        console.log('Payment methods loaded:', data);
        this.paymentMethods = data;
        this.loading = false;
        this.cdr.detectChanges();
        // Don't show toast on initial load, only on save/update operations
      },
      error: (error) => {
        console.error('Error loading payment methods:', error);
        this.loading = false;
        this.cdr.detectChanges();
        this.toastService.error('Erreur lors du chargement');
        // Initialize empty config if not found
        this.paymentMethods = {
          mobileMoneyProviders: [],
          defaultCurrency: 'XOF',
          defaultCountry: 'SEN'
        };
      }
    });
  }

  saveConfiguration(): void {
    if (!this.paymentMethods) return;

    this.saving = true;
    this.paymentMethodService.configurePaymentMethods(this.partnerId, this.paymentMethods).subscribe({
      next: () => {
        this.toastService.success('Configuration enregistrée avec succès');
        this.saving = false;
      },
      error: (error) => {
        console.error('Error saving payment methods:', error);
        this.toastService.error('Erreur lors de l\'enregistrement');
        this.saving = false;
      }
    });
  }

  addMobileMoneyProvider(providerCode: string): void {
    if (!this.paymentMethods) {
      this.paymentMethods = {
        mobileMoneyProviders: [],
        defaultCurrency: 'XOF',
        defaultCountry: 'SEN'
      };
    }

    if (!this.paymentMethods.mobileMoneyProviders) {
      this.paymentMethods.mobileMoneyProviders = [];
    }

    const provider = this.availableProviders.find(p => p.code === providerCode);
    if (!provider) return;

    // Check if already exists
    const exists = this.paymentMethods.mobileMoneyProviders.some(p => p.provider === providerCode);
    if (exists) {
      this.toastService.warning('Ce provider existe déjà');
      return;
    }

    const newProvider: MobileMoneyConfigDTO = {
      provider: providerCode,
      displayName: provider.name,
      enabled: true,
      brandColor: provider.color,
      supportedCountries: ['SEN'],
      supportedCurrencies: ['XOF'],
      instructions: {
        'fr': 'Instructions de paiement en français',
        'en': 'Payment instructions in English'
      }
    };

    this.paymentMethods.mobileMoneyProviders.push(newProvider);
    this.toastService.success(`${provider.name} ajouté`);
  }

  removeMobileMoneyProvider(index: number): void {
    if (!this.paymentMethods?.mobileMoneyProviders) return;

    const provider = this.paymentMethods.mobileMoneyProviders[index];
    this.paymentMethods.mobileMoneyProviders.splice(index, 1);
    this.toastService.info(`${provider.displayName} supprimé`);
  }

  toggleProviderEnabled(provider: MobileMoneyConfigDTO): void {
    provider.enabled = !provider.enabled;
  }

  enableBankTransfer(): void {
    if (!this.paymentMethods) {
      this.paymentMethods = {
        mobileMoneyProviders: [],
        defaultCurrency: 'XOF',
        defaultCountry: 'SEN'
      };
    }

    this.paymentMethods.bankTransfer = {
      enabled: true,
      country: 'SEN',
      currency: 'XOF',
      instructions: {
        'fr': 'Effectuez un virement bancaire',
        'en': 'Make a bank transfer'
      }
    };
  }

  enableCashPayment(): void {
    if (!this.paymentMethods) {
      this.paymentMethods = {
        mobileMoneyProviders: [],
        defaultCurrency: 'XOF',
        defaultCountry: 'SEN'
      };
    }

    this.paymentMethods.cash = {
      enabled: true,
      locations: [],
      instructions: {
        'fr': 'Paiement en espèces à nos agences',
        'en': 'Cash payment at our agencies'
      }
    };
  }

  addCashLocation(): void {
    if (!this.paymentMethods?.cash) return;

    if (!this.paymentMethods.cash.locations) {
      this.paymentMethods.cash.locations = [];
    }

    const newLocation: PaymentLocationDTO = {
      name: 'Nouvelle agence',
      type: 'AGENCY',
      address: '',
      city: '',
      country: 'SEN',
      active: true
    };

    this.paymentMethods.cash.locations.push(newLocation);
  }

  removeCashLocation(index: number): void {
    if (!this.paymentMethods?.cash?.locations) return;
    this.paymentMethods.cash.locations.splice(index, 1);
  }

  previewInstruction(): void {
    this.paymentMethodService.previewPaymentInstruction(this.partnerId, 'fr', 25000).subscribe({
      next: (preview) => {
        console.log('Preview:', preview);
        this.toastService.info('Aperçu généré (voir console)');
        // TODO: Open preview modal
      },
      error: (error) => {
        console.error('Error previewing:', error);
        this.toastService.error('Erreur lors de la prévisualisation');
      }
    });
  }
}
