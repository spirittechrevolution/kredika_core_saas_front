// Payment Instruction Models
export enum PaymentInstructionType {
  QR_CODE = 'QR_CODE',
  PAYMENT_LINK = 'PAYMENT_LINK',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentInstructionStatus {
  GENERATED = 'GENERATED',
  SENT = 'SENT',
  VIEWED = 'VIEWED',
  EXPIRED = 'EXPIRED',
  USED = 'USED',
  CANCELLED = 'CANCELLED'
}

export interface PaymentInstructionRequestDTO {
  installmentId: string;
  partnerId: string;
  amountDue: number;
  dueDate: Date;
  instructionType: string;
  instructionData?: string;
  paymentDescription?: string;
  callbackUrl?: string;
  validityHours?: number;
}

export interface PaymentInstructionResponseDTO {
  paymentInstructionId: string;
  installmentId: string;
  partnerId: string;
  amountDue: number;
  dueDate: Date;
  instructionType: string;
  instructionData?: string;
  paymentDescription?: string;
  status: PaymentInstructionStatus;
  generatedAt: Date;
  sentAt?: Date;
  viewedAt?: Date;
  expiredAt?: Date;
  callbackUrl?: string;
  validityHours?: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}
