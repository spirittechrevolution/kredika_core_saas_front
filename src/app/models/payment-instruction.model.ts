/**
 * Modèles pour la gestion des instructions de paiement
 */

export enum PaymentInstructionStatus {
  GENERATED = 'GENERATED',   // Instruction générée
  SENT = 'SENT',            // Instruction envoyée au client
  VIEWED = 'VIEWED',        // Instruction vue par le client
  EXPIRED = 'EXPIRED',      // Instruction expirée
  USED = 'USED',            // Instruction utilisée (paiement effectué)
  CANCELLED = 'CANCELLED'   // Instruction annulée
}

export enum PaymentInstructionType {
  STANDARD = 'STANDARD',                  // Instruction standard
  REMINDER_3_DAYS = 'REMINDER_3_DAYS',   // Rappel 3 jours avant
  REMINDER_1_DAY = 'REMINDER_1_DAY',     // Rappel 1 jour avant
  URGENT = 'URGENT',                     // Instruction urgente
  OVERDUE = 'OVERDUE'                    // Paiement en retard
}

export enum PaymentChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  PUSH = 'PUSH',
  WEB = 'WEB'
}

/**
 * Requête de génération d'instruction de paiement
 */
export interface PaymentInstructionRequestDTO {
  installmentId: string;
  partnerId: string;
  amountDue: number;
  dueDate: Date;
  instructionType: PaymentInstructionType;
  language?: string;                     // Default: 'fr'
  channel?: PaymentChannel;              // Default: 'SMS'
  validityHours?: number;                // Default: 48
  callbackUrl?: string;
  customFields?: any;
}

/**
 * Réponse d'instruction de paiement
 */
export interface PaymentInstructionResponseDTO {
  paymentInstructionId: string;
  installmentId: string;
  partnerId: string;
  amountDue: number;
  dueDate: Date;
  reference: string;                     // Référence unique (ex: KRD-202411-ABC123)
  instructionType: PaymentInstructionType;
  language: string;
  channel: PaymentChannel;

  // Contenu enrichi de l'instruction
  instructionContent?: {
    mobileMoneyInstructions?: any[];     // Instructions Mobile Money (Wave, Orange, etc.)
    bankTransferInstructions?: any;      // Instructions virement bancaire
    cashInstructions?: any;              // Instructions paiement espèces
    header?: string;
    footer?: string;
    urgencyLevel?: string;
  };

  shortDescription?: string;             // Description courte pour SMS
  instructionData?: string;              // Données complètes JSON (legacy)
  paymentDescription?: string;           // Description du paiement (legacy)

  status: PaymentInstructionStatus;

  // Dates de tracking
  generatedAt: Date;
  sentAt?: Date;
  viewedAt?: Date;
  expiredAt?: Date;

  callbackUrl?: string;
  validityHours: number;
  metadata?: any;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * Statistiques d'engagement des instructions
 */
export interface InstructionEngagementMetricsDTO {
  totalInstructions: number;
  sentInstructions: number;
  viewedInstructions: number;
  expiredInstructions: number;
  usedInstructions: number;

  viewRate: number;                      // Taux de visualisation (%)
  usageRate: number;                     // Taux d'utilisation (%)
  expirationRate: number;                // Taux d'expiration (%)

  averageViewDelayMinutes?: number;      // Délai moyen de visualisation
  averageUsageDelayMinutes?: number;     // Délai moyen d'utilisation

  lastGenerated?: Date;
  lastSent?: Date;
  lastViewed?: Date;
}

/**
 * Statistiques par langue
 */
export interface InstructionLanguageStatsDTO {
  language: string;
  count: number;
  percentage: number;
  viewRate: number;
  usageRate: number;
}

/**
 * Statistiques par canal
 */
export interface InstructionChannelStatsDTO {
  channel: PaymentChannel;
  count: number;
  percentage: number;
  sentCount: number;
  viewedCount: number;
  usedCount: number;
}

/**
 * Résumé des statistiques globales
 */
export interface InstructionGlobalStatsDTO {
  totalInstructions: number;
  activeInstructions: number;
  expiredInstructions: number;
  usedInstructions: number;
  totalPartners: number;
  totalAmountDue: number;
  averageAmountDue: number;
  topLanguage: string;
  topChannel: PaymentChannel;
}

/**
 * Réponse de validation de référence
 */
export interface PaymentReferenceValidationDTO {
  valid: boolean;
  reference?: string;
  instructionId?: string;
  status?: PaymentInstructionStatus;
  amountDue?: number;
  dueDate?: Date;
  partnerId?: string;
  message?: string;
}

/**
 * Filtre pour lister les instructions
 */
export interface PaymentInstructionFilter {
  partnerId?: string;
  installmentId?: string;
  status?: PaymentInstructionStatus;
  instructionType?: PaymentInstructionType;
  language?: string;
  channel?: PaymentChannel;
  dateFrom?: Date;
  dateTo?: Date;
  onlyActive?: boolean;
  onlyExpired?: boolean;
}
