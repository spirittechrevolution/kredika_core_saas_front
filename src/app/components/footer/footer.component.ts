import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-gray-800 text-white">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4">Kredika</h3>
            <p class="text-gray-400 text-sm">
              Solution de crédit moderne et flexible pour vos partenaires commerciaux.
            </p>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4 uppercase tracking-wider">Produit</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a routerLink="/dashboard" class="text-gray-400 hover:text-white">Tableau de Bord</a>
              </li>
              <li>
                <a routerLink="/partner" class="text-gray-400 hover:text-white">Partenaires</a>
              </li>
              <li>
                <a routerLink="/reservation" class="text-gray-400 hover:text-white">Réservations</a>
              </li>
              <li>
                <a routerLink="/cheance" class="text-gray-400 hover:text-white">Échéances</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4 uppercase tracking-wider">Entreprise</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">À propos</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Nous contacter</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Carrières</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-sm font-semibold mb-4 uppercase tracking-wider">Légal</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Confidentialité</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Conditions</a>
              </li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white">Licence</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-gray-700">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 text-sm">
              &copy; {{ currentYear }} Kredika. Tous droits réservés.
            </p>
            <div class="flex space-x-6 mt-4 md:mt-0">
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Facebook</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">Twitter</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <span class="sr-only">LinkedIn</span>
                <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
