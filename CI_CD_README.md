# 🚀 CI/CD Configuration - Kredika Frontend

Configuration complète de CI/CD pour le frontend Angular avec GitHub Actions et Docker.

## 📋 Table des matières

- [Fichiers créés](#fichiers-créés)
- [Configuration requise](#configuration-requise)
- [Utilisation Docker](#utilisation-docker)
- [Workflow GitHub Actions](#workflow-github-actions)
- [Déploiement](#déploiement)

## 📁 Fichiers créés

```
.
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # Workflow GitHub Actions
├── Dockerfile                  # Build multi-stage de l'application
├── docker-compose.yml          # Orchestration des conteneurs
├── nginx.conf                  # Configuration Nginx optimisée
└── .dockerignore              # Fichiers exclus du build Docker
```

## ⚙️ Configuration requise

### Secrets GitHub à configurer

Allez dans **Settings → Secrets and variables → Actions** de votre repository et ajoutez :

#### Requis pour Docker Hub
- `DOCKER_USERNAME` : Votre nom d'utilisateur Docker Hub
- `DOCKER_PASSWORD` : Votre token/mot de passe Docker Hub

#### Optionnels pour le déploiement automatique
- `DEPLOY_HOST` : IP/hostname du serveur de production
- `DEPLOY_USER` : Utilisateur SSH pour le déploiement
- `DEPLOY_SSH_KEY` : Clé privée SSH pour l'authentification
- `STAGING_HOST` : IP/hostname du serveur de staging
- `STAGING_USER` : Utilisateur SSH pour staging
- `STAGING_SSH_KEY` : Clé privée SSH pour staging

## 🐳 Utilisation Docker

### Build local de l'image

```bash
# Build de l'image
docker build -t kredika-frontend .

# Build avec un tag spécifique
docker build -t kredika-frontend:v1.0.0 .
```

### Lancement avec Docker Compose

```bash
# Démarrer l'application
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter l'application
docker-compose down

# Rebuild et redémarrer
docker-compose up -d --build
```

### Test de l'application

Une fois lancée, l'application est accessible sur :
- Frontend : http://localhost:8080
- Health check : http://localhost:8080/health

### Commandes Docker utiles

```bash
# Lister les conteneurs en cours
docker ps

# Accéder au shell du conteneur
docker exec -it kredika-frontend sh

# Voir les logs Nginx
docker exec kredika-frontend cat /var/log/nginx/access.log
docker exec kredika-frontend cat /var/log/nginx/error.log

# Nettoyer les images inutilisées
docker system prune -a
```

## 🔄 Workflow GitHub Actions

Le workflow s'exécute automatiquement sur :
- Push vers `main`, `develop`, `feature/**`, `bugfix/**`, `hotfix/**`, `refactor/**`
- Pull requests vers `main` ou `develop`

### Jobs du pipeline

1. **lint-and-format** : Vérification du formatage avec Prettier
2. **test** : Exécution des tests unitaires avec couverture
3. **build** : Build de l'application Angular
4. **docker** : Build et push de l'image Docker (uniquement sur push)
5. **release** : Création de release GitHub (uniquement sur `main`)

### Tags Docker générés

Pour chaque branche, plusieurs tags sont créés :
- `{branch-name}` : Tag de la branche (ex: `main`, `develop`, `feature-auth`)
- `latest` : Uniquement pour la branche `main`
- `{branch-name}-{sha}` : Tag avec le hash du commit
- `{branch-name}-{date}` : Tag avec la date et l'heure

#### Exemples

Sur la branche `main` :
```
spirittechrevolution/kredika-frontend:main
spirittechrevolution/kredika-frontend:latest
spirittechrevolution/kredika-frontend:main-a1b2c3d
spirittechrevolution/kredika-frontend:main-20241122-143022
```

Sur la branche `feature/auth` :
```
spirittechrevolution/kredika-frontend:feature-auth
spirittechrevolution/kredika-frontend:feature-auth-x9y8z7w
spirittechrevolution/kredika-frontend:feature-auth-20241122-143022
```

### Artifacts générés

Le workflow génère et conserve pendant 7 jours :
- Rapport de couverture de tests
- Build de l'application (dist/)
- Archive `.tar.gz` de la release

## 📦 Déploiement

### Déploiement automatique (optionnel)

Pour activer le déploiement automatique :

1. Décommentez les jobs `deploy` et/ou `deploy-staging` dans `.github/workflows/ci-cd.yml`
2. Configurez les secrets nécessaires
3. Ajustez les chemins de déploiement selon votre infrastructure

### Déploiement manuel

#### Sur un serveur avec Docker

```bash
# Se connecter au serveur
ssh user@your-server.com

# Créer le répertoire de l'application
mkdir -p /opt/kredika-frontend
cd /opt/kredika-frontend

# Créer un docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  frontend:
    image: {DOCKER_USERNAME}/kredika-frontend:latest
    container_name: kredika-frontend
    ports:
      - "80:80"
    restart: unless-stopped
EOF

# Démarrer l'application
docker-compose pull
docker-compose up -d

# Vérifier les logs
docker-compose logs -f
```

#### Avec Nginx reverse proxy

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 🔧 Configuration avec le backend

Pour connecter le frontend au backend Kredika Core, décommentez la section complète dans `docker-compose.yml` et configurez les variables d'environnement :

```yaml
environment:
  - API_URL=http://kredika-backend:8081
```

## 📊 Monitoring et Health Checks

Le conteneur inclut un endpoint de health check :
```bash
curl http://localhost:8080/health
```

Docker Compose vérifie automatiquement la santé du conteneur toutes les 30 secondes.

## 🛠️ Développement local

Pour le développement, utilisez les commandes Angular classiques :

```bash
# Installation
npm install

# Dev server
npm start

# Build
npm run build

# Tests
npm test
```

## 📝 Notes importantes

1. **Node.js 20** : Le workflow utilise Node.js 20 (LTS)
2. **Cache npm** : Les dépendances sont cachées pour accélérer les builds
3. **Multi-stage build** : L'image Docker finale ne contient que les fichiers buildés (optimisation)
4. **Nginx optimisé** : Configuration avec compression Gzip, cache des assets, security headers
5. **Versioning automatique** : Les releases incrémentent automatiquement le numéro de patch

## 🚨 Troubleshooting

### Le build échoue dans GitHub Actions
- Vérifiez que `npm ci --legacy-peer-deps` fonctionne localement
- Consultez les logs de l'action dans l'onglet "Actions" du repository

### L'image Docker ne démarre pas
```bash
# Vérifier les logs
docker logs kredika-frontend

# Vérifier la configuration Nginx
docker exec kredika-frontend nginx -t
```

### Port 8080 déjà utilisé
Modifiez le port dans `docker-compose.yml` :
```yaml
ports:
  - "3000:80"  # Utiliser le port 3000 au lieu de 8080
```

## 📚 Ressources

- [Documentation GitHub Actions](https://docs.github.com/en/actions)
- [Documentation Docker](https://docs.docker.com/)
- [Documentation Nginx](https://nginx.org/en/docs/)
- [Angular Deployment Guide](https://angular.io/guide/deployment)

---

✅ Configuration CI/CD prête à l'emploi !
