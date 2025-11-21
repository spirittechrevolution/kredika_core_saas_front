import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstallmentDTO, PaymentEventRequestDTO } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/installments';

  /**
   * Récupérer une échéance par ID
   */
  getInstallmentById(id: string): Observable<InstallmentDTO> {
    return this.http.get<InstallmentDTO>(`${this.baseUrl}/${id}`);
  }

  /**
   * Lister les échéances d'une réservation
   */
  getInstallmentsByReservation(creditReservationId: string): Observable<InstallmentDTO[]> {
    return this.http.get<InstallmentDTO[]>(
      `${this.baseUrl}/reservation/${creditReservationId}`
    );
  }

  /**
   * Lister les échéances à venir
   */
  getUpcomingInstallments(daysAhead: number = 30): Observable<InstallmentDTO[]> {
    const params = new HttpParams().set('daysAhead', daysAhead.toString());
    return this.http.get<InstallmentDTO[]>(`${this.baseUrl}/upcoming`, { params });
  }

  /**
   * Lister les échéances échues
   */
  getOverdueInstallments(): Observable<InstallmentDTO[]> {
    return this.http.get<InstallmentDTO[]>(`${this.baseUrl}/overdue`);
  }

  /**
   * Traiter un paiement
   */
  processPayment(
    installmentId: string,
    paidAmount: number,
    externalPaymentRef: string
  ): Observable<InstallmentDTO> {
    const params = new HttpParams()
      .set('paidAmount', paidAmount.toString())
      .set('externalPaymentRef', externalPaymentRef);

    return this.http.post<InstallmentDTO>(
      `${this.baseUrl}/${installmentId}/payments`,
      null,
      { params }
    );
  }

  /**
   * Mettre à jour le statut d'une échéance
   */
  updateInstallmentStatus(installmentId: string, newStatus: string): Observable<InstallmentDTO> {
    const params = new HttpParams().set('newStatus', newStatus);
    return this.http.patch<InstallmentDTO>(
      `${this.baseUrl}/${installmentId}/status`,
      null,
      { params }
    );
  }

  /**
   * Envoyer un rappel
   */
  sendReminder(installmentId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${installmentId}/reminders`, null);
  }

  /**
   * Enregistrer un événement de paiement
   */
  recordPaymentEvent(event: PaymentEventRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/payment-events`, event);
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
