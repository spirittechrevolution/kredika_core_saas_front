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
}

export interface CreditLimitsUpdateDTO {
  maxCreditAmount?: number;
  maxDurationMonths?: number;
  commissionRate?: number;
  defaultInterestRate?: number;
  totalActiveCredits?: number;
}

export interface CreditLimitsResponseDTO {
  partnerKey: string;
  partnerName: string;
  maxCreditAmount: number;
  maxDurationMonths: number;
  commissionRate: number;
  defaultInterestRate: number;
  totalActiveCredits: number;
  totalCreditVolume: number;
  portfolioPerformanceScore: number;
  updatedAt: Date;
  utilizationRate: number;
  remainingCreditLimit: number;
  hasAvailableCredit: boolean;
  estimatedRemainingCredits: number;
  averageCreditAmount: number;
}
