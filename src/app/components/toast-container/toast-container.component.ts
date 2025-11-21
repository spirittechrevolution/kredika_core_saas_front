import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (toast of toastService.getToasts()(); track toast.id) {
        <div
          [class]="getToastClass(toast.type)"
          class="min-w-80 rounded-lg shadow-lg p-4 flex items-start"
        >
          <div class="flex-shrink-0">
            @switch (toast.type) {
              @case ('success') {
                <svg class="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('error') {
                <svg class="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              @case ('warning') {
                <svg class="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              }
              @case ('info') {
                <svg class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            }
          </div>
          <div class="ml-3 flex-1">
            <p [class]="getTextClass(toast.type)" class="text-sm font-medium">
              {{ toast.message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              (click)="toastService.remove(toast.id)"
              [class]="getButtonClass(toast.type)"
              class="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span class="sr-only">Fermer</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  getToastClass(type: string): string {
    const baseClass = 'animate-slide-in-right';
    switch (type) {
      case 'success':
        return `${baseClass} bg-green-50 border border-green-200`;
      case 'error':
        return `${baseClass} bg-red-50 border border-red-200`;
      case 'warning':
        return `${baseClass} bg-yellow-50 border border-yellow-200`;
      case 'info':
        return `${baseClass} bg-blue-50 border border-blue-200`;
      default:
        return `${baseClass} bg-gray-50 border border-gray-200`;
    }
  }

  getTextClass(type: string): string {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  }

  getButtonClass(type: string): string {
    switch (type) {
      case 'success':
        return 'text-green-500 hover:text-green-600 focus:ring-green-500';
      case 'error':
        return 'text-red-500 hover:text-red-600 focus:ring-red-500';
      case 'warning':
        return 'text-yellow-500 hover:text-yellow-600 focus:ring-yellow-500';
      case 'info':
        return 'text-blue-500 hover:text-blue-600 focus:ring-blue-500';
      default:
        return 'text-gray-500 hover:text-gray-600 focus:ring-gray-500';
    }
  }
}
