# 🚀 Kredika Core SaaS - Frontend

Application frontend Angular pour la plateforme Kredika Core SaaS.

![Angular](https://img.shields.io/badge/Angular-21.0-red)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-orange)

## 📋 Table des matières

- [Aperçu](#-aperçu)
- [Démarrage rapide](#-démarrage-rapide)
- [Documentation](#-documentation)
- [Technologies](#️-technologies)
- [Développement](#-développement)
- [Tests](#-tests)
- [Build](#-build)
- [CI/CD](#-cicd)
- [Déploiement](#-déploiement)
- [Ressources](#-ressources)

## 🎯 Aperçu

Kredika Core SaaS Frontend est une application Angular moderne pour la gestion de :
- 🔐 Authentification et autorisation
- 👥 Gestion des partenaires
- 💳 Méthodes de paiement
- 📊 Limites de crédit
- 🔄 Réservations de crédit
- 📅 Échéanciers et instructions de paiement

## ⚡ Démarrage rapide

### Prérequis

- Node.js 20+
- npm 11+
- Docker (optionnel)

### Installation

```bash
# Cloner le repository
git clone https://github.com/spirittechrevolution/kredika_core_saas_front.git
cd kredika_core_saas_front

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application sera accessible sur `http://localhost:4200/`

### Avec Docker

```bash
# Build et démarrer avec Docker Compose
docker-compose up -d

# Accéder à l'application
# http://localhost:8080
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [CI_CD_README.md](./CI_CD_README.md) | Guide complet CI/CD avec GitHub Actions |
| [COMMANDS.md](./COMMANDS.md) | Référence rapide des commandes |
| [FULLSTACK_SETUP.md](./FULLSTACK_SETUP.md) | Configuration Frontend + Backend |
| [SETUP_SUMMARY.md](./SETUP_SUMMARY.md) | Récapitulatif de la configuration |

## 🛠️ Technologies

- **Framework** : Angular 21.0
- **Runtime** : Node.js 20
- **Styling** : Tailwind CSS 4.1
- **Tests** : Vitest 4.0
- **Build** : Angular CLI
- **Server** : Nginx (production)
- **Container** : Docker

## 💻 Développement

### Serveur de développement

```bash
# Démarrer le serveur
npm start
# ou
ng serve
```

Ouvrez `http://localhost:4200/` dans votre navigateur. L'application se recharge automatiquement lors des modifications.

### Variables d'environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer .env avec vos valeurs
```

### Génération de code (scaffolding)

```bash
# Générer un composant
ng generate component component-name

# Générer un service
ng generate service service-name

# Voir toutes les options
ng generate --help
```

## 🧪 Tests

```bash
# Exécuter tous les tests
npm test

# Tests avec couverture
npm test -- --coverage

# Tests en mode watch
npm test -- --watch

# Test d'un fichier spécifique
npm test -- --include src/app/services/auth.service.spec.ts
```

## 📦 Build

```bash
# Build de production
npm run build

# Build avec configuration spécifique
npm run build -- --configuration production

# Build en mode watch
npm run watch
```

Les fichiers buildés seront dans le dossier `dist/`.

## 🔄 CI/CD

Le projet utilise **GitHub Actions** pour l'intégration et le déploiement continus.

### Pipeline

1. **Linting & Formatting** : Vérification du code avec Prettier
2. **Tests** : Exécution des tests unitaires avec couverture
3. **Build** : Compilation de l'application Angular
4. **Docker** : Build et push de l'image Docker
5. **Release** : Création automatique de releases GitHub (branche main)

### Configuration des secrets

Dans **Settings → Secrets and variables → Actions**, ajoutez :

- `DOCKER_USERNAME` : Nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Mot de passe ou token Docker Hub

Voir [CI_CD_README.md](./CI_CD_README.md) pour plus de détails.

## 🚀 Déploiement

### Option 1 : Scripts de déploiement

**Windows PowerShell :**
```powershell
.\deploy.ps1 -Environment local
.\deploy.ps1 -Environment staging
.\deploy.ps1 -Environment production
```

**Linux/Mac :**
```bash
./deploy.sh local
./deploy.sh staging
./deploy.sh production
```

### Option 2 : Docker Compose

```bash
# Frontend seul
docker-compose up -d

# Full-stack (Frontend + Backend + PostgreSQL)
docker-compose -f docker-compose.fullstack.yml up -d
```

### Option 3 : Image Docker Hub

```bash
# Pull et run
docker pull spirittechrevolution/kredika-frontend:latest
docker run -d -p 80:80 spirittechrevolution/kredika-frontend:latest
```

## 🔧 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm start` | Démarre le serveur de développement |
| `npm run build` | Build de production |
| `npm test` | Exécute les tests unitaires |
| `npm run watch` | Build en mode watch |

Voir [COMMANDS.md](./COMMANDS.md) pour la liste complète.

## 🏗️ Structure du projet

```
src/
├── app/
│   ├── components/       # Composants réutilisables
│   │   ├── footer/
│   │   ├── navbar/
│   │   └── ...
│   ├── pages/           # Pages/vues de l'application
│   │   ├── home/
│   │   ├── dashboard/
│   │   ├── login/
│   │   └── ...
│   ├── services/        # Services Angular
│   ├── models/          # Modèles de données
│   ├── guards/          # Guards de routing
│   └── interceptors/    # Intercepteurs HTTP
├── environments/        # Configuration d'environnement
└── assets/             # Ressources statiques
```

## 📊 Fonctionnalités

- ✅ Build multi-stage Docker optimisé
- ✅ Pipeline CI/CD automatisé
- ✅ Tests unitaires avec couverture
- ✅ Linting et formatage automatiques
- ✅ Configuration Nginx optimisée
- ✅ Health checks Docker
- ✅ Versioning automatique (semver)
- ✅ Releases GitHub automatiques
- ✅ Support full-stack
- ✅ Scripts de déploiement multi-OS

## 🔗 Ressources

- [Documentation Angular](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Docker Documentation](https://docs.docker.com)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📝 Licence

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

---

✨ **Fait avec ❤️ par l'équipe Kredika**
