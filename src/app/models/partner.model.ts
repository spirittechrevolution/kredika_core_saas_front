import { PartnerPaymentMethodsDTO } from './payment-method-config.model';

// Partner Models
export enum PartnerStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  INACTIVE = 'INACTIVE'
}

export interface PartnerRequestDTO {
  name: string;
  contactEmail: string;
  contactPhone: string;
  callbackUrl: string;
  apiKey?: string;
  commissionRate: number;
  maxCreditAmount: number;
  maxDurationMonths: number;
  active?: boolean;
  description?: string;
  businessSector?: string;
  registrationNumber?: string;
  maxCreditsPerMonth?: number;
  paymentMethods?: PartnerPaymentMethodsDTO;
}

export interface PartnerResponseDTO {
  partnerId: string;
  name: string;
  contactEmail: string;
  contactPhone?: string;
  callbackUrl: string;
  apiKey?: string;
  partnerKey: string;
  commissionRate: number;
  maxCreditAmount: number;
  maxDurationMonths: number;
  active: boolean;
  description?: string;
  businessSector?: string;
  registrationNumber?: string;
  createdAt: Date;
  updatedAt: Date;
  totalReservations: number;
  totalCreditVolume: number;
  totalCommissionEarned: number;
  status: PartnerStatus;
  portfolioPerformanceScore: number;
  defaultRate: number;
  latePaymentRate: number;
  totalActiveCredits: number;
  totalCompletedCredits: number;
  partnerMetrics?: Record<string, any>;
  lastMetricsUpdate?: Date;
  maxCreditsPerMonth?: number;
  apiKeyVersion?: number;
  apiKeyLastRotated?: Date;
  apiKeyExpiresAt?: Date;
  authProvider?: string;
  lastLoginAt?: Date;

  // Nouvelles propriétés pour méthodes de paiement
  paymentMethods?: PartnerPaymentMethodsDTO;
  hasPaymentMethodsConfigured?: boolean;
  activePaymentMethodsCount?: number;
}
