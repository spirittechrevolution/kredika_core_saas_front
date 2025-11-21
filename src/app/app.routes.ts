import { Routes } from '@angular/router';
import {
  HomeComponent,
  LoginComponent,
  DashboardComponent,
  PartnerComponent,
  ReservationComponent,
  ReservationDetailComponent,
  EcheanceComponent,
  EcheanceDetailComponent,
  InstructionComponent
} from './pages';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'partenaires', component: PartnerComponent, canActivate: [authGuard] },
  { path: 'reservations', component: ReservationComponent, canActivate: [authGuard] },
  { path: 'reservations/:id', component: ReservationDetailComponent, canActivate: [authGuard] },
  { path: 'echeances', component: EcheanceComponent, canActivate: [authGuard] },
  { path: 'echeances/:id', component: EcheanceDetailComponent, canActivate: [authGuard] },
  { path: 'instructions', component: InstructionComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
