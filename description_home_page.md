# 🧭 Kredika Core — Moteur de Crédit Intégré pour l'Afrique de l'Ouest

## 📖 Présentation

**Kredika Core** est une plateforme SaaS (Software-as-a-Service) qui permet à toute entreprise — marketplace, e-commerce, fintech, ou commerce physique — d'offrir instantanément des solutions de paiement fractionné et de crédit à leurs clients, sans infrastructure technique complexe.

En Afrique de l'Ouest, où l'accès au crédit reste limité et les moyens de paiement fragmentés, Kredika Core agit comme un **pont technologique** entre les commerçants et leurs clients, en démocratisant l'accès au crédit tout en s'intégrant aux moyens de paiement locaux (Wave, Orange Money, Free Money, virements bancaires, espèces).

---

## 🎯 Vision et Objectif

### Vision
Devenir la **référence du crédit intégré en Afrique francophone**, en permettant à chaque entreprise, quelle que soit sa taille, d'offrir à ses clients la possibilité d'acheter maintenant et de payer plus tard.

### Objectif
Simplifier et industrialiser le **"Buy Now, Pay Later" (BNPL)** et le **crédit intégré** en fournissant :
- Une API unique pour gérer l'ensemble du cycle de vie du crédit
- Une intégration rapide (quelques heures) sans expertise financière requise
- Une conformité réglementaire native (BCEAO, RGPD)
- Un système de scoring et de gestion du risque automatisé

---

## 💡 Problématique Résolue

### Défis actuels en Afrique de l'Ouest

1. **Accès limité au crédit** : Moins de 15% de la population a accès au crédit bancaire traditionnel
2. **Fragmentation des moyens de paiement** : Wave, Orange Money, Free Money, banques, espèces
3. **Complexité technique** : Développer un système de crédit nécessite 6-12 mois et une équipe spécialisée
4. **Risque financier** : Difficulté d'évaluer la solvabilité des clients
5. **Conformité réglementaire** : Exigences BCEAO strictes pour les opérations de crédit

### Solution Kredika Core

Kredika Core résout ces défis en offrant :
- **Un moteur de crédit prêt à l'emploi** qui s'intègre en quelques heures
- **Une gestion unifiée des paiements** compatible avec tous les moyens locaux
- **Un système de scoring automatisé** basé sur les comportements de paiement
- **Une conformité réglementaire native** avec audit complet
- **Un modèle économique flexible** (commission par transaction ou abonnement)

---

## 🏗️ Architecture et Composants

### Architecture Technique

