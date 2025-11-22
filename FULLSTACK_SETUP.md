# 🔗 Configuration Full Stack - Frontend + Backend

Guide pour déployer le frontend Angular avec le backend Kredika Core.

## 📋 Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client Browser                     │
└─────────────────────┬───────────────────────────────┘
                      │ HTTP
                      ▼
┌─────────────────────────────────────────────────────┐
│              Nginx (Port 80/443)                     │
│         kredika-frontend:latest                      │
│          Angular SPA Application                     │
└─────────────────────┬───────────────────────────────┘
                      │ REST API
                      ▼
┌─────────────────────────────────────────────────────┐
│         Spring Boot API (Port 8080)                  │
│           kredika-core:latest                        │
│              Backend Services                        │
└─────────────────────┬───────────────────────────────┘
                      │ JDBC
                      ▼
┌─────────────────────────────────────────────────────┐
│           PostgreSQL (Port 5432)                     │
│              Database Server                         │
└─────────────────────────────────────────────────────┘
```

## 🚀 Option 1 : Docker Compose Full Stack

### Fichier docker-compose.fullstack.yml

Créez un nouveau fichier `docker-compose.fullstack.yml` :

```yaml
version: '3.8'

services:
  # Base de données PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: kredika-postgres
    environment:
      POSTGRES_DB: kredika_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD:-postgres}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - kredika-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: unless-stopped

  # Backend Spring Boot
  backend:
    image: ${DOCKER_USERNAME}/kredika-core:latest
    container_name: kredika-backend
    environment:
      # Database
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/kredika_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD:-postgres}
      
      # JPA
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
      SPRING_JPA_SHOW_SQL: false
      
      # Profile
      SPRING_PROFILES_ACTIVE: prod
      
      # CORS (ajuster selon votre domaine)
      ALLOWED_ORIGINS: http://localhost:8080,https://votre-domaine.com
    ports:
      - "8081:8080"
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - kredika-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 60s

  # Frontend Angular
  frontend:
    image: ${DOCKER_USERNAME}/kredika-frontend:latest
    container_name: kredika-frontend
    environment:
      # L'URL API est configurée dans l'application Angular
      API_URL: http://backend:8080
    ports:
      - "80:80"
    depends_on:
      - backend
    networks:
      - kredika-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

volumes:
  postgres_data:
    driver: local

networks:
  kredika-network:
    driver: bridge
```

### Utilisation

```bash
# Créer un fichier .env
cat > .env << EOF
DOCKER_USERNAME=votre-username
DB_PASSWORD=votre_mot_de_passe_securise
EOF

# Démarrer toute la stack
docker-compose -f docker-compose.fullstack.yml up -d

# Vérifier les logs
docker-compose -f docker-compose.fullstack.yml logs -f

# Arrêter la stack
docker-compose -f docker-compose.fullstack.yml down

# Arrêter et supprimer les volumes
docker-compose -f docker-compose.fullstack.yml down -v
```

### URLs d'accès

- **Frontend** : http://localhost
- **Backend API** : http://localhost:8081
- **Backend Health** : http://localhost:8081/actuator/health
- **PostgreSQL** : localhost:5432

## 🔧 Option 2 : Configuration avec Nginx Reverse Proxy

Si vous voulez tout exposer sur le port 80/443 avec Nginx :

### nginx.fullstack.conf

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Upstream Backend
    upstream backend {
        server backend:8080;
    }

    # Configuration principale
    server {
        listen 80;
        server_name localhost;

        # Logs
        access_log /var/log/nginx/access.log;
        error_log /var/log/nginx/error.log;

        # API Backend (proxy vers Spring Boot)
        location /api/ {
            proxy_pass http://backend/;
            proxy_http_version 1.1;
            
            # Headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
            
            # CORS (si nécessaire)
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
        }

        # Frontend Angular
        location / {
            root /usr/share/nginx/html;
            try_files $uri $uri/ /index.html;
            
            # Cache pour les assets
            location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
                expires 1y;
                add_header Cache-Control "public, immutable";
            }
            
            # Pas de cache pour index.html
            location = /index.html {
                add_header Cache-Control "no-cache, no-store, must-revalidate";
                add_header Pragma "no-cache";
                add_header Expires "0";
            }
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

Modifiez le `Dockerfile` pour utiliser cette config :

```dockerfile
# Copier la configuration Nginx avec reverse proxy
COPY nginx.fullstack.conf /etc/nginx/nginx.conf
```

## 🌐 Option 3 : Configuration Production avec SSL

### docker-compose.production.yml

```yaml
version: '3.8'

