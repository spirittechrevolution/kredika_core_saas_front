// Payment Event Models
export enum PaymentEventType {
  PAYMENT_INITIATED = 'PAYMENT_INITIATED',
  PAYMENT_CONFIRMED = 'PAYMENT_CONFIRMED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_PENDING = 'PAYMENT_PENDING',
  PAYMENT_CANCELLED = 'PAYMENT_CANCELLED',
  PAYMENT_REFUNDED = 'PAYMENT_REFUNDED',
  PAYMENT_PARTIAL = 'PAYMENT_PARTIAL',
  PAYMENT_RETRY = 'PAYMENT_RETRY'
}

export interface PaymentEventRequestDTO {
  installmentId: string;
  partnerId: string;
  externalPaymentRef: string;
  eventType: PaymentEventType;
  amount: number;
  currency?: string;
  eventDate?: Date;
  eventMetadata?: Record<string, any>;
  source?: string;
  notes?: string;
  providerCode?: string;
  customerPhone?: string;
  sessionId?: string;
}

export interface PaymentEventResponseDTO {
  paymentEventId: string;
  installmentId: string;
  partnerId: string;
  externalPaymentRef: string;
  eventType: PaymentEventType;
  amount: number;
  currency?: string;
  eventDate: Date;
  eventMetadata?: Record<string, any>;
  source?: string;
  notes?: string;
  providerCode?: string;
  customerPhone?: string;
  sessionId?: string;
  isSuccessful: boolean;
  processingDurationMs?: number;
  createdAt: Date;
}
