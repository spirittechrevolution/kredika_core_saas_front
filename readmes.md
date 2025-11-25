# 🧭 Kredika Core — Infrastructure de Crédit-as-a-Service pour l'Afrique de l'Ouest

## 📖 Présentation

**Kredika Core** est une plateforme **CaaS (Credit-as-a-Service)** qui permet à toute entreprise — marketplace, e-commerce, fintech, ou commerce physique — d'offrir instantanément des solutions de paiement fractionné et de crédit à leurs clients, **sans infrastructure technique complexe ni risque financier**.

En Afrique de l'Ouest, où l'accès au crédit reste limité et les moyens de paiement fragmentés, Kredika Core agit comme un **pont technologique** entre les commerçants et leurs clients, en démocratisant l'accès au crédit tout en s'intégrant aux moyens de paiement locaux (Wave, Orange Money, Free Money, virements bancaires, espèces).

### 🎯 Modèle Unique : Infrastructure Pure

**Kredika Core N'EST PAS une fintech traditionnelle.** Nous ne gérons ni le produit, ni l'argent, ni le risque de défaut.

```
┌─────────────────────────────────────────────────────┐
│         CE QUE KREDIKA CORE FOURNIT                 │
│              (Infrastructure CaaS)                   │
├─────────────────────────────────────────────────────┤
│ ✅ API RESTful complète                             │
│ ✅ Scoring automatique (approve/reject)             │
│ ✅ Gestion des réservations de crédit               │
│ ✅ Calcul et tracking des échéances                 │
│ ✅ Instructions de paiement enrichies               │
│ ✅ Relances automatiques                            │
│ ✅ Dashboard Partner & Admin                        │
│ ✅ Webhooks et notifications                        │
│ ✅ Analytics et reporting                           │
│ ✅ Authentification sécurisée (API Key + JWT)       │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│      CE QUE LE PARTENAIRE GÈRE                      │
│         (Son business, son risque)                  │
├─────────────────────────────────────────────────────┤
│ ❌ Gestion du catalogue produits                    │
│ ❌ Décaissement de l'argent au client               │
│ ❌ Livraison des produits/services                  │
│ ❌ Encaissement des paiements clients               │
│ ❌ Risque de défaut de paiement                     │
│ ❌ Service client produit                           │
│ ❌ Gestion des litiges commerciaux                  │
└─────────────────────────────────────────────────────┘
```

**En résumé :** Kredika Core = Le "Stripe du crédit" pour l'Afrique de l'Ouest.

---

## 🎯 Vision et Objectif

### Vision
Devenir l'**infrastructure de référence du crédit intégré en Afrique francophone**, permettant à chaque entreprise, quelle que soit sa taille, d'offrir du Buy Now Pay Later à ses clients via une simple intégration API.

### Objectif
Démocratiser le **"Buy Now, Pay Later" (BNPL)** et le **crédit intégré** en fournissant :
- Une API unique pour tout le cycle de vie du crédit
- Intégration en quelques heures (pas 6-12 mois)
- Aucune expertise financière requise
- Conformité réglementaire native (BCEAO)
- Scoring et gestion du risque automatisés
- Support de tous les moyens de paiement locaux

---

## 💡 Problématique Résolue

### Défis Actuels en Afrique de l'Ouest

**Pour les Entreprises :**
1. 🔴 Développer un système de crédit prend 6-12 mois et coûte des millions
2. 🔴 Gérer le risque de crédit nécessite une expertise pointue
3. 🔴 Intégrer tous les moyens de paiement est un cauchemar technique
4. 🔴 La conformité BCEAO est complexe
5. 🔴 Pas de capital pour financer les crédits

**Pour les Clients Finaux :**
1. 🔴 80-90% n'ont pas accès au crédit formel
2. 🔴 Les banques ne prêtent qu'aux salariés formels (< 20%)
3. 🔴 Le crédit informel est dangereux et cher
4. 🔴 Impossible d'acheter des produits > 100,000 FCFA d'un coup

### Solution Kredika Core

**Pour les Entreprises :**
✅ Intégration en 2-3 jours (API + Dashboard)  
✅ Infrastructure prête à l'emploi (pas de dev complexe)  
✅ Scoring automatisé (machine learning)  
✅ Tous les moyens de paiement déjà intégrés  
✅ Conformité BCEAO native  
✅ Le partenaire garde le contrôle sur son risque

**Pour les Clients Finaux :**
✅ Crédit instantané sans historique bancaire  
✅ Instructions de paiement claires (multilingue)  
✅ Paiement via Wave, Orange Money, Free Money, banque, cash  
✅ Transparence totale (pas de frais cachés)

---

## 🏗️ Architecture Technique

### Architecture Globale

