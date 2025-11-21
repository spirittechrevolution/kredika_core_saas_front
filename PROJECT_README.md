# Kredika Core SaaS - Frontend Configuration

Application web Angular moderne pour la gestion de crédits et de partenaires commerciaux.

## 🚀 Fonctionnalités

### Pages Principales

- **Page d'accueil (`/`)** - Landing page avec présentation des fonctionnalités
- **Dashboard (`/dashboard`)** - Vue d'ensemble des statistiques et activités
- **Partenaires (`/partner`)** - Gestion des partenaires commerciaux
- **Réservations (`/reservation`)** - Gestion des réservations de crédit
- **Échéances (`/cheance`)** - Suivi des échéances de paiement
- **Instructions de Paiement (`/instruction`)** - Génération et gestion des instructions (QR codes, liens, virements)

### Authentification

- Interface de connexion moderne avec Client ID/Secret
- Gestion sécurisée des tokens JWT
- Protection des routes privées

## 🛠️ Stack Technique

- **Framework**: Angular 21.0.0
- **Styling**: Tailwind CSS 4.1.12
- **HTTP Client**: Angular HttpClient avec support SSR
- **Routing**: Angular Router
- **State Management**: Angular Signals
- **TypeScript**: 5.9.2

## 📦 Installation

```bash
npm install
```

## 🚦 Démarrage

### Mode Développement

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

### Build de Production

```bash
npm run build
```

### Tests

```bash
npm test
```

## 🏗️ Architecture du Projet

```
src/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── navbar/
│   │   └── footer/
│   ├── models/              # Interfaces TypeScript
│   │   ├── auth.model.ts
│   │   ├── partner.model.ts
│   │   ├── credit-reservation.model.ts
│   │   ├── installment.model.ts
│   │   ├── payment-instruction.model.ts
│   │   └── payment-event.model.ts
│   ├── services/            # Services API
│   │   ├── auth.service.ts
│   │   ├── partner.service.ts
│   │   ├── credit-reservation.service.ts
│   │   ├── installment.service.ts
│   │   └── payment-instruction.service.ts
│   ├── pages/               # Pages de l'application
│   │   ├── home/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── partner/
│   │   ├── reservation/
│   │   ├── echeance/
│   │   └── instruction/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── styles.css
└── index.html
```

## 🔌 API Backend

L'application se connecte à l'API Kredika Core Backend:
- **URL de base**: `http://localhost:7575/api`
- **Documentation**: OpenAPI 3.1.0 (voir `prompt/openapi.json`)

### Endpoints Principaux

- `/v1/auth/*` - Authentification
- `/v1/partners/*` - Gestion des partenaires
- `/v1/credits/reservations/*` - Réservations de crédit
- `/v1/installments/*` - Gestion des échéances
- `/v1/payment-instructions/*` - Instructions de paiement

## 🎨 Design

L'application utilise un design moderne et minimaliste avec:
- Palette de couleurs: Indigo & Purple (gradients)
- Composants réactifs et adaptatifs (mobile-first)
- Animations et transitions fluides
- Interface utilisateur intuitive

## 🔐 Authentification

Le système d'authentification utilise:
- Client ID / Client Secret pour la connexion
- JWT tokens pour les requêtes API
- LocalStorage pour la persistance des tokens
- Guards pour la protection des routes

## 📝 Modèles de Données

Tous les modèles TypeScript sont générés depuis la spécification OpenAPI et incluent:
- Enums pour les statuts
- Interfaces complètes avec tous les champs
- Types stricts pour la validation

## 🚀 Déploiement

L'application est configurée pour le SSR (Server-Side Rendering) avec Angular Universal:

```bash
npm run build
npm run serve:ssr:kredika_core_saas_front_config
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est privé et confidentiel.

## 👥 Équipe

Kredika Development Team

---

Pour plus d'informations, consultez la documentation technique dans le dossier `prompt/`.
