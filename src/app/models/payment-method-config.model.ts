/**
 * Configuration des méthodes de paiement pour un partenaire
 */

export interface FeeTierDTO {
  minAmount: number;
  maxAmount: number;
  feeAmount?: number;
  feePercentage?: number;
}

export interface MobileMoneyFeesDTO {
  type: string;              // 'FIXED', 'PERCENTAGE', 'TIERED'
  value?: number;
  paidBy: string;            // 'CUSTOMER', 'MERCHANT', 'SHARED'
  minAmount?: number;
  maxAmount?: number;
  tiers?: FeeTierDTO[];
}

export interface TransactionLimitsDTO {
  minAmount: number;
  maxAmount: number;
  dailyLimit?: number;
  monthlyLimit?: number;
}

export interface MobileMoneyConfigDTO {
  provider: string;                          // 'WAVE', 'ORANGE_MONEY', 'MTN_MONEY', etc.
  displayName: string;
  enabled: boolean;
  merchantCode?: string;
  merchantName?: string;
  merchantPhone?: string;                    // Format: +[0-9]{9,15}
  shortCode?: string;
  ussdCode?: string;                         // Code USSD complet ex: *144*01#
  ussdTemplate?: string;                     // Template avec variables ex: *144*{{amount}}*{{ref}}#
  qrCodeData?: string;
  qrCodeTemplate?: string;
  apiCallbackUrl?: string;
  logoUrl?: string;
  brandColor?: string;                       // Hex color ex: #FF6B00
  instructions?: { [lang: string]: string }; // Instructions multilingues
  paymentSteps?: { [lang: string]: string[] }; // Étapes de paiement par langue
  fees?: MobileMoneyFeesDTO;
  supportedCountries?: string[];             // Codes pays ISO-3
  supportedCurrencies?: string[];            // Codes devise ISO-3
  limits?: TransactionLimitsDTO;
  metadata?: any;
}

export interface BankTransferConfigDTO {
  enabled: boolean;
  bankCode?: string;
  bankName?: string;
  branchName?: string;
  accountName?: string;
  accountNumber?: string;
  iban?: string;
  swiftCode?: string;
  ribCode?: string;
  logoUrl?: string;
  instructions?: { [lang: string]: string };
  paymentSteps?: { [lang: string]: string[] };
  fees?: MobileMoneyFeesDTO;
  processingTime?: string;                   // ex: "1-3 business days"
  country?: string;                          // Code pays ISO-3
  currency?: string;                         // Code devise ISO-3
}

export interface PaymentLocationDTO {
  locationId?: string;
  name: string;
  type: string;                              // 'AGENCY', 'SHOP', 'KIOSK', 'OFFICE'
  address: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;                           // Code pays ISO-3
  phone?: string;                            // Format: +[0-9]{9,15}
  openingHours?: string;                     // ex: "Mon-Fri: 9h-18h, Sat: 9h-13h"
  latitude?: number;
  longitude?: number;
  active: boolean;
  instructions?: { [lang: string]: string };
}

export interface CashPaymentConfigDTO {
  enabled: boolean;
  locations?: PaymentLocationDTO[];
  instructions?: { [lang: string]: string };
  requiredDocuments?: string[];              // ex: ["ID Card", "Reference Number"]
  metadata?: any;
}

export interface PartnerPaymentMethodsDTO {
  mobileMoneyProviders?: MobileMoneyConfigDTO[];
  bankTransfer?: BankTransferConfigDTO;
  cash?: CashPaymentConfigDTO;
  preferredMethod?: string;                  // 'MOBILE_MONEY', 'BANK_TRANSFER', 'CASH'
  displayOrder?: string[];                   // Ordre d'affichage des méthodes
  defaultCurrency?: string;                  // Code devise ISO-3 (ex: 'XOF', 'USD')
  defaultCountry?: string;                   // Code pays ISO-3 (ex: 'SEN', 'CIV')
  metadata?: any;
}

/**
 * Réponse de prévisualisation d'instruction de paiement
 */
export interface PaymentInstructionPreviewDTO {
  reference: string;
  amount: number;
  language: string;
  instructionContent: any;
  mobileMoneyOptions?: MobileMoneyConfigDTO[];
  bankTransferOption?: BankTransferConfigDTO;
  cashOption?: CashPaymentConfigDTO;
  generatedAt: Date;
}

/**
 * Vérification de la capacité à générer des instructions
 */
export interface CanGenerateInstructionsDTO {
  canGenerate: boolean;
  hasPaymentMethods: boolean;
  isActive: boolean;
  activeMethodsCount: number;
  missingConfiguration?: string[];
  message?: string;
}
