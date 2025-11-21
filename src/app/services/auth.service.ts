import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest, AuthResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:7575/api/v1/auth';

  private readonly tokenKey = 'kredika_access_token';

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
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Récupérer le token depuis le localStorage
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Supprimer le token du localStorage
   */
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Vérifier si l'utilisateur est authentifié
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