```
┌──────────────────────────────────────────────────────────┐
│              PARTENAIRES (Clients B2B)                   │
│   Jumia │ Expresso │ Auchan │ E-commerces │ Boutiques   │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ REST API + Webhooks
                     │ API Key + JWT Authentication
                     │
┌────────────────────▼─────────────────────────────────────┐
│                   KREDIKA CORE API                        │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  🔐 Authentification & Autorisation                  │ │
│ │     • Partner Auth (API Key)                         │ │
│ │     • Admin Auth (JWT Bearer Token)                  │ │
│ │     • Role-Based Access Control                      │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  👥 Gestion des Partenaires                          │ │
│ │     • Onboarding & Configuration                     │ │
│ │     • Limites de crédit                              │ │
│ │     • Méthodes de paiement                           │ │
│ │     • API Key management                             │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  💳 Moteur de Crédit                                 │ │
│ │     • Réservations de crédit                         │ │
│ │     • Calcul des échéances                           │ │
│ │     • Scoring automatisé                             │ │
│ │     • Gestion des statuts                            │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  📅 Gestion des Échéances                            │ │
│ │     • Tracking des paiements                         │ │
│ │     • Calcul des retards/avances                     │ │
│ │     • Métriques de ponctualité                       │ │
│ │     • Historique complet                             │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  💰 Instructions de Paiement Enrichies               │ │
│ │     • Génération contextualisée                      │ │
│ │     • Multi-canal (Wave, OM, Free, Bank, Cash)       │ │
│ │     • Multi-langue (FR, WO, EN)                      │ │
│ │     • USSD pré-rempli                                │ │
│ │     • Tracking d'engagement                          │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  🔔 Système de Rappels                               │ │
│ │     • Rappels automatisés                            │ │
│ │     • Multi-canal (SMS, Email, Push)                 │ │
│ │     • Personnalisés par partner                      │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  📊 Analytics & Événements                           │ │
│ │     • Événements de paiement                         │ │
│ │     • Métriques temps réel                           │ │
│ │     • Taux de conversion                             │ │
│ │     • Pattern de paiement                            │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  🛡️ Audit & Sécurité                                 │ │
│ │     • Audit trail complet                            │ │
│ │     • Conformité BCEAO                               │ │
│ │     • RGPD compliant                                 │ │
│ └──────────────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────────────┐ │
│ │  🔧 Administration                                   │ │
│ │     • Dashboard admin                                │ │
│ │     • Gestion des utilisateurs admin                 │ │
│ │     • 6 rôles (SUPER_ADMIN, ADMIN, OPERATIONS...)    │ │
│ └──────────────────────────────────────────────────────┘ │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ Intégrations
                     │
┌────────────────────▼─────────────────────────────────────┐
│              MOYENS DE PAIEMENT & SERVICES               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Wave   │  │  Orange  │  │   Free   │  │ Banques │ │
│  │          │  │  Money   │  │  Money   │  │         │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │   SMS    │  │  Email   │  │   Push   │              │
│  │ (Twilio) │  │          │  │  Notif   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└──────────────────────────────────────────────────────────┘
```

### Modules Architecture

```
kredika-core/
├── kredika-core-api/          # API REST Layer
│   ├── controllers/           # REST Controllers
│   ├── filters/               # Security Filters
│   ├── config/                # Spring Configuration
│   └── docs/                  # OpenAPI/Swagger
│
├── kredika-core-domain/       # Business Logic Layer
│   ├── service/               # Business Services
│   ├── model/                 # JPA Entities
│   ├── repository/            # Data Access
│   └── dto/                   # Data Transfer Objects
│
└── kredika-core-common/       # Shared Components
    ├── exception/             # Custom Exceptions
    ├── util/                  # Utilities
    ├── codeList/              # Enums & Constants
    └── validation/            # Validators
```

---

## 🔐 Système d'Authentification Dual

### Pour les Partenaires (API Key)

**Token de type :** `tok_xxxxx` (access) et `rtok_xxxxx` (refresh)

```bash
# Login Partner
curl -X POST https://api.kredika.sn/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "pk_6c5c0cba8e854dac",
    "clientSecret": "sk_live_xxxxxxxxxxxxx"
  }'

# Response
{
  "accessToken": "tok_abc123...",
  "refreshToken": "rtok_xyz789...",
  "tokenType": "Bearer",
  "expiresIn": 86400
}

# Utilisation
curl -X GET https://api.kredika.sn/v1/credits/reservations \
  -H "Authorization: Bearer tok_abc123..."
```

**Rôle attribué :** `ROLE_PARTNER`

**Permissions :**
- ✅ Créer des réservations de crédit
- ✅ Consulter ses propres réservations
- ✅ Générer des instructions de paiement
- ✅ Enregistrer des paiements
- ✅ Consulter ses statistiques
- ❌ Voir les données d'autres partenaires
- ❌ Accéder aux endpoints admin

### Pour les Administrateurs (JWT Token)

**Token de type :** `admin_tok_xxxxx` (access) et `admin_rtok_xxxxx` (refresh)

```bash
# Login Admin
curl -X POST https://api.kredika.sn/v1/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "SecurePass@2025"
  }'

# Response
{
  "accessToken": "admin_tok_abc123...",
  "refreshToken": "admin_rtok_xyz789...",
  "tokenType": "Bearer",
  "expiresIn": 28800,
  "user": {
    "username": "admin",
    "roles": ["SUPER_ADMIN"]
  }
}

# Utilisation
curl -X GET https://api.kredika.sn/v1/partners \
  -H "Authorization: Bearer admin_tok_abc123..."
```

**6 Rôles Admin disponibles :**

| Rôle | Permissions |
|------|-------------|
| **SUPER_ADMIN** | Tous les droits (gestion admins, config système) |
| **ADMIN** | Gestion complète sauf utilisateurs admin |
| **OPERATIONS** | Validation et gestion des réservations |
| **FINANCE** | Rapports financiers (lecture seule) |
| **SUPPORT** | Support client limité |
| **AUDITOR** | Consultation des audit logs |