```
┌─────────────────────────────────────────────────────────────┐
│                    PARTENAIRES (API)                         │
│  (Jumia, Expresso, Auchan, Boutiques en ligne, etc.)       │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ REST API + Webhooks
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  KREDIKA CORE API                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Authentification & Autorisation (API Keys)            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Gestion des Partenaires & Configuration              │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Moteur de Crédit (Réservations, Échéances)           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Instructions de Paiement Enrichies                    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Traitement des Paiements                              │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Scoring & Gestion du Risque                           │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Audit & Analytics                                     │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Intégrations
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              MOYENS DE PAIEMENT                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Wave   │  │  Orange  │  │   Free   │  │  Banques │   │
│  │          │  │  Money   │  │  Money   │  │          │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Modules Principaux

#### 1. **kredika-core-domain**
Cœur métier contenant toute la logique de gestion du crédit :
- Calcul des échéances et des intérêts
- Algorithmes de scoring
- Règles de validation d'éligibilité
- Gestion du cycle de vie des crédits

#### 2. **kredika-core-api**
Exposition des fonctionnalités via API REST :
- Endpoints CRUD pour les crédits
- Webhooks pour les notifications
- Documentation OpenAPI/Swagger automatique
- Rate limiting et sécurité

#### 3. **kredika-core-common**
Composants partagés :
- Exceptions personnalisées
- Constantes et enums
- Utilitaires de validation
- Mappers et DTOs

#### 4. **kredika-core-sdk** (roadmap)
Librairies d'intégration pour :
- Java/Spring Boot
- Node.js
- Python
- PHP

---

## ⚙️ Fonctionnalités Détaillées

### 🏢 Gestion des Partenaires

**Onboarding simplifié**
- Création de compte partenaire en quelques minutes
- Génération automatique de clés API (publique/privée)
- Configuration des limites de crédit et commissions
- Tableau de bord dédié avec métriques en temps réel

**Configuration flexible**
```json
{
  "maxCreditAmount": 500000,      // Montant max par crédit
  "maxDurationMonths": 12,         // Durée max en mois
  "commissionRate": 2.5,           // Commission en %
  "maxCreditsPerMonth": 1000,      // Limite mensuelle
  "autoApproval": true             // Validation automatique
}
```

**Méthodes de paiement personnalisées**
- Configuration des providers Mobile Money (Wave, Orange Money, Free Money)
- Paramétrage des virements bancaires
- Définition des points de paiement en espèces
- Instructions multilingues (FR, WO, EN)

### 💳 Réservations de Crédit

**Création de crédit en une requête**
```http
POST /v1/credit-reservations
{
  "partnerId": "pk_xxxx",
  "externalOrderRef": "ORDER-001",
  "externalCustomerRef": "CUST-001",
  "purchaseAmount": 150000,
  "installmentCount": 3
}
```

**Calcul automatique**
- Plan d'échéances généré instantanément
- Première échéance à J+30
- Échéances suivantes mensuelles
- Montants arrondis et équilibrés

**Statuts du crédit**
- `RESERVED` : Crédit créé mais pas encore activé
- `ACTIVE` : Premier paiement reçu
- `COMPLETED` : Toutes les échéances payées
- `LATE` : Au moins une échéance en retard
- `DEFAULTED` : Défaut de paiement > 30 jours
- `CANCELLED` : Annulé par le partenaire

### 📅 Gestion des Échéances

**Suivi détaillé**
- État de chaque échéance en temps réel
- Historique complet des tentatives de paiement
- Calcul automatique des jours de retard/avance
- Frais de retard configurables

**Métriques par échéance**
```json
{
  "installmentNumber": 1,
  "amount": 50000,
  "dueDate": "2025-12-22",
  "status": "PENDING",
  "paidAmount": 0,
  "daysLate": 0,
  "paymentAttemptCount": 0,
  "hasLatePayment": false
}
```

### 💰 Instructions de Paiement Enrichies

**Innovation principale de Kredika Core**

Les instructions de paiement ne sont pas de simples références, mais des **guides complets et contextualisés** qui aident réellement le client à payer.

**Contenu d'une instruction**
- Informations sur l'échéance (montant, date limite, numéro)
- **Toutes les options de paiement disponibles** avec détails complets
- Instructions pas-à-pas pour chaque moyen de paiement
- Codes USSD pré-remplis (Wave, Orange Money)
- Informations bancaires (IBAN, SWIFT)
- Localisation des points de paiement en espèces
- Avertissements et rappels personnalisés
- Support multilingue (FR, WO, EN)

**Exemple d'instruction Wave**
```json
{
  "method": "WAVE",
  "displayName": "Wave",
  "recommended": true,
  "merchantPhone": "+221771234567",
  "paymentSteps": [
    "Ouvrez l'application Wave",
    "Appuyez sur Payer",
    "Entrez le numéro: +221771234567",
    "Montant: 50 000 F",
    "Référence: KRD-202411-A1B2C3",
    "Validez avec votre code PIN"
  ],
  "ussdDirect": "#144#50000*MERCHANT*REF#",
  "fees": {
    "amount": 500,
    "description": "Frais Wave (1%)",
    "totalWithFees": 50500
  }
}
```

**Cycle de vie d'une instruction**
1. `GENERATED` : Instruction créée
2. `SENT` : Envoyée au client (SMS/Email/Push)
3. `VIEWED` : Client a consulté l'instruction
4. `USED` : Paiement effectué avec cette instruction
5. `EXPIRED` : Dépassée (validité par défaut : 72h)

### 📊 Traitement des Paiements

**Enregistrement sécurisé**
```http
POST /v1/installments/{id}/payments
{
  "paidAmount": 50000,
  "externalPaymentRef": "WAVE-PAY-12345"
}
```

**Traitement automatisé**
1. Validation du paiement
2. Mise à jour de l'échéance
3. Calcul des métriques de paiement
4. Mise à jour de la réservation parente
5. Notification du partenaire (webhook)
6. Événement de paiement enregistré

**Métriques calculées**
- Taux de remboursement
- Pattern de paiement (early/on-time/late)
- Score de ponctualité
- Historique complet

### 🎯 Scoring et Gestion du Risque

**Scoring automatisé** (roadmap v1.1)
- Score basé sur l'historique de paiement
- Analyse du comportement (early/on-time/late)
- Taux de défaut calculé
- Profil de risque dynamique

**Critères de scoring**
- Ponctualité des paiements précédents
- Montant des crédits antérieurs
- Taux de remboursement
- Ancienneté du client
- Pattern de paiement

**Décision automatique**
```json
{
  "eligible": true,
  "creditScore": 750,
  "riskLevel": "LOW",
  "maxAuthorizedAmount": 500000,
  "recommendedDuration": 6
}
```

### 🔔 Système de Rappels

**Rappels automatisés**
- 3 jours avant l'échéance (optionnel)
- Le jour de l'échéance
- 1 jour après l'échéance
- 3 jours après l'échéance
- 7 jours après l'échéance

**Canaux de notification**
- SMS (Twilio, Termii)
- Email
- Push notification
- WhatsApp Business (roadmap)
- In-app notification

### 📈 Analytics et Reporting

**Dashboard partenaire**
- Volume de crédits par période
- Taux de remboursement
- Taux de défaut
- Performance par produit
- Analyse de cohorte

**Métriques en temps réel**
- Crédits actifs
- Montant total en cours
- Taux de recouvrement
- Revenus générés (commissions)
- Top clients

### 🔐 Audit et Conformité

**Traçabilité complète**
- Chaque action API enregistrée
- Horodatage précis
- Identification du partenaire
- IP source
- Payload complet

**Conformité BCEAO**
- Respect des limites de crédit
- Taux d'intérêt conformes
- Documentation des transactions
- Archivage légal

**Protection des données (RGPD)**
- Aucune donnée d'identité stockée
- Identifiants externes uniquement
- Chiffrement des données sensibles
- Droit à l'oubli respecté

---

## 🔐 Sécurité et Authentification

### Authentification API

**Système dual-key**
```http
X-Partner-Key: pk_6c5c0cba8e854dac    # Clé publique (identifiant)
X-API-Key: sk_live_xxxxxxxxxxxxx      # Clé secrète (authentification)
```

**Sécurité**
- Clés API uniques par partenaire
- Rotation des clés possible
- Expiration configurable
- Révocation instantanée
- Rate limiting par partenaire

**Niveaux d'accès**
- `READ_ONLY` : Consultation uniquement
- `STANDARD` : Opérations courantes
- `ADMIN` : Configuration complète

### Protection des données

**Chiffrement**
- TLS 1.3 pour toutes les communications
- Données sensibles chiffrées au repos
- Clés gérées par AWS KMS / Azure Key Vault

**Isolation**
- Séparation stricte des données par partenaire
- Aucun accès croisé possible
- Audit trail complet

---

## 🌍 Intégration Multi-Canaux

### API REST

**Documentation interactive**
- Swagger UI disponible sur `/swagger-ui`
- Collection Postman complète
- Exemples de code dans 5 langages

**Endpoints principaux**
```
POST   /v1/credit-reservations          # Créer un crédit
GET    /v1/credit-reservations/{id}     # Consulter un crédit
POST   /v1/payment-instructions         # Générer instruction
POST   /v1/installments/{id}/payments   # Enregistrer paiement
GET    /v1/partners/{id}/analytics      # Statistiques
```

### Webhooks

**Notifications temps réel**
```json
{
  "event": "payment.completed",
  "timestamp": "2024-11-22T15:30:00Z",
  "data": {
    "installmentId": "uuid",
    "amount": 50000,
    "status": "PAID"
  }
}
```

**Événements disponibles**
- `credit.created`
- `credit.activated`
- `credit.completed`
- `payment.received`
- `payment.failed`
- `installment.overdue`
- `instruction.viewed`

### SDK (roadmap)

**Installation simple**
```bash
# Java
mvn install com.kredika:kredika-sdk:1.0.0