services:
  nginx-proxy:
    image: nginxproxy/nginx-proxy:alpine
    container_name: nginx-proxy
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /var/run/docker.sock:/tmp/docker.sock:ro
      - ./certs:/etc/nginx/certs:ro
      - ./vhost:/etc/nginx/vhost.d
      - ./html:/usr/share/nginx/html
    networks:
      - kredika-network
    restart: unless-stopped

  letsencrypt:
    image: nginxproxy/acme-companion
    container_name: letsencrypt
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./certs:/etc/nginx/certs
      - ./vhost:/etc/nginx/vhost.d
      - ./html:/usr/share/nginx/html
      - ./acme:/etc/acme.sh
    environment:
      NGINX_PROXY_CONTAINER: nginx-proxy
    networks:
      - kredika-network
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    container_name: kredika-postgres
    environment:
      POSTGRES_DB: kredika_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - kredika-network
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    image: ${DOCKER_USERNAME}/kredika-core:latest
    container_name: kredika-backend
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/kredika_db
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
      SPRING_PROFILES_ACTIVE: prod
      VIRTUAL_HOST: api.${DOMAIN}
      LETSENCRYPT_HOST: api.${DOMAIN}
      LETSENCRYPT_EMAIL: ${EMAIL}
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - kredika-network
    restart: unless-stopped

  frontend:
    image: ${DOCKER_USERNAME}/kredika-frontend:latest
    container_name: kredika-frontend
    environment:
      VIRTUAL_HOST: ${DOMAIN}
      LETSENCRYPT_HOST: ${DOMAIN}
      LETSENCRYPT_EMAIL: ${EMAIL}
    depends_on:
      - backend
    networks:
      - kredika-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  kredika-network:
    driver: bridge
```

### Fichier .env pour production

```env
DOCKER_USERNAME=votre-username
DB_PASSWORD=mot_de_passe_tres_securise
DOMAIN=votre-domaine.com
EMAIL=votre@email.com
```

## 📝 Configuration Angular pour l'API

### src/environments/environment.ts

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api'
};
```

### src/environments/environment.prod.ts

```typescript
export const environment = {
  production: true,
  apiUrl: '/api'  // Utilise le même domaine avec /api prefix
};
```

### Utilisation dans un service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.apiUrl}/endpoint`);
  }
}
```

## 🔍 Vérification de la configuration

### Script de test

Créez `test-fullstack.sh` :

```bash
#!/bin/bash

echo "🔍 Test de la stack complète..."
echo ""

# Test PostgreSQL
echo "1️⃣ Test PostgreSQL..."
docker exec kredika-postgres psql -U postgres -c "SELECT version();" > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ PostgreSQL OK"
else
    echo "   ❌ PostgreSQL ERROR"
fi

# Test Backend
echo "2️⃣ Test Backend API..."
BACKEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8081/actuator/health)
if [ "$BACKEND_STATUS" = "200" ]; then
    echo "   ✅ Backend API OK (HTTP $BACKEND_STATUS)"
else
    echo "   ❌ Backend API ERROR (HTTP $BACKEND_STATUS)"
fi

# Test Frontend
echo "3️⃣ Test Frontend..."
FRONTEND_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/health)
if [ "$FRONTEND_STATUS" = "200" ]; then
    echo "   ✅ Frontend OK (HTTP $FRONTEND_STATUS)"
else
    echo "   ❌ Frontend ERROR (HTTP $FRONTEND_STATUS)"
fi

echo ""
echo "✅ Tests terminés !"
```

## 🚀 Déploiement complet

### Sur un serveur

```bash
# 1. Se connecter au serveur
ssh user@your-server.com

# 2. Installer Docker et Docker Compose
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER

# 3. Cloner ou créer le répertoire
mkdir -p /opt/kredika
cd /opt/kredika

# 4. Créer les fichiers nécessaires
# - docker-compose.fullstack.yml
# - .env

# 5. Démarrer la stack
docker-compose -f docker-compose.fullstack.yml pull
docker-compose -f docker-compose.fullstack.yml up -d

# 6. Vérifier les logs
docker-compose -f docker-compose.fullstack.yml logs -f
```

## 🛠️ Commandes utiles

```bash
# Voir tous les conteneurs
docker-compose -f docker-compose.fullstack.yml ps

# Redémarrer un service spécifique
docker-compose -f docker-compose.fullstack.yml restart frontend

# Voir les logs d'un service
docker-compose -f docker-compose.fullstack.yml logs -f backend

# Accéder à la base de données
docker exec -it kredika-postgres psql -U postgres -d kredika_db

# Backup de la base de données
docker exec kredika-postgres pg_dump -U postgres kredika_db > backup.sql

# Restaurer une base de données
docker exec -i kredika-postgres psql -U postgres kredika_db < backup.sql
```

## 📊 Monitoring

### docker-compose.monitoring.yml

Ajoutez Prometheus et Grafana pour le monitoring :

```yaml
  prometheus:
    image: prom/prometheus
    container_name: prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - kredika-network

  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
    networks:
      - kredika-network

volumes:
  prometheus_data:
  grafana_data:
```

---

✅ Configuration Full Stack prête pour la production !