---

## ⚙️ Endpoints API Complets

### 🔐 Authentification

#### Partenaires

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/auth/token` | Login partner | Public |
| `POST` | `/v1/auth/refresh` | Refresh access token | Public |
| `POST` | `/v1/auth/validate` | Valider un token | Public |
| `POST` | `/v1/auth/revoke` | Logout (révoque token) | PARTNER |
| `POST` | `/v1/auth/revoke-all` | Révoque tous les tokens | PARTNER |
| `GET` | `/v1/auth/health` | Health check | Public |

#### Administrateurs

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/admin/auth/login` | Login admin | Public |
| `POST` | `/v1/admin/auth/refresh` | Refresh access token | Public |
| `POST` | `/v1/admin/auth/validate` | Valider un token admin | Public |
| `POST` | `/v1/admin/auth/logout` | Logout admin | ADMIN |
| `POST` | `/v1/admin/auth/change-password` | Changer mot de passe | ADMIN |
| `POST` | `/v1/admin/auth/revoke-all` | Révoque tous les tokens | ADMIN |
| `GET` | `/v1/admin/auth/profile` | Profil admin connecté | ADMIN |
| `GET` | `/v1/admin/auth/health` | Health check | Public |

### 👥 Gestion des Partenaires

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/partners` | Créer un partenaire | Public (onboarding) |
| `GET` | `/v1/partners` | Liste tous les partenaires | ADMIN, OPERATIONS, FINANCE |
| `GET` | `/v1/partners/{id}` | Détails d'un partenaire | ADMIN, PARTNER (soi-même) |
| `PUT` | `/v1/partners/{id}` | Modifier un partenaire | ADMIN, SUPER_ADMIN |
| `PATCH` | `/v1/partners/{id}/status` | Changer le statut | ADMIN, SUPER_ADMIN |
| `POST` | `/v1/partners/{id}/unlock` | Débloquer un partenaire | ADMIN, SUPER_ADMIN |
| `POST` | `/v1/partners/{id}/regenerate-api-key` | Régénérer API key | ADMIN, SUPER_ADMIN |
| `PATCH` | `/v1/partners/{id}/credit-limits` | Modifier limites crédit | ADMIN, SUPER_ADMIN |
| `POST` | `/v1/partners/{id}/recalculate-volume` | Recalculer volumes | ADMIN |
| `GET` | `/v1/partners/active` | Partenaires actifs | ADMIN |
| `GET` | `/v1/partners/stats/payment-methods` | Stats méthodes paiement | ADMIN, FINANCE |
| `GET` | `/v1/partners/health` | Health check | Public |

### 💳 Réservations de Crédit

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/credits/reservations` | Créer une réservation | PARTNER |
| `GET` | `/v1/credits/reservations` | Ses réservations | PARTNER |
| `GET` | `/v1/credits/reservations/{id}` | Détails réservation | PARTNER, ADMIN |
| `PATCH` | `/v1/credits/reservations/{id}/status` | Changer statut | OPERATIONS, ADMIN |
| `POST` | `/v1/credits/reservations/{id}/cancel` | Annuler réservation | PARTNER, OPERATIONS |
| `GET` | `/v1/credits/reservations/partner/{partnerId}` | Réservations par partner | ADMIN, FINANCE |
| `GET` | `/v1/credits/reservations/partner/{partnerId}/status/{status}` | Filtre par statut | ADMIN |
| `GET` | `/v1/credits/reservations/external/{externalOrderRef}` | Par ref externe | PARTNER |
| `GET` | `/v1/credits/reservations/stats` | Statistiques | ADMIN, FINANCE |
| `GET` | `/v1/credits/reservations/health` | Health check | Public |

### 📅 Gestion des Échéances

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `GET` | `/v1/installments/{id}` | Détails échéance | PARTNER, ADMIN |
| `PATCH` | `/v1/installments/{id}/status` | Changer statut | OPERATIONS, ADMIN |
| `POST` | `/v1/installments/{installmentId}/payments` | Enregistrer paiement | PARTNER |
| `GET` | `/v1/installments/reservation/{creditReservationId}` | Échéances d'un crédit | PARTNER, ADMIN |
| `GET` | `/v1/installments/upcoming` | Échéances à venir | ADMIN, OPERATIONS |
| `GET` | `/v1/installments/overdue` | Échéances en retard | ADMIN, OPERATIONS |
| `POST` | `/v1/installments/{installmentId}/reminders` | Envoyer rappel | PARTNER, OPERATIONS |
| `GET` | `/v1/installments/payment-events` | Événements de paiement | ADMIN |
| `GET` | `/v1/installments/stats` | Statistiques échéances | ADMIN, FINANCE |
| `GET` | `/v1/installments/health` | Health check | Public |

