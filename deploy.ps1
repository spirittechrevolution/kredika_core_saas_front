# Script de déploiement rapide pour Kredika Frontend (Windows)
# Usage: .\deploy.ps1 -Environment local|staging|production

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("local", "staging", "production")]
    [string]$Environment = "local"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Déploiement Kredika Frontend - Environnement: $Environment" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$dockerUsername = $env:DOCKER_USERNAME

switch ($Environment) {
    "local" {
        Write-Host "📦 Build et démarrage en local..." -ForegroundColor Yellow
        docker-compose up -d --build
        Write-Host "✅ Application disponible sur http://localhost:8080" -ForegroundColor Green
        Write-Host "💡 Logs: docker-compose logs -f" -ForegroundColor Blue
    }

    "staging" {
        Write-Host "🔧 Déploiement sur staging..." -ForegroundColor Yellow

        if ([string]::IsNullOrEmpty($dockerUsername)) {
            Write-Host "❌ Erreur: La variable d'environnement DOCKER_USERNAME doit être définie" -ForegroundColor Red
            exit 1
        }

        # Build et push
        Write-Host "Building image..." -ForegroundColor Yellow
        docker build -t "$dockerUsername/kredika-frontend:staging" .

        Write-Host "Pushing to Docker Hub..." -ForegroundColor Yellow
        docker push "$dockerUsername/kredika-frontend:staging"

        Write-Host "✅ Image staging pushée sur Docker Hub" -ForegroundColor Green
        Write-Host "💡 Pour déployer sur le serveur staging:" -ForegroundColor Blue
        Write-Host "   ssh user@staging-server 'cd /opt/kredika-frontend-staging && docker-compose pull && docker-compose up -d'" -ForegroundColor Gray
    }

    "production" {
        Write-Host "🚀 Déploiement en production..." -ForegroundColor Yellow

        if ([string]::IsNullOrEmpty($dockerUsername)) {
            Write-Host "❌ Erreur: La variable d'environnement DOCKER_USERNAME doit être définie" -ForegroundColor Red
            exit 1
        }

        # Confirmation
        $confirmation = Read-Host "⚠️  Êtes-vous sûr de vouloir déployer en production ? (yes/no)"
        if ($confirmation -ne "yes") {
            Write-Host "❌ Déploiement annulé" -ForegroundColor Red
            exit 1
        }

        # Build et push
        $timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

        Write-Host "Building images..." -ForegroundColor Yellow
        docker build -t "$dockerUsername/kredika-frontend:latest" .
        docker build -t "$dockerUsername/kredika-frontend:$timestamp" .

        Write-Host "Pushing to Docker Hub..." -ForegroundColor Yellow
        docker push "$dockerUsername/kredika-frontend:latest"
        docker push "$dockerUsername/kredika-frontend:$timestamp"

        Write-Host "✅ Image production pushée sur Docker Hub" -ForegroundColor Green
        Write-Host "💡 Tags créés: latest, $timestamp" -ForegroundColor Blue
        Write-Host "💡 Pour déployer sur le serveur production:" -ForegroundColor Blue
        Write-Host "   ssh user@prod-server 'cd /opt/kredika-frontend && docker-compose pull && docker-compose up -d'" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✅ Déploiement $Environment terminé avec succès !" -ForegroundColor Green
