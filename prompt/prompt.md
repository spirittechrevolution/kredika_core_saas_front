# DesignApp - Modern & Minimalist Web Design + Kredika Core Integration

This project is a Angular-based web application focused on modern, minimalist design.showcasing a clean aesthetic without complex backend functionality.

## Project Overview

- **Framework**: Angular + TypeScript + Vite
- **Styling**: Tailwind CSS
- **API Integration**: Kredika Core (Mock Service)

## Screens & Features

### 1. Home Page (`/`)
- La page d'accueil correspond au fichier 'prompt\accueil.png'

### 2. Dashboard (`/dashboard`)
- La page dashboard correspond au fichier 'prompt\dashboard.png'

### 3. Partenaires (`/partner`)
- La page partenaire correspond au fichier 'prompt\partenaires.png'

### 3. Reservations (`/reservation`)
- La page reservation correspond au fichier 'prompt\reservations.png'

### 3. Reservations (`/cheance`)
- La page échéance correspond au fichier 'prompt\echéances.png'

### 3. Instructions De Paiements (`/instruction`)
- La page instruction de paiement correspond aux fichiers 'prompt\instruction_de_paiement1.png' & 'prompt\instructuction_de_paiement2.png'

**Authentication Gate**:
- Modern split-screen login interface with branding and visual elements.
- Mock authentication (Client ID/Secret).

**Dashboard Tabs**:
- **Tableau de Bord**: Real-time statistics (Reservations, Volume, Defaults) and recent activity.
- **Partenaire**: View and configure partner settings (Commission, Credit Limits, API Keys).
- **Réservations**: List all credit reservations and create new ones with automatic installment calculation.
- **Échéances**: Track all payment installments across reservations and simulate payments.
- **Instructions Paiement**: Generate and manage payment instructions (QR Codes, Links).

### 4. Components
- **Navbar**: Responsive navigation bar with mobile menu support.
- **Footer**: Multi-column footer with social links and copyright.

## Directory Structure



## Kredika Integration

The Kredika integration is based on the OpenAPI specification provided ('prompt\openapi.json').
- Creer les interfaces typeScript
- creer les services gatewayes pour communiquer avec les apis 
