import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly baseUrl = 'http://localhost:7575/api/v1/auth';

  private readonly tokenKey = 'kredika_access_token';

  /**
   * Vérifier si nous sommes dans un navigateur
   */
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Authentifier un partenaire
   */
  authenticate(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/token`, credentials);
  }

  /**
   * Valider un token
   */
  validateToken(token: string): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AuthResponse>(`${this.baseUrl}/validate`, null, { headers });
  }

  /**
   * Rafraîchir un token
   */
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, null);
  }

  /**
   * Révoquer un token
   */
  revokeToken(token: string): Observable<AuthResponse> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AuthResponse>(`${this.baseUrl}/revoke`, null, { headers });
  }

  /**
   * Vérifier l'état de santé de l'API
   */
  healthCheck(): Observable<string> {
    return this.http.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }

  /**
   * Sauvegarder le token dans le localStorage
   */
  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  /**
   * Récupérer le token depuis le localStorage
   */
  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  /**
   * Supprimer le token du localStorage
   */
  removeToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Décoder le JWT pour extraire le partnerId
   */
  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  /**
   * Récupérer le partnerId depuis le token
   */
  getPartnerId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const decoded = this.decodeToken(token);
    return decoded?.partnerId || decoded?.sub || null;
  }

  /**
   * Récupérer les informations du partenaire connecté
   */
  getPartnerInfo(): { partnerId: string | null; partnerName: string | null } {
    const token = this.getToken();
    if (!token) return { partnerId: null, partnerName: null };

    const decoded = this.decodeToken(token);
    return {
      partnerId: decoded?.partnerId || decoded?.sub || null,
      partnerName: decoded?.partnerName || decoded?.name || null
    };
  }
}
