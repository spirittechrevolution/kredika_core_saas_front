import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PartnerPaymentMethodsDTO,
  PaymentInstructionPreviewDTO,
  CanGenerateInstructionsDTO
} from '../models';

/**
 * Service de configuration des méthodes de paiement des partenaires
 */
@Injectable({
  providedIn: 'root'
})
export class PaymentMethodConfigService {
  private readonly API_URL = 'http://localhost:7575/api/v1/partners';

  constructor(private readonly http: HttpClient) {}

  /**
   * Récupère la configuration des méthodes de paiement d'un partenaire
   */
  getPaymentMethods(partnerId: string): Observable<PartnerPaymentMethodsDTO> {
    return this.http.get<PartnerPaymentMethodsDTO>(`${this.API_URL}/${partnerId}/payment-methods`);
  }

  /**
   * Configure les méthodes de paiement d'un partenaire
   */
  configurePaymentMethods(partnerId: string, config: PartnerPaymentMethodsDTO): Observable<any> {
    return this.http.put(`${this.API_URL}/${partnerId}/payment-methods`, config);
  }

  /**
   * Prévisualise une instruction de paiement
   */
  previewPaymentInstruction(
    partnerId: string,
    language: string = 'fr',
    amount: number = 25000
  ): Observable<PaymentInstructionPreviewDTO> {
    const params = new HttpParams()
      .set('language', language)
      .set('amount', amount.toString());

    return this.http.get<PaymentInstructionPreviewDTO>(
      `${this.API_URL}/${partnerId}/payment-methods/preview`,
      { params }
    );
  }

  /**
   * Vérifie si un partenaire peut générer des instructions de paiement
   */
  canGenerateInstructions(partnerId: string): Observable<CanGenerateInstructionsDTO> {
    return this.http.get<CanGenerateInstructionsDTO>(`${this.API_URL}/${partnerId}/can-generate-instructions`);
  }

  /**
   * Obtient les statistiques des méthodes de paiement
   */
  getPaymentMethodsStats(): Observable<any> {
    return this.http.get(`${this.API_URL}/stats/payment-methods`);
  }
}
