import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentEventRequestDTO, PaymentEventResponseDTO } from '../models';

export interface PaymentEventAnalyticsDTO {
  totalEvents: number;
  successfulPayments: number;
  failedPayments: number;
  pendingPayments: number;
  totalAmount: number;
  averageAmount: number;
  successRate: number;
}

export interface PaymentVolumeDTO {
  period: string;
  totalVolume: number;
  eventCount: number;
  successfulVolume: number;
  failedVolume: number;
}

export interface SuccessRateDTO {
  partnerId: string;
  totalEvents: number;
  successfulEvents: number;
  successRate: number;
  periodStart: Date;
  periodEnd: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentEventService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/payment-events';

  /**
   * Enregistrer un événement de paiement
   */
  createPaymentEvent(event: PaymentEventRequestDTO): Observable<PaymentEventResponseDTO> {
    return this.http.post<PaymentEventResponseDTO>(this.baseUrl, event);
  }

  /**
   * Enregistrer des événements en batch
   */
  createPaymentEventsBatch(events: PaymentEventRequestDTO[]): Observable<PaymentEventResponseDTO[]> {
    return this.http.post<PaymentEventResponseDTO[]>(`${this.baseUrl}/batch`, events);
  }

  /**
   * Récupérer un événement par ID
   */
  getPaymentEventById(id: string): Observable<PaymentEventResponseDTO> {
    return this.http.get<PaymentEventResponseDTO>(`${this.baseUrl}/${id}`);
  }

  /**
   * Lister les événements par type
   */
  getPaymentEventsByType(eventType: string): Observable<PaymentEventResponseDTO[]> {
    return this.http.get<PaymentEventResponseDTO[]>(`${this.baseUrl}/type/${eventType}`);
  }

  /**
   * Lister les événements par session
   */
  getPaymentEventsBySession(sessionId: string): Observable<PaymentEventResponseDTO[]> {
    return this.http.get<PaymentEventResponseDTO[]>(`${this.baseUrl}/session/${sessionId}`);
  }

  /**
   * Lister les événements d'une période
   */
  getPaymentEventsByPeriod(startDate: string, endDate: string): Observable<PaymentEventResponseDTO[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<PaymentEventResponseDTO[]>(`${this.baseUrl}/period`, { params });
  }

  /**
   * Lister les événements d'un partenaire
   */
  getPaymentEventsByPartner(
    partnerId: string,
    page: number = 0,
    size: number = 20
  ): Observable<PaymentEventResponseDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PaymentEventResponseDTO[]>(
      `${this.baseUrl}/partner/${partnerId}`,
      { params }
    );
  }

  /**
   * Lister les événements d'une échéance
   */
  getPaymentEventsByInstallment(installmentId: string): Observable<PaymentEventResponseDTO[]> {
    return this.http.get<PaymentEventResponseDTO[]>(
      `${this.baseUrl}/installment/${installmentId}`
    );
  }

  /**
   * Obtenir les analytics de volume de paiement
   */
  getPaymentVolumeAnalytics(
    partnerId: string,
    startDate?: string,
    endDate?: string
  ): Observable<PaymentVolumeDTO> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<PaymentVolumeDTO>(
      `${this.baseUrl}/analytics/volume/${partnerId}`,
      { params }
    );
  }

  /**
   * Obtenir le taux de succès des paiements
   */
  getPaymentSuccessRate(
    partnerId: string,
    startDate?: string,
    endDate?: string
  ): Observable<SuccessRateDTO> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<SuccessRateDTO>(
      `${this.baseUrl}/analytics/success-rate/${partnerId}`,
      { params }
    );
  }

  /**
   * Obtenir les analytics complets d'un partenaire
   */
  getPartnerAnalytics(
    partnerId: string,
    startDate?: string,
    endDate?: string
  ): Observable<PaymentEventAnalyticsDTO> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    return this.http.get<PaymentEventAnalyticsDTO>(
      `${this.baseUrl}/analytics/partner/${partnerId}`,
      { params }
    );
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
