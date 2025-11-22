/**
 * Modèles pour la gestion des limites de crédit des partenaires
 */

/**
 * Configuration des limites de crédit pour un partenaire
 */
export interface CreditLimitsUpdateDTO {
  maxCreditAmount?: number;              // Montant maximum de crédit autorisé
  maxDurationMonths?: number;            // Durée maximum en mois (min: 1)
  commissionRate?: number;               // Taux de commission en % (min: 0)
  defaultInterestRate?: number;          // Taux d'intérêt par défaut en % (min: 0)
  totalActiveCredits?: number;           // Nombre max de crédits actifs (min: 0)
}

/**
 * Réponse détaillée des limites de crédit d'un partenaire
 */
export interface CreditLimitsResponseDTO {
  // Identifiants
  partnerKey: string;
  partnerName: string;

  // Limites configurées
  maxCreditAmount: number;
  maxDurationMonths: number;
  commissionRate: number;
  defaultInterestRate: number;

  // Statistiques actuelles
  totalActiveCredits: number;
  totalCreditVolume: number;
  portfolioPerformanceScore: number;

  // Utilisation et disponibilité
  utilizationRate: number;               // % d'utilisation (0-100)
  remainingCreditLimit: number;          // Montant restant disponible
  hasAvailableCredit: boolean;
  estimatedRemainingCredits: number;     // Nombre de crédits pouvant encore être créés
  averageCreditAmount: number;           // Montant moyen par crédit actif

  updatedAt: Date;
}

/**
 * Résumé de l'utilisation du crédit
 */
export interface CreditUtilizationSummaryDTO {
  totalLimit: number;
  usedAmount: number;
  availableAmount: number;
  utilizationPercentage: number;
  activeCreditsCount: number;
  averagePerCredit: number;
  status: CreditLimitStatus;
  warning?: string;
}

/**
 * Statut des limites de crédit
 */
export enum CreditLimitStatus {
  HEALTHY = 'HEALTHY',           // Utilisation < 70%
  WARNING = 'WARNING',           // Utilisation 70-90%
  CRITICAL = 'CRITICAL',         // Utilisation > 90%
  EXCEEDED = 'EXCEEDED'          // Limite dépassée
}

/**
 * Historique de modification des limites
 */
export interface CreditLimitHistoryDTO {
  changeId: string;
  partnerId: string;
  changedAt: Date;
  changedBy: string;
  previousLimits: CreditLimitsUpdateDTO;
  newLimits: CreditLimitsUpdateDTO;
  reason?: string;
  approvedBy?: string;
}

/**
 * Recommandations d'ajustement des limites
 */
export interface CreditLimitRecommendationDTO {
  partnerId: string;
  currentUtilization: number;
  performanceScore: number;
  defaultRate: number;

  recommendation: 'INCREASE' | 'DECREASE' | 'MAINTAIN';
  suggestedMaxAmount?: number;
  suggestedMaxCredits?: number;

  reasoning: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  confidenceScore: number;           // 0-100
}

/**
 * Alerte de limite de crédit
 */
export interface CreditLimitAlertDTO {
  alertId: string;
  partnerId: string;
  partnerName: string;
  alertType: CreditLimitAlertType;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  currentUtilization: number;
  threshold: number;
  triggeredAt: Date;
  acknowledged: boolean;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
}

export enum CreditLimitAlertType {
  APPROACHING_LIMIT = 'APPROACHING_LIMIT',       // Proche de la limite (80%)
  LIMIT_REACHED = 'LIMIT_REACHED',               // Limite atteinte (95%)
  LIMIT_EXCEEDED = 'LIMIT_EXCEEDED',             // Limite dépassée
  PERFORMANCE_DROP = 'PERFORMANCE_DROP',         // Baisse de performance
  HIGH_DEFAULT_RATE = 'HIGH_DEFAULT_RATE'        // Taux de défaut élevé
}
