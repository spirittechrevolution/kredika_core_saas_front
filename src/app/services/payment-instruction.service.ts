import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PaymentInstructionRequestDTO,
  PaymentInstructionResponseDTO,
  InstructionEngagementMetricsDTO,
  InstructionLanguageStatsDTO,
  InstructionChannelStatsDTO,
  InstructionGlobalStatsDTO,
  PaymentReferenceValidationDTO
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PaymentInstructionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/payment-instructions';

  /**
   * Générer une instruction de paiement
   */
  generatePaymentInstruction(
    instruction: PaymentInstructionRequestDTO
  ): Observable<PaymentInstructionResponseDTO> {
    return this.http.post<PaymentInstructionResponseDTO>(this.baseUrl, instruction);
  }

  /**
   * Récupérer une instruction par ID
   */
  getPaymentInstructionById(id: string): Observable<PaymentInstructionResponseDTO> {
    return this.http.get<PaymentInstructionResponseDTO>(`${this.baseUrl}/${id}`);
  }

  /**
   * Récupère une instruction par référence
   */
  getInstructionByReference(reference: string): Observable<PaymentInstructionResponseDTO> {
    return this.http.get<PaymentInstructionResponseDTO>(`${this.baseUrl}/reference/${reference}`);
  }

  /**
   * Lister les instructions par partenaire et statut
   */
  getInstructionsByPartnerAndStatus(
    partnerId: string,
    status?: string
  ): Observable<PaymentInstructionResponseDTO[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<PaymentInstructionResponseDTO[]>(
      `${this.baseUrl}/partner/${partnerId}`,
      { params }
    );
  }

  /**
   * Lister les instructions actives d'une échéance
   */
  getActiveInstructionsByInstallment(
    installmentId: string
  ): Observable<PaymentInstructionResponseDTO[]> {
    return this.http.get<PaymentInstructionResponseDTO[]>(
      `${this.baseUrl}/installment/${installmentId}/active`
    );
  }

  /**
   * Lister les instructions expirées
   */
  getExpiredInstructions(): Observable<PaymentInstructionResponseDTO[]> {
    return this.http.get<PaymentInstructionResponseDTO[]>(`${this.baseUrl}/expired`);
  }

  /**
   * Marquer une instruction comme vue
   */
  markInstructionAsViewed(id: string): Observable<PaymentInstructionResponseDTO> {
    return this.http.patch<PaymentInstructionResponseDTO>(`${this.baseUrl}/${id}/view`, null);
  }

  /**
   * Marquer une instruction comme envoyée
   */
  markInstructionAsSent(id: string): Observable<PaymentInstructionResponseDTO> {
    return this.http.patch<PaymentInstructionResponseDTO>(`${this.baseUrl}/${id}/send`, null);
  }

  /**
   * Régénérer une instruction expirée
   */
  regenerateExpiredInstruction(id: string, validityHours: number = 48): Observable<PaymentInstructionResponseDTO> {
    const params = new HttpParams().set('validityHours', validityHours.toString());
    return this.http.post<PaymentInstructionResponseDTO>(
      `${this.baseUrl}/${id}/regenerate`,
      null,
      { params }
    );
  }

  /**
   * Marquer les instructions expirées (job automatique)
   */
  markExpiredInstructions(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/mark-expired`, null);
  }

  /**
   * Valide une référence de paiement
   */
  validatePaymentReference(reference: string): Observable<PaymentReferenceValidationDTO> {
    return this.http.get<PaymentReferenceValidationDTO>(`${this.baseUrl}/validate/${reference}`);
  }

  /**
   * Obtenir les métriques d'engagement
   */
  getEngagementMetrics(partnerId: string): Observable<InstructionEngagementMetricsDTO> {
    return this.http.get<InstructionEngagementMetricsDTO>(
      `${this.baseUrl}/partner/${partnerId}/metrics/engagement`
    );
  }

  /**
   * Obtient les statistiques par langue
   */
  getLanguageStats(partnerId: string): Observable<InstructionLanguageStatsDTO[]> {
    return this.http.get<InstructionLanguageStatsDTO[]>(`${this.baseUrl}/partner/${partnerId}/metrics/languages`);
  }

  /**
   * Obtient les statistiques par canal
   */
  getChannelStats(partnerId: string): Observable<InstructionChannelStatsDTO[]> {
    return this.http.get<InstructionChannelStatsDTO[]>(`${this.baseUrl}/partner/${partnerId}/metrics/channels`);
  }

  /**
   * Obtient les statistiques globales
   */
  getGlobalStats(): Observable<InstructionGlobalStatsDTO> {
    return this.http.get<InstructionGlobalStatsDTO>(`${this.baseUrl}/stats/summary`);
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }
}
