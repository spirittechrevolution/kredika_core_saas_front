import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditLimitsService } from '../../services/credit-limits.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';
import {
  CreditLimitsResponseDTO,
  CreditUtilizationSummaryDTO,
  CreditLimitsUpdateDTO
} from '../../models/credit-limits.model';

@Component({
  selector: 'app-credit-limits-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-limits-dashboard.component.html',
  styleUrls: ['./credit-limits-dashboard.component.css']
})
export class CreditLimitsDashboardComponent implements OnInit {
  private readonly creditLimitsService = inject(CreditLimitsService);
  private readonly toastService = inject(ToastService);
  private readonly authService = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  partnerId = '355a950b-994c-430a-ab2d-a021e1bc11de'; // Jumia Sénégal UUID, will be replaced by auth token
  creditLimits: CreditLimitsResponseDTO | null = null;
  utilizationSummary: CreditUtilizationSummaryDTO | null = null;
  loading = true;
  showEditModal = false;

  // Edit form
  editForm: CreditLimitsUpdateDTO = {
    maxCreditAmount: 0,
    maxDurationMonths: 1,
    commissionRate: 0,
    defaultInterestRate: 0,
    totalActiveCredits: 0
  };

  ngOnInit(): void {
    // Try to get partnerId from auth token
    const authPartnerId = this.authService.getPartnerId();
    if (authPartnerId) {
      this.partnerId = authPartnerId;
    }
    this.refreshData();
  }

  refreshData(): void {
    this.loadCreditLimits();
  }

  loadCreditLimits(): void {
    this.loading = true;
    console.log('Loading credit limits for partner:', this.partnerId);
    this.creditLimitsService.getCreditLimits(this.partnerId).subscribe({
      next: (data) => {
        console.log('Credit limits loaded:', data);
        this.creditLimits = data;
        this.loadUtilizationSummary();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading credit limits:', error);
        this.loading = false;
        this.cdr.detectChanges();
        this.toastService.show('error', 'Erreur lors du chargement des limites de crédit', 5000);
        // Initialize empty limits to show the interface
        this.creditLimits = null;
      }
    });
  }

  loadUtilizationSummary(): void {
    if (this.creditLimits) {
      this.utilizationSummary = this.creditLimitsService.calculateUtilizationSummary(this.creditLimits);
    }
  }

  openEditModal(): void {
    if (this.creditLimits) {
      this.editForm = {
        maxCreditAmount: this.creditLimits.maxCreditAmount,
        maxDurationMonths: this.creditLimits.maxDurationMonths,
        commissionRate: this.creditLimits.commissionRate,
        defaultInterestRate: this.creditLimits.defaultInterestRate,
        totalActiveCredits: this.creditLimits.totalActiveCredits
      };
      this.showEditModal = true;
    }
  }

  closeEditModal(): void {
    this.showEditModal = false;
  }

  saveChanges(): void {
    this.loading = true;
    this.creditLimitsService.updateCreditLimits(this.partnerId, this.editForm).subscribe({
      next: (data) => {
        this.creditLimits = data;
        this.toastService.show('success', 'Limites de crédit mises à jour avec succès', 5000);
        this.closeEditModal();
        this.loadUtilizationSummary();
        this.loading = false;
      },
      error: (error) => {
        this.toastService.show('error', 'Erreur lors de la mise à jour des limites', 5000);
        this.loading = false;
      }
    });
  }

  calculateUtilizationPercentage(used: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((used / total) * 100);
  }

  getUtilizationColor(percentage: number): string {
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(amount);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR');
  }
}
