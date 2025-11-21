import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PartnerRequestDTO,
  PartnerResponseDTO,
  CreditLimitsUpdateDTO,
  CreditLimitsResponseDTO
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/partners';

  /**
   * Créer un nouveau partenaire
   */
  createPartner(partner: PartnerRequestDTO): Observable<PartnerResponseDTO> {
    return this.http.post<PartnerResponseDTO>(this.baseUrl, partner);
  }

  /**
   * Récupérer tous les partenaires avec pagination
   */
  getAllPartners(
    page: number = 0,
    size: number = 20,
    sortBy: string = 'createdAt',
    direction: string = 'desc'
  ): Observable<PartnerResponseDTO[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<PartnerResponseDTO[]>(this.baseUrl, { params });
  }

  /**
   * Récupérer les partenaires actifs
   */
  getActivePartners(): Observable<PartnerResponseDTO[]> {
    return this.http.get<PartnerResponseDTO[]>(`${this.baseUrl}/active`);
  }

  /**
   * Récupérer un partenaire par ID
   */
  getPartnerById(id: string): Observable<PartnerResponseDTO> {
    return this.http.get<PartnerResponseDTO>(`${this.baseUrl}/${id}`);
  }

  /**
   * Rechercher un partenaire par email
   */
  searchPartnerByEmail(email: string): Observable<PartnerResponseDTO> {
    const params = new HttpParams().set('email', email);
    return this.http.get<PartnerResponseDTO>(`${this.baseUrl}/search`, { params });
  }

  /**
   * Mettre à jour un partenaire
   */
  updatePartner(id: string, partner: PartnerRequestDTO): Observable<PartnerResponseDTO> {
    return this.http.put<PartnerResponseDTO>(`${this.baseUrl}/${id}`, partner);
  }

  /**
   * Mettre à jour le statut d'un partenaire
   */
  updatePartnerStatus(id: string, status: string): Observable<PartnerResponseDTO> {
    const params = new HttpParams().set('status', status);
    return this.http.patch<PartnerResponseDTO>(`${this.baseUrl}/${id}/status`, null, { params });
  }

  /**
   * Supprimer un partenaire (soft delete)
   */
  deletePartner(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Régénérer la clé API d'un partenaire
   */
  regenerateApiKey(id: string): Observable<PartnerResponseDTO> {
    return this.http.post<PartnerResponseDTO>(`${this.baseUrl}/${id}/regenerate-api-key`, null);
  }

  /**
   * Déverrouiller un compte partenaire
   */
  unlockPartnerAccount(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${id}/unlock`, null);
  }

  /**
   * Consulter les limites de crédit d'un partenaire
   */
  getCreditLimits(id: string): Observable<CreditLimitsResponseDTO> {
    return this.http.get<CreditLimitsResponseDTO>(`${this.baseUrl}/${id}/credit-limits`);
  }

  /**
   * Configurer les limites de crédit d'un partenaire
   */
  updateCreditLimits(
    id: string,
    limits: CreditLimitsUpdateDTO
  ): Observable<CreditLimitsResponseDTO> {
    return this.http.patch<CreditLimitsResponseDTO>(`${this.baseUrl}/${id}/credit-limits`, limits);
  }

  /**
   * Recalculer le volume de crédit d'un partenaire
   */
  recalculateCreditVolume(id: string): Observable<CreditLimitsResponseDTO> {
    return this.http.post<CreditLimitsResponseDTO>(`${this.baseUrl}/${id}/recalculate-volume`, null);
  }

  /**
   * Vérifier la santé de l'API
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }
}