### 💰 Instructions de Paiement

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/payment-instructions` | Générer instruction | PARTNER |
| `GET` | `/v1/payment-instructions/{id}` | Détails instruction | PARTNER, ADMIN |
| `POST` | `/v1/payment-instructions/{id}/view` | Marquer comme vue | PARTNER |
| `POST` | `/v1/payment-instructions/{id}/send` | Envoyer par SMS/Email | PARTNER |
| `POST` | `/v1/payment-instructions/{id}/regenerate` | Régénérer | PARTNER |
| `GET` | `/v1/payment-instructions/reference/{reference}` | Par référence | PARTNER |
| `GET` | `/v1/payment-instructions/installment/{installmentId}/active` | Actives pour échéance | PARTNER |
| `GET` | `/v1/payment-instructions/partner/{partnerId}` | Par partner | ADMIN |
| `GET` | `/v1/payment-instructions/partner/{partnerId}/metrics/engagement` | Métriques engagement | ADMIN, FINANCE |
| `GET` | `/v1/payment-instructions/partner/{partnerId}/metrics/channels` | Métriques canaux | ADMIN, FINANCE |
| `GET` | `/v1/payment-instructions/partner/{partnerId}/metrics/languages` | Métriques langues | ADMIN, FINANCE |
| `GET` | `/v1/payment-instructions/stats/summary` | Résumé statistiques | ADMIN, FINANCE |
| `GET` | `/v1/payment-instructions/expired` | Instructions expirées | ADMIN |
| `POST` | `/v1/payment-instructions/mark-expired` | Marquer expirées | ADMIN |
| `GET` | `/v1/payment-instructions/validate/{reference}` | Valider référence | Public |
| `GET` | `/v1/payment-instructions/health` | Health check | Public |

### 📊 Événements de Paiement

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/payment-events` | Créer événement | PARTNER |
| `POST` | `/v1/payment-events/batch` | Créer plusieurs | ADMIN |
| `GET` | `/v1/payment-events/{id}` | Détails événement | PARTNER, ADMIN |
| `GET` | `/v1/payment-events/installment/{installmentId}` | Par échéance | PARTNER, ADMIN |
| `GET` | `/v1/payment-events/partner/{partnerId}` | Par partner | ADMIN |
| `GET` | `/v1/payment-events/session/{sessionId}` | Par session | PARTNER, ADMIN |
| `GET` | `/v1/payment-events/type/{eventType}` | Par type | ADMIN |
| `GET` | `/v1/payment-events/period` | Par période | ADMIN, FINANCE |
| `GET` | `/v1/payment-events/analytics/partner/{partnerId}` | Analytics partner | ADMIN, FINANCE |
| `GET` | `/v1/payment-events/analytics/success-rate/{partnerId}` | Taux de succès | ADMIN, FINANCE |
| `GET` | `/v1/payment-events/analytics/volume/{partnerId}` | Volume | ADMIN, FINANCE |
| `GET` | `/v1/payment-events/health` | Health check | Public |

### 💰 Méthodes de Paiement

| Méthode | Endpoint | Description | Rôle |
|---------|----------|-------------|------|
| `POST` | `/v1/partners/{id}/payment-methods` | Ajouter méthode | PARTNER, ADMIN |
| `GET` | `/v1/partners/{id}/payment-methods` | Liste méthodes | PARTNER, ADMIN |
| `GET` | `/v1/partners/{id}/payment-methods/preview` | Prévisualiser | PARTNER |
| `GET` | `/v1/partners/{id}/can-generate-instructions` | Peut générer ? | PARTNER |

---

## 🚀 Quick Start - Intégration en 3 étapes

### Étape 1 : Créer un compte partenaire (2 min)

```bash
curl -X POST https://api.kredika.sn/v1/partners \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ma Boutique en Ligne",
    "businessName": "SARL Ma Boutique",
    "email": "contact@maboutique.sn",
    "phone": "+221771234567",
    "address": "Dakar, Sénégal",
    "businessType": "E_COMMERCE",
    "taxId": "123456789"
  }'

# Response
{
  "success": true,
  "partner": {
    "id": "uuid",
    "partnerKey": "pk_6c5c0cba8e854dac",
    "name": "Ma Boutique en Ligne",
    "status": "ACTIVE"
  },
  "credentials": {
    "clientId": "pk_6c5c0cba8e854dac",
    "clientSecret": "sk_live_xxxxxxxxxxxx"  // ⚠️ À sauvegarder !
  }
}
```

### Étape 2 : S'authentifier (30 sec)

```bash
curl -X POST https://api.kredika.sn/v1/auth/token \
  -H "Content-Type: application/json" \
  -d '{
    "clientId": "pk_6c5c0cba8e854dac",
    "clientSecret": "sk_live_xxxxxxxxxxxx"
  }'

# Response
{
  "accessToken": "tok_abc123...",
  "refreshToken": "rtok_xyz789...",
  "expiresIn": 86400
}
```

### Étape 3 : Créer votre premier crédit (1 min)

```bash
curl -X POST https://api.kredika.sn/v1/credits/reservations \
  -H "Authorization: Bearer tok_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "externalOrderRef": "ORDER-001",
    "externalCustomerRef": "CUSTOMER-123",
    "purchaseAmount": 150000,
    "installmentCount": 3
  }'

# Response
{
  "success": true,
  "creditReservation": {
    "id": "uuid",
    "status": "RESERVED",
    "purchaseAmount": 150000,
    "totalAmount": 150000,
    "installmentCount": 3,
    "installments": [
      {
        "installmentNumber": 1,
        "amount": 50000,
        "dueDate": "2025-12-22",
        "status": "PENDING"
      },
      {
        "installmentNumber": 2,
        "amount": 50000,
        "dueDate": "2026-01-22",
        "status": "PENDING"
      },
      {
        "installmentNumber": 3,
        "amount": 50000,
        "dueDate": "2026-02-22",
        "status": "PENDING"
      }
    ]
  }
}
```

