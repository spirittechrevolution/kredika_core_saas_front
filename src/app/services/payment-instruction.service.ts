import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentInstructionRequestDTO, PaymentInstructionResponseDTO } from '../models';

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
  regenerateExpiredInstruction(id: string): Observable<PaymentInstructionResponseDTO> {
    return this.http.post<PaymentInstructionResponseDTO>(
      `${this.baseUrl}/${id}/regenerate`,
      null
    );
  }

  /**
   * Marquer les instructions expirées (job automatique)
   */
  markExpiredInstructions(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/mark-expired`, null);
  }

  /**
   * Obtenir les métriques d'engagement
   */
  getEngagementMetrics(partnerId: string): Observable<Record<string, any>> {
    return this.http.get<Record<string, any>>(
      `${this.baseUrl}/partner/${partnerId}/metrics/engagement`
    );
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
