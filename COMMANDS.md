# 📋 Commandes utiles - Kredika Frontend

## 🐳 Docker

### Build et Run
```bash
# Build l'image
docker build -t kredika-frontend .

# Run le conteneur
docker run -d -p 8080:80 --name kredika-frontend kredika-frontend

# Avec docker-compose
docker-compose up -d

# Rebuild et redémarrer
docker-compose up -d --build
```

### Logs et Debug
```bash
# Voir les logs du conteneur
docker logs kredika-frontend
docker logs -f kredika-frontend  # Follow mode

# Avec docker-compose
docker-compose logs -f

# Accéder au shell du conteneur
docker exec -it kredika-frontend sh

# Vérifier la config Nginx
docker exec kredika-frontend nginx -t

# Voir les logs Nginx
docker exec kredika-frontend cat /var/log/nginx/access.log
docker exec kredika-frontend cat /var/log/nginx/error.log
```

### Nettoyage
```bash
# Arrêter et supprimer le conteneur
docker stop kredika-frontend
docker rm kredika-frontend

# Avec docker-compose
docker-compose down

# Supprimer l'image
docker rmi kredika-frontend

# Nettoyer toutes les images inutilisées
docker system prune -a

# Nettoyer les volumes
docker volume prune
```

## 📦 NPM / Build

### Installation et Build
```bash
# Installer les dépendances
npm install
npm ci --legacy-peer-deps  # Pour CI/CD

# Démarrer le serveur de dev
npm start
npm run start

# Build production
npm run build

# Build avec configuration spécifique
npm run build -- --configuration production
```

### Tests
```bash
# Lancer tous les tests
npm test

# Tests avec couverture
npm test -- --coverage

# Tests en mode watch
npm test -- --watch

# Lancer un test spécifique
npm test -- --include src/app/services/auth.service.spec.ts
```

### Linting et Formatage
```bash
# Formater le code avec Prettier
npx prettier --write "src/**/*.{ts,html,css,scss,json}"

# Vérifier le formatage
npx prettier --check "src/**/*.{ts,html,css,scss,json}"

# Linting (si configuré)
npm run lint
```

## 🚀 Déploiement

### Scripts de déploiement
```bash
# Linux/Mac
./deploy.sh local
./deploy.sh staging
./deploy.sh production

# Windows PowerShell
.\deploy.ps1 -Environment local
.\deploy.ps1 -Environment staging
.\deploy.ps1 -Environment production
```

### Docker Hub
```bash
# Login Docker Hub
docker login

# Tag et push manuel
docker tag kredika-frontend username/kredika-frontend:latest
docker push username/kredika-frontend:latest

# Build et push avec un tag spécifique
docker build -t username/kredika-frontend:v1.0.0 .
docker push username/kredika-frontend:v1.0.0
```

### Déploiement sur serveur distant
```bash
# Se connecter au serveur
ssh user@server-ip

# Pull et redémarrer
cd /opt/kredika-frontend
docker-compose pull
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Vérifier le status
docker-compose ps
```

## 🔍 Debug et Monitoring

### Health Check
```bash
# Vérifier que l'app répond
curl http://localhost:8080/health

# Sur le serveur de production
curl https://votre-domaine.com/health
```

### Monitoring des ressources
```bash
# Voir l'utilisation des ressources
docker stats kredika-frontend

# Inspecter le conteneur
docker inspect kredika-frontend

# Voir les processus dans le conteneur
docker top kredika-frontend
```

### Network et Ports
```bash
# Lister les ports exposés
docker port kredika-frontend

# Inspecter le réseau
docker network inspect kredika-network
```

## 🔧 Configuration

### Variables d'environnement
```bash
# Définir DOCKER_USERNAME (Linux/Mac)
export DOCKER_USERNAME=votre-username

# Windows PowerShell
$env:DOCKER_USERNAME = "votre-username"

# Définir de manière permanente (Windows)
setx DOCKER_USERNAME "votre-username"
```

### Secrets GitHub
```bash
# Avec GitHub CLI
gh secret set DOCKER_USERNAME
gh secret set DOCKER_PASSWORD

# Lister les secrets
gh secret list
```

## 🛠️ Maintenance

### Mise à jour des dépendances
```bash
# Vérifier les packages obsolètes
npm outdated

# Mettre à jour les dépendances
npm update

# Mettre à jour Angular
ng update @angular/core @angular/cli

# Audit de sécurité
npm audit
npm audit fix
```

### Optimisation
```bash
# Analyser la taille du bundle
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/kredika_core_saas_front_config/stats.json

# Vérifier la compression
curl -I -H "Accept-Encoding: gzip" http://localhost:8080
```

## 📊 GitHub Actions

### Forcer un re-run
```bash
# Avec GitHub CLI
gh run list
gh run rerun <run-id>

# Vérifier le status
gh run view <run-id>
```

### Télécharger les artifacts
```bash
# Avec GitHub CLI
gh run download <run-id>

# Télécharger un artifact spécifique
gh run download <run-id> -n kredika-frontend-dist
```

## 🔐 Sécurité

### Scanner les vulnérabilités
```bash
# Audit npm
npm audit
npm audit fix

# Avec Snyk (si installé)
npx snyk test

# Scanner l'image Docker
docker scan kredika-frontend
```

### Générer une clé SSH pour le déploiement
```bash
# Générer une paire de clés
ssh-keygen -t ed25519 -C "deploy@kredika-frontend" -f ~/.ssh/kredika_deploy

# Copier la clé publique sur le serveur
ssh-copy-id -i ~/.ssh/kredika_deploy.pub user@server-ip

# Ajouter la clé privée aux secrets GitHub
cat ~/.ssh/kredika_deploy | gh secret set DEPLOY_SSH_KEY
```

## 💡 Astuces

### Développement rapide
```bash
# Watch mode pour les changements CSS
npm run watch

# Ouvrir automatiquement le navigateur
npm start -- --open

# Changer le port
npm start -- --port 4201
```

### Debugging Docker
```bash
# Build sans cache
docker build --no-cache -t kredika-frontend .

# Run en mode interactif
docker run -it --rm kredika-frontend sh

# Voir les layers de l'image
docker history kredika-frontend
```

### Performance
```bash
# Mesurer le temps de build
time npm run build

# Profiling du build
npm run build -- --profile

# Générer un rapport de build
npm run build -- --verbose
```

---

💡 **Astuce** : Ajoutez ces commandes à vos favoris ou créez des alias dans votre shell !
