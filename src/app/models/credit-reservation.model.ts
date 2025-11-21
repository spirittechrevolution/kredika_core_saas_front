import type { InstallmentDTO } from './installment.model';

// Credit Reservation Models
export enum ReservationStatus {
  RESERVED = 'RESERVED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  DEFAULTED = 'DEFAULTED',
  CANCELLED = 'CANCELLED'
}

export interface CreditReservationRequestDTO {
  partnerId: string;
  externalOrderRef: string;
  externalCustomerRef: string;
  purchaseAmount: number;
  installmentCount: number;
  notes?: string;
  totalActiveCredits?: number;
}

export interface CreditReservationResponseDTO {
  creditReservationId: string;
  partnerId: string;
  externalOrderRef: string;
  externalCustomerRef: string;
  purchaseAmount: number;
  installmentCount: number;
  status: ReservationStatus;
  paymentPlanJson?: string;
  reservationDate: Date;
  expectedCompletionDate?: Date;
  actualCompletionDate?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  interestAmount: number;
  monthlyPayment: number;
  downPaymentAmount: number;
  installments?: InstallmentDTO[];
  repaymentRate: number;
  totalInstallmentsPaid: number;
  totalInstallmentsLate: number;
  overallPaymentBehavior?: string;
  portfolioAnalytics?: Record<string, any>;
  hasDefaulted: boolean;
  firstDefaultDate?: Date;
}

export interface ReservationStatsDTO {
  totalReservations: number;
  activeReservations: number;
  completedReservations: number;
  cancelledReservations: number;
  defaultedReservations: number;
  totalAmount: number;
  averageAmount: number;
}
