import type { PaymentEventResponseDTO } from './payment-event.model';
import type { PaymentInstructionResponseDTO } from './payment-instruction.model';

// Installment Models
export enum InstallmentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  LATE = 'LATE',
  CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
  CASH = 'CASH',
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE_MONEY',
  CARD = 'CARD',
  TRANSFER = 'TRANSFER'
}

export interface InstallmentDTO {
  installmentId: string;
  notes?: string;
  transactionReference?: string;
  paymentMethod?: PaymentMethod;
  paidAmount?: number;
  paidDate?: Date;
  status: InstallmentStatus;
  amount: number;
  dueDate: Date;
  installmentNumber: number;
  principalAmount: number;
  interestAmount: number;
  lateFee?: number;
  daysLate?: number;
  paymentAttemptCount?: number;
  firstPaymentAttempt?: Date;
  lastPaymentAttempt?: Date;
  daysEarly?: number;
  hasLatePayment: boolean;
  paymentPattern?: string;
  totalPaidAmount: number;
  reminderCount?: number;
  autoPaid: boolean;
  creditReservationId: string;
  paymentEvents?: PaymentEventResponseDTO[];
  paymentInstructions?: PaymentInstructionResponseDTO[];
  paymentAnalytics?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