**C'est tout !** 🎉 Votre crédit est créé, les échéances calculées automatiquement.

---

## 💡 Innovation : Instructions de Paiement Enrichies

### Le Problème Résolu

En Afrique de l'Ouest, dire "Payez 50,000 FCFA" ne suffit pas. Le client a besoin de savoir **EXACTEMENT comment payer** :
- Quel numéro Wave composer ?
- Quel code USSD utiliser ?
- Où trouver un point de paiement en espèces ?
- Comment faire un virement bancaire ?

**Kredika Core génère des instructions de paiement complètes et contextualisées.**

### Exemple d'Instruction Complète

```bash
# Générer une instruction
curl -X POST https://api.kredika.sn/v1/payment-instructions \
  -H "Authorization: Bearer tok_abc123..." \
  -H "Content-Type: application/json" \
  -d '{
    "installmentId": "uuid",
    "language": "FR"
  }'

# Response (simplifié)
{
  "reference": "KRD-202411-A1B2C3",
  "amount": 50000,
  "dueDate": "2025-12-22",
  "installmentNumber": 1,
  "totalInstallments": 3,
  
  "paymentMethods": [
    {
      "method": "WAVE",
      "displayName": "Wave",
      "recommended": true,
      "icon": "🌊",
      "merchantPhone": "+221771234567",
      "paymentSteps": [
        "1. Ouvrez l'application Wave",
        "2. Appuyez sur 'Payer'",
        "3. Entrez le numéro : +221771234567",
        "4. Montant : 50 000 F",
        "5. Référence : KRD-202411-A1B2C3",
        "6. Validez avec votre code PIN"
      ],
      "ussdShortcut": "#144#50000*771234567*KRD-202411-A1B2C3#",
      "fees": {
        "amount": 500,
        "description": "Frais Wave (1%)",
        "totalWithFees": 50500
      }
    },
    {
      "method": "ORANGE_MONEY",
      "displayName": "Orange Money",
      "icon": "🍊",
      "merchantPhone": "+221771234567",
      "paymentSteps": [
        "1. Composez #144#",
        "2. Choisissez 'Transfert'",
        "3. Entrez : 771234567",
        "4. Montant : 50000",
        "5. Validez"
      ],
      "ussdShortcut": "#144*1*1*771234567*50000#"
    },
    {
      "method": "BANK_TRANSFER",
      "displayName": "Virement Bancaire",
      "icon": "🏦",
      "bankDetails": {
        "accountName": "KREDIKA TECHNOLOGIES",
        "bankName": "CBAO",
        "accountNumber": "12345678901",
        "iban": "SN08 SN01 0123 4567 8901 2345 67",
        "swift": "CBAOSNDA"
      },
      "paymentSteps": [
        "1. Connectez-vous à votre banque en ligne",
        "2. Créez un virement vers : SN08 SN01 0123 4567 8901 2345 67",
        "3. Montant : 50 000 F",
        "4. Motif : KRD-202411-A1B2C3"
      ]
    },
    {
      "method": "CASH",
      "displayName": "Paiement en Espèces",
      "icon": "💵",
      "locations": [
        {
          "name": "Point Wave - Sandaga",
          "address": "Marché Sandaga, Dakar",
          "hours": "Lun-Sam : 8h-19h",
          "coordinates": {
            "latitude": 14.6937,
            "longitude": -17.4441
          }
        }
      ],
      "paymentSteps": [
        "1. Rendez-vous au point de paiement",
        "2. Dites : 'Je veux payer Kredika'",
        "3. Donnez la référence : KRD-202411-A1B2C3",
        "4. Payez : 50 000 F",
        "5. Gardez le reçu"
      ]
    }
  ],
  
  "reminders": {
    "daysBeforeDue": 3,
    "message": "Votre paiement de 50 000 F est dû dans 3 jours"
  }
}
```

### Multilingue (FR, WO, EN)

```bash
# En Wolof
curl -X POST https://api.kredika.sn/v1/payment-instructions \
  -H "Authorization: Bearer tok_abc123..." \
  -d '{"installmentId": "uuid", "language": "WO"}'

# Response
{
  "paymentSteps": [
    "1. Ubbi application Wave bi",
    "2. Bët 'Yëf'",
    "3. Dugal nimero yi : +221771234567",
    "4. Xaalis : 50 000 F",
    ...
  ]
}
```

---

## 📊 Analytics & Métriques

### Dashboard Partner

**Métriques disponibles :**
- Volume de crédits par période
- Taux de remboursement (% échéances payées)
- Taux de défaut (% > 30 jours de retard)
- Performance par méthode de paiement
- Engagement avec les instructions
- Pattern de paiement (early/on-time/late)

### Événements Trackés

Kredika Core track **30+ types d'événements** :

**Crédit :**
- `RESERVATION_CREATED`
- `RESERVATION_ACTIVATED`
- `RESERVATION_COMPLETED`
- `RESERVATION_DEFAULTED`

**Paiement :**
- `PAYMENT_INITIATED`
- `PAYMENT_COMPLETED`
- `PAYMENT_FAILED`
- `EARLY_PAYMENT`
- `LATE_PAYMENT`

**Instructions :**
- `INSTRUCTION_GENERATED`
- `INSTRUCTION_VIEWED`
- `INSTRUCTION_SENT_SMS`
- `INSTRUCTION_SENT_EMAIL`

