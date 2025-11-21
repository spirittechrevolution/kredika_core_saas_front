import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Clone la requête et ajoute le header Authorization si token existe
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      // Gestion des erreurs 401 (Non authentifié)
      if (error.status === 401) {
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
