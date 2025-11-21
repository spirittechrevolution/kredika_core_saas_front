// Authentication Models
export interface AuthRequest {
  clientId: string;
  clientSecret: string;
  grantType?: string;
  scope?: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken?: string;
  tokenType?: string;
  expiresIn?: number;
  message?: string;
  scope?: string;
  partnerId?: string;
  partnerName?: string;
  issuedAt?: Date;
  error?: string;
  errorDescription?: string;
}