**Rappels :**
- `REMINDER_SENT`
- `REMINDER_VIEWED`

---

## 🔐 Sécurité & Conformité

### Authentification Multi-Niveau

1. **Partner :** API Key (clientId + clientSecret)
2. **Admin :** JWT Token (username + password)
3. **Role-Based Access Control (RBAC)**
4. **Rate Limiting par partner**
5. **IP Whitelisting (optionnel)**

### Audit Trail Complet

Toute action est tracée :
```json
{
  "action": "CREDIT_CREATED",
  "actor": "pk_6c5c0cba8e854dac",
  "actorType": "PARTNER",
  "timestamp": "2025-11-22T15:30:00Z",
  "ipAddress": "192.168.1.100",
  "payload": { ... },
  "result": "SUCCESS"
}
```

📋 Matrice des Accès

| Endpoint                                            | PARTNER     | ADMIN    | SUPER_ADMIN | OPERATIONS | FINANCE  | SUPPORT  | AUDITOR  |
  |-----------------------------------------------------|-------------|----------|-------------|------------|----------|----------|----------|
| PARTNERS                                            |             |          |             |            |          |          |          |
| POST /v1/partners                                   | ✅ Public    | ✅ Public | ✅ Public    | ✅ Public   | ✅ Public | ✅ Public | ✅ Public |
| GET /v1/partners                                    | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| GET /v1/partners/{id}                               | ✅ Self only | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| PUT /v1/partners/{id}                               | ❌           | ✅        | ✅           | ❌          | ❌        | ❌        | ❌        |
| PATCH /v1/partners/{id}/status                      | ❌           | ✅        | ✅           | ❌          | ❌        | ❌        | ❌        |
| POST /v1/partners/{id}/regenerate-api-key           | ❌           | ✅        | ✅           | ❌          | ❌        | ❌        | ❌        |
| DELETE /v1/partners/{id}                            | ❌           | ❌        | ✅           | ❌          | ❌        | ❌        | ❌        |
| CREDIT RESERVATIONS                                 |             |          |             |            |          |          |          |
| POST /v1/credits/reservations                       | ✅           | ❌        | ❌           | ❌          | ❌        | ❌        | ❌        |
| GET /v1/credits/reservations                        | ✅ Self      | ❌        | ❌           | ❌          | ❌        | ❌        | ❌        |
| GET /v1/credits/reservations/{id}                   | ✅ Self      | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| PATCH /v1/credits/reservations/{id}/status          | ✅ Self      | ✅        | ✅           | ✅          | ❌        | ❌        | ❌        |
| POST /v1/credits/reservations/{id}/cancel           | ✅ Self      | ✅        | ✅           | ✅          | ❌        | ❌        | ❌        |
| GET /v1/credits/reservations/partner/{id}           | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| INSTALLMENTS                                        |             |          |             |            |          |          |          |
| GET /v1/installments/{id}                           | ✅ Self      | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| POST /v1/installments/{id}/payments                 | ✅ Self      | ✅        | ✅           | ✅          | ❌        | ❌        | ❌        |
| PATCH /v1/installments/{id}/status                  | ❌           | ✅        | ✅           | ✅          | ❌        | ❌        | ❌        |
| POST /v1/installments/{id}/reminders                | ✅ Self      | ✅        | ✅           | ✅          | ❌        | ❌        | ❌        |
| GET /v1/installments/overdue                        | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| PAYMENT INSTRUCTIONS                                |             |          |             |            |          |          |          |
| POST /v1/payment-instructions                       | ✅ Self      | ❌        | ❌           | ❌          | ❌        | ❌        | ❌        |
| GET /v1/payment-instructions/{id}                   | ✅ Self      | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| PATCH /v1/payment-instructions/{id}/view            | ✅ Self      | ❌        | ❌           | ❌          | ❌        | ❌        | ❌        |
| GET /v1/payment-instructions/partner/{id}           | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| GET /v1/payment-instructions/partner/{id}/metrics/* | ❌           | ✅        | ✅           | ❌          | ✅        | ❌        | ❌        |
| PAYMENT EVENTS                                      |             |          |             |            |          |          |          |
| POST /v1/payment-events                             | ✅ Self      | ❌        | ❌           | ❌          | ❌        | ❌        | ❌        |
| POST /v1/payment-events/batch                       | ❌           | ✅        | ✅           | ❌          | ❌        | ❌        | ❌        |
| GET /v1/payment-events/partner/{id}                 | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |
| GET /v1/payment-events/analytics/*                  | ❌           | ✅        | ✅           | ✅          | ✅        | ❌        | ❌        |

  ---

### Conformité BCEAO

- ✅ Respect des limites de crédit
- ✅ Taux d'intérêt conformes
- ✅ Documentation complète
- ✅ Archivage légal (7 ans)

### Protection des Données (RGPD)

- ✅ **Aucune donnée personnelle stockée** (nom, prénom, CNI)
- ✅ Identifiants externes uniquement
- ✅ Chiffrement TLS 1.3
- ✅ Données sensibles chiffrées au repos
- ✅ Droit à l'oubli respecté

---

## 💼 Modèle Économique

### Tarification CaaS Flexible

**Option 1 : Transaction-Based (Recommandé pour démarrer)**

```
Par transaction de crédit :
- < 100 crédits/mois : 2,500 FCFA/transaction
- 100-500 crédits/mois : 2,000 FCFA/transaction
- > 500 crédits/mois : 1,500 FCFA/transaction

Exemple : 200 crédits/mois = 400,000 FCFA/mois
```

**Option 2 : SaaS Subscription**

```
STARTER : 50,000 FCFA/mois
- Jusqu'à 100 transactions
- API access
- Dashboard basique

PRO : 200,000 FCFA/mois
- Jusqu'à 1,000 transactions
- API + Webhooks
- Analytics avancé

ENTERPRISE : Sur devis (500K - 2M FCFA/mois)
- Illimité
- White-label
- Support dédié
- SLA garanti
```

**Option 3 : Hybrid (Meilleur rapport qualité/prix)**

```
Abonnement de base + frais par transaction

PRO Hybrid : 150,000 FCFA/mois
- 500 transactions incluses
- + 1,000 FCFA par transaction supplémentaire

Exemple : 1,200 transactions = 150K + (700 × 1K) = 850,000 FCFA
```

---

## 🚀 Cas d'Usage Concrets

### 1. E-commerce de Téléphones

```
Problème : iPhone à 500,000 FCFA = trop cher d'un coup
Solution : Paiement en 3 fois (180,000 FCFA/mois)
Résultat : +300% de conversions
```

**Flow :**
1. Client met iPhone dans panier
2. Choisit "Payer en 3x"
3. Kredika Core crée réservation
4. Client reçoit instruction SMS
5. Paie 1ère échéance via Wave
6. Marchand livre le téléphone
7. Client paie échéances 2 & 3

### 2. Marketplace Multi-Vendeurs

```
Problème : Marketplace veut offrir du crédit sans gérer la complexité
Solution : API Kredika Core intégrée
Résultat : Crédit pour tous les vendeurs automatiquement
```

**Flow :**
1. Vendeur liste produit
2. Marketplace active crédit via API
3. Acheteur choisit paiement fractionné
4. Kredika gère tout le crédit
5. Marketplace garde sa commission

### 3. Commerce Physique (Boutique)

```
Problème : Crédit informel sur cahier = bordel
Solution : Digitalisation via Kredika Core
Résultat : Suivi automatisé, zéro papier
```

**Flow :**
1. Client choisit article en magasin
2. Vendeur crée crédit via tablet
3. Client reçoit instructions
4. Paiements trackés automatiquement
5. Rappels SMS automatiques

---

## 🛠️ Stack Technique

### Backend
- **Java 21** : Langage
- **Spring Boot 3.2** : Framework
- **Spring Security** : Auth + RBAC
- **Spring Data JPA** : ORM
- **Hibernate** : Persistence

### Base de données
- **PostgreSQL 15** : Base principale
- **Redis** : Cache & sessions
- **Flyway** : Migrations

### Infrastructure
- **Docker** : Conteneurisation
- **AWS/Azure** : Cloud
- **Nginx** : Reverse proxy
- **Let's Encrypt** : SSL/TLS

### Monitoring
- **Prometheus** : Métriques
- **Grafana** : Dashboards
- **ELK Stack** : Logs
- **Sentry** : Error tracking

---

## 📚 Documentation

### Ressources Complètes

**Pour Développeurs :**
- 📖 [API Reference](https://docs.kredika.sn/api)
- 🚀 [Quick Start Guide](https://docs.kredika.sn/quickstart)
- 💻 [Code Examples](https://github.com/kredika/examples)
- 📮 [Postman Collection](https://docs.kredika.sn/postman)
- 🔔 [Webhooks Guide](https://docs.kredika.sn/webhooks)

**Pour Business :**
- 💼 [Integration Guide](https://docs.kredika.sn/business)
- 💰 [Pricing Calculator](https://kredika.sn/pricing)
- 📊 [ROI Estimator](https://kredika.sn/roi)
- 🎯 [Use Cases](https://docs.kredika.sn/use-cases)
- ❓ [FAQ](https://docs.kredika.sn/faq)

**Vidéos Tutoriels :**
- 🎥 [Intégration en 10 minutes](https://youtube.com/kredika)
- 🎥 [Configurer les méthodes de paiement](https://youtube.com/kredika)
- 🎥 [Lire les analytics](https://youtube.com/kredika)

---

## 🔄 Roadmap Produit

### ✅ Phase 1 : Core MVP (Q4 2024)
- [x] API réservations de crédit
- [x] Gestion des échéances
- [x] Instructions enrichies multi-canal
- [x] Authentification dual (Partner + Admin)
- [x] Dashboard admin avec RBAC
- [x] Intégration Wave, Orange Money, Free Money
- [x] Audit trail complet

### 🚧 Phase 2 : Enhancement (Q1 2025)
- [ ] Dashboard partner complet
- [ ] SDK Java + Node.js + Python
- [ ] Webhooks avancés
- [ ] Scoring ML v1.0
- [ ] WhatsApp Business notifications
- [ ] Multi-langue UI (FR, WO, EN)

### 📅 Phase 3 : Scale (Q2-Q3 2025)
- [ ] Multi-devises (XOF, EUR, USD)
- [ ] Intégrations bancaires directes
- [ ] Scoring ML v2.0 (deep learning)
- [ ] API de recouvrement
- [ ] Marketplace de partenaires
- [ ] Mobile Apps (iOS + Android)

### 🎯 Phase 4 : Enterprise (Q4 2025)
- [ ] White-label complet
- [ ] SLA 99.9% garanti
- [ ] Support dédié 24/7
- [ ] Conformité bancaire complète
- [ ] Certification PCI-DSS
- [ ] Expansion régionale (CI, Mali, Burkina)

---

## 🏆 Avantages Compétitifs

### Pour les Partenaires

✅ **Intégration ultra-rapide** : 2-3 jours vs 6-12 mois  
✅ **Sans risque financier** : Vous gardez le contrôle  
✅ **Infrastructure complète** : Tout en SaaS, scalable  
✅ **Local-first** : Adapté à l'Afrique de l'Ouest  
✅ **Support multilingue** : FR, WO, EN natif  
✅ **Pas de capital requis** : Juste un abonnement

### Pour les Clients Finaux

✅ **Accessibilité** : Crédit sans banque  
✅ **Transparence** : Zéro frais cachés  
✅ **Flexibilité** : Choix du moyen de paiement  
✅ **Simplicité** : Instructions claires  
✅ **Autonomie** : Self-service complet

---

## 👥 Support & Contact

### Support Technique

📧 **Email** : dev@kredika.sn  
💬 **Slack** : [kredika-developers.slack.com](https://kredika-developers.slack.com)  
📖 **Docs** : [docs.kredika.sn](https://docs.kredika.sn)  
🔴 **Status** : [status.kredika.sn](https://status.kredika.sn)

### Support Commercial

📧 **Email** : sales@kredika.sn  
📞 **Téléphone** : +221 33 XXX XX XX  
💬 **WhatsApp** : +221 77 XXX XX XX

### Communauté

💬 **Forum** : [community.kredika.sn](https://community.kredika.sn)  
🐙 **GitHub** : [github.com/kredika](https://github.com/kredika)  
📰 **Newsletter** : Mensuelle  
🎓 **Webinaires** : Trimestriels

---

## 🌟 Témoignages (Projections)

### E-commerce
*"Kredika Core nous a permis d'augmenter notre panier moyen de 45% et notre taux de conversion de 23%. L'intégration a pris 3 jours."*  
— Directeur Technique, Marketplace sénégalaise

### Retail
*"Nous avons digitalisé notre crédit magasin en 1 semaine. Le taux de remboursement dépasse 95% grâce aux rappels automatisés."*  
— Gérant, Chaîne de boutiques

### Fintech
*"Kredika nous a évité 8 mois de développement. Leur API est clean, leur doc est top, leur support est réactif."*  
— CTO, Startup fintech

---

## 📜 Licence & Propriété

© 2025 **Kredika Technologies SARL**. Tous droits réservés.

**Siège Social**  
Dakar, Sénégal  
NINEA : [à compléter]

L'utilisation de Kredika Core est soumise à une **licence commerciale**.

📄 **CGU** : [www.kredika.sn/terms](https://www.kredika.sn/terms)  
🔒 **Politique de confidentialité** : [www.kredika.sn/privacy](https://www.kredika.sn/privacy)  
⚖️ **Mentions légales** : [www.kredika.sn/legal](https://www.kredika.sn/legal)

Pour toute demande de **licence** ou **partenariat** :  
📧 partnership@kredika.sn

---

## 🚀 Démarrer Maintenant

### 1️⃣ Créer un compte
👉 [app.kredika.sn/register](https://app.kredika.sn/register)

### 2️⃣ Obtenir vos clés API
Dès l'inscription, vous recevez :
- `clientId` : pk_xxxxx
- `clientSecret` : sk_live_xxxxx

### 3️⃣ Lire la doc
👉 [docs.kredika.sn](https://docs.kredika.sn)

### 4️⃣ Intégrer en 2h
Suivez le Quick Start Guide

### 5️⃣ Lancer en production
Go live et commencez à accepter du crédit !

---

## 📊 Métriques Cibles (2025)

| Métrique | Q1 | Q2 | Q3 | Q4 |
|----------|----|----|----|----|
| **Partenaires actifs** | 10 | 30 | 100 | 250 |
| **Volume crédits/mois** | 50M XOF | 200M | 1Mrd | 5Mrd |
| **Taux remboursement** | 90% | 92% | 94% | 95% |
| **Uptime API** | 99.5% | 99.7% | 99.9% | 99.9% |

---

## 🎯 Notre Mission

**Démocratiser l'accès au crédit en Afrique de l'Ouest** en fournissant l'infrastructure technologique qui permet à chaque entreprise, quelle que soit sa taille, d'offrir du Buy Now Pay Later à ses clients.

**Kredika Core** = Le Stripe du crédit africain. 🚀

---

## 📧 Questions ?

💬 **Chat en direct** : [app.kredika.sn](https://app.kredika.sn) (coin bas-droite)  
📧 **Email** : hello@kredika.sn  
📱 **WhatsApp** : +221 77 XXX XX XX

**Réponse garantie sous 24h** ⚡

---

<div align="center">

**Kredika Core — L'Infrastructure du Crédit en Afrique** 🌍

[Website](https://kredika.sn) • [Documentation](https://docs.kredika.sn) • [Dashboard](https://app.kredika.sn) • [Status](https://status.kredika.sn)

Made with ❤️ in Dakar, Senegal

</div>
