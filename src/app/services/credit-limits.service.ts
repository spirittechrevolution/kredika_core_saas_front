import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreditLimitsUpdateDTO,
  CreditLimitsResponseDTO,
  CreditUtilizationSummaryDTO
} from '../models';

/**
 * Service de gestion des limites de crédit des partenaires
 */
@Injectable({
  providedIn: 'root'
})
export class CreditLimitsService {
  private readonly API_URL = 'http://localhost:7575/api/v1/partners';

  constructor(private readonly http: HttpClient) {}

  /**
   * Récupère les limites de crédit d'un partenaire
   */
  getCreditLimits(partnerId: string): Observable<CreditLimitsResponseDTO> {
    return this.http.get<CreditLimitsResponseDTO>(`${this.API_URL}/${partnerId}/credit-limits`);
  }

  /**
   * Met à jour les limites de crédit d'un partenaire
   */
  updateCreditLimits(partnerId: string, limits: CreditLimitsUpdateDTO): Observable<CreditLimitsResponseDTO> {
    return this.http.patch<CreditLimitsResponseDTO>(`${this.API_URL}/${partnerId}/credit-limits`, limits);
  }

  /**
   * Recalcule le volume de crédit d'un partenaire
   */
  recalculateCreditVolume(partnerId: string): Observable<CreditLimitsResponseDTO> {
    return this.http.post<CreditLimitsResponseDTO>(`${this.API_URL}/${partnerId}/recalculate-volume`, {});
  }

  /**
   * Calcule le résumé d'utilisation du crédit
   */
  calculateUtilizationSummary(limits: CreditLimitsResponseDTO): CreditUtilizationSummaryDTO {
    const totalLimit = limits.maxCreditAmount;
    const usedAmount = limits.totalCreditVolume;
    const availableAmount = limits.remainingCreditLimit;
    const utilizationPercentage = limits.utilizationRate;

    let status: any = 'HEALTHY';
    let warning: string | undefined;

    if (utilizationPercentage >= 100) {
      status = 'EXCEEDED';
      warning = 'Limite de crédit dépassée';
    } else if (utilizationPercentage >= 90) {
      status = 'CRITICAL';
      warning = 'Limite de crédit critique (>90%)';
    } else if (utilizationPercentage >= 70) {
      status = 'WARNING';
      warning = 'Limite de crédit élevée (>70%)';
    }

    return {
      totalLimit,
      usedAmount,
      availableAmount,
      utilizationPercentage,
      activeCreditsCount: limits.totalActiveCredits,
      averagePerCredit: limits.averageCreditAmount,
      status,
      warning
    };
  }

  /**
   * Détermine si le partenaire peut créer un nouveau crédit
   */
  canCreateCredit(limits: CreditLimitsResponseDTO, requestedAmount: number): boolean {
    return limits.hasAvailableCredit && requestedAmount <= limits.remainingCreditLimit;
  }

  /**
   * Calcule le nombre maximum de crédits créables avec un montant moyen
   */
  calculateMaxCreditsWithAverageAmount(limits: CreditLimitsResponseDTO): number {
    if (limits.averageCreditAmount <= 0) {
      return 0;
    }
    return Math.floor(limits.remainingCreditLimit / limits.averageCreditAmount);
  }
}