# Node.js
npm install @kredika/kredika-sdk

# Python
pip install kredika-sdk
```

**Utilisation**
```java
KredikaClient client = new KredikaClient("pk_xxx", "sk_xxx");

CreditReservation credit = client.credits()
    .create(CreditRequest.builder()
        .partnerId("pk_xxx")
        .amount(150000)
        .installments(3)
        .build());
```

---

## 💼 Modèle Économique

### Tarification Flexible

**Option 1 : Commission par transaction**
- 1-3% du montant du crédit
- Pas de frais fixes
- Idéal pour démarrer

**Option 2 : Abonnement mensuel**
- Forfait selon le volume
- Transactions illimitées
- Idéal pour gros volumes

**Option 3 : Hybride**
- Abonnement de base
- + commission réduite par transaction

### Exemples de tarifs

| Volume mensuel | Commission | Abonnement | Coût moyen |
|----------------|------------|------------|------------|
| < 50 crédits   | 2.5%       | 0 F        | 2.5%       |
| 50-500 crédits | 2.0%       | 50 000 F   | ~1.8%      |
| > 500 crédits  | 1.5%       | 200 000 F  | ~1.3%      |

---

## 🚀 Cas d'Usage

### 1. E-commerce (Jumia, Glotelho)
```
Client achète un téléphone à 300 000 F
→ Paie en 6 fois (50 000 F/mois)
→ Première échéance dans 30 jours
→ Paiement via Wave/Orange Money
```

### 2. Retail Physique (Auchan, Exclusive)
```
Client achète un frigo à 450 000 F
→ Paie en 12 fois (37 500 F/mois)
→ Instructions SMS envoyées
→ Paiement en espèces possible
```

### 3. Telecom (Expresso, Free)
```
Client achète un smartphone
→ Paiement en 3 fois
→ Déduction automatique sur facture
→ Intégration système existant
```

### 4. Services (Assurance, Éducation)
```
Paiement de prime d'assurance annuelle
→ Fractionnement en 4 fois
→ Prélèvement automatique
→ Rappels avant échéance
```

---

## 📊 Métriques et KPIs

### Pour les Partenaires

**Performance commerciale**
- Taux de conversion (crédit vs cash)
- Panier moyen augmenté
- Taux de rétention client
- Lifetime value

**Performance financière**
- Volume de crédits accordés
- Taux de remboursement
- Taux de défaut
- Revenus additionnels

### Pour Kredika

**Croissance**
- Nombre de partenaires actifs
- Volume total de crédits
- GMV (Gross Merchandise Value)
- Transactions par mois

**Qualité**
- Taux de remboursement global
- Taux de défaut par segment
- Score moyen des clients
- NPS (Net Promoter Score)

---

## 🛠️ Technologies et Stack

### Backend
- **Java 21** : Langage principal
- **Spring Boot 3.x** : Framework
- **Spring Security** : Authentification/Autorisation
- **Spring Data JPA** : ORM
- **Hibernate** : Persistence

### Base de données
- **PostgreSQL 15** : Base principale
- **Redis** : Cache et sessions
- **Flyway** : Migration de schéma

### Infrastructure
- **Docker** : Conteneurisation
- **Kubernetes** : Orchestration (roadmap)
- **AWS/Azure** : Cloud provider
- **Terraform** : Infrastructure as Code

### Monitoring
- **Prometheus** : Métriques
- **Grafana** : Dashboards
- **ELK Stack** : Logs centralisés
- **Sentry** : Tracking d'erreurs

### CI/CD
- **GitHub Actions** : Pipeline automatisé
- **SonarQube** : Qualité du code
- **Dependabot** : Mises à jour sécurité

---

## 🔄 Roadmap Produit

### Phase 1 : MVP (Q1 2025) ✅
- [x] API de gestion des crédits
- [x] Gestion des échéances
- [x] Instructions de paiement enrichies
- [x] Intégration Mobile Money (Wave, OM, Free)
- [x] Authentification par API Key
- [x] Audit trail basique

### Phase 2 : Enrichissement (Q2 2025)
- [ ] Dashboard partenaire
- [ ] Système de rappels automatisés
- [ ] Webhooks avancés
- [ ] SDK Java et Node.js
- [ ] Scoring automatisé v1
- [ ] Analytics temps réel

### Phase 3 : Scale (Q3 2025)
- [ ] Multi-devises (XOF, EUR, USD)
- [ ] Intégration bancaire directe
- [ ] WhatsApp Business notifications
- [ ] Machine Learning pour scoring
- [ ] API de prédiction de défaut
- [ ] Marketplace de partenaires

### Phase 4 : Enterprise (Q4 2025)
- [ ] Tableau de bord administrateur
- [ ] Facturation automatisée
- [ ] SLA garantis
- [ ] Support dédié
- [ ] Conformité bancaire complète
- [ ] API de recouvrement

---

## 🎓 Documentation

### Ressources disponibles

**Pour les développeurs**
- Guide de démarrage rapide (Quick Start)
- Référence API complète
- Exemples de code
- Collection Postman
- Webhooks et callbacks

**Pour les business**
- Guide d'intégration business
- Cas d'usage détaillés
- Pricing calculator
- ROI estimator
- FAQ

**Vidéos tutoriels**
- Intégration en 10 minutes
- Configuration des méthodes de paiement
- Gestion des rappels
- Lecture des analytics

---

## 👥 Support et Communauté

### Canaux de support

**Support technique**
- Email: dev@kredika.sn
- Slack: kredika-developers
- Documentation: docs.kredika.sn
- Status page: status.kredika.sn

**Support commercial**
- Email: sales@kredika.sn
- Téléphone: +221 33 XXX XX XX
- WhatsApp Business: +221 77 XXX XX XX

**Communauté**
- Forum: community.kredika.sn
- GitHub Discussions
- Newsletter mensuelle
- Webinaires trimestriels

---

## 🏆 Avantages Compétitifs

### Pour les Partenaires

1. **Intégration rapide** : 2-3 jours vs 6-12 mois
2. **Sans risque financier** : Kredika assume le risque de crédit
3. **Pas d'infrastructure** : Tout en cloud, scalable
4. **Local-first** : Adapté au marché africain
5. **Support multilingue** : FR, WO, EN natif

### Pour les Clients Finaux

1. **Accessibilité** : Crédit sans historique bancaire
2. **Transparence** : Pas de frais cachés
3. **Flexibilité** : Choix du moyen de paiement
4. **Simplicité** : Instructions claires étape par étape
5. **Autonomie** : Gestion des paiements en self-service

---

## 📜 Conformité et Certifications

### Réglementations respectées

- **BCEAO** : Conformité bancaire UEMOA
- **RGPD** : Protection des données européenne
- **PCI-DSS** : Sécurité des paiements (roadmap)
- **ISO 27001** : Sécurité de l'information (roadmap)

### Partenariats

- Banque Centrale des États de l'Afrique de l'Ouest
- Association Professionnelle des Systèmes Financiers Décentralisés
- Fintech Association of Senegal

---

## 🌟 Success Stories (projections)

### Jumia Sénégal
*"Avec Kredika Core, nous avons augmenté notre panier moyen de 45% et notre taux de conversion de 23%. L'intégration a pris moins d'une semaine."*

### Glotelho
*"Nos clients peuvent maintenant acheter leurs smartphones en plusieurs fois. Le taux de remboursement dépasse 95% grâce aux rappels automatisés."*

### Exclusive
*"Kredika nous a permis de digitaliser notre offre de crédit magasin en gardant le contrôle total sur nos clients. Le ROI a été atteint en 3 mois."*

---

## 📧 Contact et Informations

### Siège Social
**Kredika Technologies SARL**  
Dakar, Sénégal  
Email: hello@kredika.sn  
Web: www.kredika.sn

### Pour Démarrer
1. Créer un compte : app.kredika.sn/register
2. Obtenir vos clés API
3. Lire la documentation : docs.kredika.sn
4. Intégrer en 2 heures
5. Lancer en production

---

## 📜 Licence

© 2025 Kredika Technologies SARL. Tous droits réservés.

L'utilisation de Kredika Core est soumise à une licence commerciale.  
Les conditions générales sont disponibles sur : www.kredika.sn/terms

Pour toute demande de licence ou partenariat :  
**partnership@kredika.sn**

---

**Kredika Core — Démocratiser l'accès au crédit en Afrique de l'Ouest** 🚀
