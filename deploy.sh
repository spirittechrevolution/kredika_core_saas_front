#!/bin/bash

# Script de déploiement rapide pour Kredika Frontend
# Usage: ./deploy.sh [environment]
# Environments: local, staging, production

set -e

ENVIRONMENT=${1:-local}
DOCKER_USERNAME=${DOCKER_USERNAME:-""}

echo "🚀 Déploiement Kredika Frontend - Environnement: $ENVIRONMENT"
echo "=================================================="

case $ENVIRONMENT in
  local)
    echo "📦 Build et démarrage en local..."
    docker-compose up -d --build
    echo "✅ Application disponible sur http://localhost:8080"
    echo "💡 Logs: docker-compose logs -f"
    ;;

  staging)
    echo "🔧 Déploiement sur staging..."
    if [ -z "$DOCKER_USERNAME" ]; then
      echo "❌ Erreur: DOCKER_USERNAME doit être défini"
      exit 1
    fi

    # Build et push
    docker build -t $DOCKER_USERNAME/kredika-frontend:staging .
    docker push $DOCKER_USERNAME/kredika-frontend:staging

    echo "✅ Image staging pushée sur Docker Hub"
    echo "💡 Pour déployer sur le serveur staging:"
    echo "   ssh user@staging-server 'cd /opt/kredika-frontend-staging && docker-compose pull && docker-compose up -d'"
    ;;

  production)
    echo "🚀 Déploiement en production..."
    if [ -z "$DOCKER_USERNAME" ]; then
      echo "❌ Erreur: DOCKER_USERNAME doit être défini"
      exit 1
    fi

    # Confirmation
    read -p "⚠️  Êtes-vous sûr de vouloir déployer en production ? (yes/no) " -r
    echo
    if [[ ! $REPLY =~ ^yes$ ]]; then
      echo "❌ Déploiement annulé"
      exit 1
    fi

    # Build et push
    docker build -t $DOCKER_USERNAME/kredika-frontend:latest .
    docker build -t $DOCKER_USERNAME/kredika-frontend:$(date +%Y%m%d-%H%M%S) .
    docker push $DOCKER_USERNAME/kredika-frontend:latest
    docker push $DOCKER_USERNAME/kredika-frontend:$(date +%Y%m%d-%H%M%S)

    echo "✅ Image production pushée sur Docker Hub"
    echo "💡 Pour déployer sur le serveur production:"
    echo "   ssh user@prod-server 'cd /opt/kredika-frontend && docker-compose pull && docker-compose up -d'"
    ;;

  *)
    echo "❌ Environnement invalide: $ENVIRONMENT"
    echo "Usage: ./deploy.sh [local|staging|production]"
    exit 1
    ;;
esac

echo ""
echo "✅ Déploiement $ENVIRONMENT terminé avec succès !"
