import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreditReservationRequestDTO,
  CreditReservationResponseDTO,
  ReservationStatsDTO
} from '../models';

export interface HealthCheckResponse {
  status: string;
  service: string;
  timestamp: number;
  version?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreditReservationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/credits/reservations';

  /**
   * Créer une réservation de crédit
   */
  createCreditReservation(
    reservation: CreditReservationRequestDTO
  ): Observable<CreditReservationResponseDTO> {
    return this.http.post<CreditReservationResponseDTO>(this.baseUrl, reservation);
  }

  /**
   * Lister toutes vos réservations
   */
  getMyReservations(status?: string): Observable<CreditReservationResponseDTO[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<CreditReservationResponseDTO[]>(this.baseUrl, { params });
  }

  /**
   * Récupérer une réservation par ID
   */
  getCreditReservationById(id: string): Observable<CreditReservationResponseDTO> {
    return this.http.get<CreditReservationResponseDTO>(`${this.baseUrl}/${id}`);
  }

  /**
   * Récupérer une réservation par référence externe
   */
  getCreditReservationByExternalRef(
    externalOrderRef: string
  ): Observable<CreditReservationResponseDTO> {
    return this.http.get<CreditReservationResponseDTO>(
      `${this.baseUrl}/external/${externalOrderRef}`
    );
  }

  /**
   * [ADMIN] Lister les réservations d'un partenaire
   */
  getReservationsByPartner(partnerId: string): Observable<CreditReservationResponseDTO[]> {
    return this.http.get<CreditReservationResponseDTO[]>(
      `${this.baseUrl}/partner/${partnerId}`
    );
  }

  /**
   * [ADMIN] Lister les réservations par statut
   */
  getReservationsByPartnerAndStatus(
    partnerId: string,
    status: string
  ): Observable<CreditReservationResponseDTO[]> {
    return this.http.get<CreditReservationResponseDTO[]>(
      `${this.baseUrl}/partner/${partnerId}/status/${status}`
    );
  }

  /**
   * Statistiques de vos réservations
   */
  getMyReservationStats(): Observable<ReservationStatsDTO> {
    return this.http.get<ReservationStatsDTO>(`${this.baseUrl}/stats`);
  }

  /**
   * Mettre à jour le statut d'une réservation
   */
  updateReservationStatus(id: string, status: string): Observable<CreditReservationResponseDTO> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<CreditReservationResponseDTO>(
      `${this.baseUrl}/${id}/status`,
      null,
      { params }
    );
  }

  /**
   * Annuler une réservation
   */
  cancelReservation(id: string): Observable<CreditReservationResponseDTO> {
    return this.http.post<CreditReservationResponseDTO>(`${this.baseUrl}/${id}/cancel`, null);
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<HealthCheckResponse> {
    return this.http.get<HealthCheckResponse>(`${this.baseUrl}/health`);
  }
}
