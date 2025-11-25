import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Routes qui ne nécessitent pas d'authentification
  const publicRoutes = [
    '/v1/auth/token',
    '/v1/auth/refresh',
    '/v1/admin/auth/login',
    '/v1/admin/auth/refresh',
    '/health'
  ];

  // Vérifier si la route actuelle est publique
  let isPublicRoute = publicRoutes.some(route => req.url.includes(route));

  // Exception: POST /v1/partners (sans ID) est public pour la création
  // mais GET /v1/partners/{id} nécessite une authentification
  const partnerIdPattern = /\/v1\/partners\/[a-f0-9-]+/;
  if (req.url.includes('/v1/partners') && req.method === 'POST' && !partnerIdPattern.exec(req.url)) {
    isPublicRoute = true;
  }

  // Clone la requête et ajoute le header Authorization si token existe ET route non publique
  const authReq = token && !isPublicRoute
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Gestion des erreurs 401 (Non authentifié)
      if (error.status === 401 && !isPublicRoute) {
        authService.removeToken();
        router.navigate(['/login']);
      }

      // Gestion des erreurs 403 (Non autorisé)
      if (error.status === 403) {
        console.error('Accès refusé');
      }

      return throwError(() => error);
    })
  );
};
