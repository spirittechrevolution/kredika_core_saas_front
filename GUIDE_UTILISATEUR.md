# 📚 Guide Utilisateur Kredika Core Frontend

> Documentation complète pour les partenaires et administrateurs

## 📖 Table des Matières

- [Introduction](#introduction)
- [Premiers Pas](#premiers-pas)
- [Authentification](#authentification)
- [Gestion des Partenaires](#gestion-des-partenaires)
- [Réservations de Crédit](#réservations-de-crédit)
- [Échéances et Paiements](#échéances-et-paiements)
- [Instructions de Paiement](#instructions-de-paiement)
- [Analytics et Rapports](#analytics-et-rapports)
- [Configuration](#configuration)
- [FAQ](#faq)
- [Support](#support)

---

## 🎯 Introduction

Bienvenue dans le **Dashboard Kredika Core** ! Cette plateforme vous permet de gérer l'ensemble de votre activité de crédit : créer des réservations, suivre les paiements, générer des instructions enrichies et analyser vos performances.

### Qui peut utiliser cette plateforme ?

#### 👥 Partenaires
- E-commerces
- Marketplaces
- Boutiques physiques
- Fintechs
- Tout business offrant du crédit à ses clients

#### 🔧 Administrateurs Kredika
- Super Admin
- Admin
- Opérations
- Finance
- Support
- Auditeur

---

## 🚀 Premiers Pas

### 1. Accéder à la Plateforme

🌐 **URL** : https://app.kredika.sn

### 2. Connexion

#### Pour les Partenaires

```
1. Cliquez sur "Connexion Partenaire"
2. Entrez votre Client ID (pk_xxxxx)
3. Entrez votre Client Secret (sk_live_xxxxx)
4. Cliquez sur "Se connecter"
```

> ⚠️ **Important** : Conservez votre Client Secret en lieu sûr. Ne le partagez jamais !

#### Pour les Administrateurs

```
1. Cliquez sur "Connexion Admin"
2. Entrez votre nom d'utilisateur
3. Entrez votre mot de passe
4. Cliquez sur "Se connecter"
```

### 3. Navigation

Le menu principal contient les sections suivantes :

| Section | Description | Icône |
|---------|-------------|-------|
| **Dashboard** | Vue d'ensemble de vos activités | 📊 |
| **Réservations** | Gestion des crédits | 💳 |
| **Échéances** | Suivi des paiements | 📅 |
| **Instructions** | Instructions de paiement | 💰 |
| **Partenaires** | Gestion des partenaires (admin) | 👥 |
| **Analytics** | Analyses et rapports | 📈 |
| **Configuration** | Paramètres | ⚙️ |

---

## 🔐 Authentification

### Token d'Accès

Après connexion, vous recevez :

- **Access Token** : Valable 24h (partenaires) ou 8h (admins)
- **Refresh Token** : Permet de renouveler l'accès automatiquement

> ℹ️ Le système rafraîchit automatiquement votre token avant expiration.

### Sécurité

✅ **Bonnes pratiques** :
- Déconnectez-vous toujours après utilisation
- Ne partagez jamais vos identifiants
- Changez votre mot de passe régulièrement (admins)
- Régénérez votre API Key en cas de compromission (partenaires)

### Déconnexion

```
1. Cliquez sur votre nom en haut à droite
2. Sélectionnez "Déconnexion"
3. Confirmez
```

---

## 👥 Gestion des Partenaires

### Créer un Nouveau Partenaire

**Qui peut** : Tout utilisateur (pour s'inscrire) ou Admins

```
1. Allez dans "Partenaires" → "Nouveau partenaire"
2. Remplissez le formulaire :
   - Nom de l'entreprise *
   - Email de contact *
   - Téléphone
   - Type d'activité *
   - Adresse
   - Numéro d'enregistrement

3. Configurez les limites de crédit :
   - Montant maximum de crédit
   - Durée maximum (en mois)
   - Taux de commission (%)

4. Cliquez sur "Créer le partenaire"

5. ⚠️ IMPORTANT : Sauvegardez vos identifiants :
   - Client ID (pk_xxxxx)
   - Client Secret (sk_live_xxxxx)
```

> 🔒 Le Client Secret ne sera affiché qu'une seule fois !

### Configurer les Méthodes de Paiement

**Étape cruciale** pour générer des instructions de paiement.

#### Mobile Money

```
1. Allez dans "Configuration" → "Méthodes de paiement"
2. Activez les providers souhaités :
   
   📱 Wave
   - Activé : ☑️
   - Numéro marchand : +221 77 123 45 67
   - Code USSD : #144#
   - Frais : 1% (min 100 FCFA, max 5000 FCFA)
   
   🍊 Orange Money
   - Activé : ☑️
   - Numéro marchand : +221 77 123 45 67
   - Code USSD : #144#
   
   🟢 Free Money
   - Activé : ☑️
   - Numéro marchand : +221 78 123 45 67
   - Code USSD : #555#

3. Cliquez sur "Enregistrer"
```

#### Virement Bancaire

```
1. Activez le virement bancaire
2. Remplissez les informations :
   - Nom du compte : KREDIKA TECHNOLOGIES
   - Banque : CBAO
   - Numéro de compte : 12345678901
   - IBAN : SN08 SN01 0123 4567 8901 2345 67
   - Code SWIFT : CBAOSNDA
   
3. Sauvegardez
```

#### Paiement en Espèces

```
1. Activez le paiement cash
2. Ajoutez des points de collecte :
   
   Point 1 :
   - Nom : Boutique Sandaga
   - Adresse : Marché Sandaga, Dakar
   - Horaires : Lun-Sam 8h-19h
   - Latitude : 14.6937
   - Longitude : -17.4441
   
3. Sauvegardez
```

### Aperçu des Instructions

Avant d'activer, testez vos configurations :

```
1. Cliquez sur "Prévisualiser"
2. Sélectionnez :
   - Langue : Français / Wolof / Anglais
   - Montant : 50 000 FCFA (exemple)
   
3. Visualisez l'instruction générée
4. Si satisfait, activez les méthodes
```

---

## 💳 Réservations de Crédit

### Créer une Réservation

```
1. Allez dans "Réservations" → "Nouvelle réservation"

2. Remplissez le formulaire :
   
   Informations Client :
   - Référence client externe * : CUSTOMER-123
   
   Informations Commande :
   - Référence commande externe * : ORDER-001
   - Montant de l'achat * : 150 000 FCFA
   - Nombre d'échéances * : 3
   
   Notes (optionnel) :
   - Client fidèle, bon historique

3. Cliquez sur "Créer la réservation"

4. ✅ La réservation est créée avec :
   - ID unique : uuid
   - Statut : RESERVED
   - 3 échéances calculées automatiquement
   - Plan de paiement généré
```

**Résultat attendu :**

```json
{
  "creditReservationId": "uuid",
  "status": "RESERVED",
  "purchaseAmount": 150000,
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
```

### Statuts des Réservations

| Statut | Description | Badge | Actions possibles |
|--------|-------------|-------|-------------------|
| **RESERVED** | Crédit réservé | 🟡 Jaune | Activer, Annuler |
| **ACTIVE** | Crédit en cours | 🟢 Vert | Voir échéances, Annuler |
| **COMPLETED** | Entièrement payé | ✅ Vert | Voir historique |
| **DEFAULTED** | Défaut de paiement | 🔴 Rouge | Relancer, Contentieux |
| **CANCELLED** | Annulée | ⚫ Gris | Archiver |

### Filtrer les Réservations

```
1. Utilisez les filtres en haut de page :
   - Statut : Toutes / Actives / Complétées / etc.
   - Date : Aujourd'hui / Cette semaine / Ce mois
   - Montant : Min - Max

2. Tri par :
   - Date de création (↓ Plus récent)
   - Montant (↑ Plus petit)
   - Statut
   - Client

3. Recherche textuelle :
   - Par référence externe
   - Par ID
```

### Voir les Détails

```
1. Cliquez sur une réservation dans la liste
2. Consultez les informations complètes :
   
   📋 Informations Générales
   - ID, Statut, Montant
   - Dates (création, échéance, complétion)
   - Références externes
   
   📅 Échéances
   - Liste complète des paiements
   - Statuts individuels
   - Historique de paiement
   
   📊 Métriques
   - Taux de remboursement
   - Retards moyens
   - Pattern de paiement (early/on-time/late)
   
   📝 Audit Trail
   - Tous les événements
   - Dates et acteurs
```

### Annuler une Réservation

```
1. Ouvrez la réservation
2. Cliquez sur "Annuler"
3. Confirmez l'annulation
4. Indiquez la raison (optionnel)

⚠️ Seules les réservations RESERVED ou ACTIVE peuvent être annulées
```

---

## 📅 Échéances et Paiements

### Consulter les Échéances

```
1. Allez dans "Échéances"
2. Visualisez la liste complète :
   
   Colonnes :
   - Numéro : 1/3, 2/3, 3/3
   - Montant : 50 000 FCFA
   - Date d'échéance : 22/12/2025
   - Statut : PENDING / PAID / LATE
   - Client : Référence externe
   - Actions : Payer / Détails / Rappel
```

### Filtres Rapides

| Filtre | Description |
|--------|-------------|
| **À venir** | Échéances des 7 prochains jours |
| **En retard** | Date dépassée, non payées |
| **Payées** | Statut PAID |
| **Toutes** | Sans filtre |

### Enregistrer un Paiement

```
1. Cliquez sur "Payer" sur une échéance
2. Remplissez le formulaire :
   
   Informations de Paiement :
   - Montant payé * : 50 000 FCFA
   - Référence externe * : PAY_ORANGE_001
   - Méthode : Wave / Orange / Bank / Cash
   - Date de paiement : Auto (aujourd'hui)
   - Notes : Client a payé en avance

3. Cliquez sur "Valider le paiement"

4. ✅ Mise à jour automatique :
   - Statut échéance → PAID
   - Métriques recalculées
   - Réservation mise à jour si dernière échéance
```

### Paiements Partiels

```
Si le client paie moins que le montant dû :

1. Entrez le montant réel payé (ex: 30 000 au lieu de 50 000)
2. Validez
3. Statut devient : PARTIALLY_PAID
4. Montant restant dû : 20 000 FCFA
```

### Envoyer un Rappel

```
1. Cliquez sur "Rappel" pour une échéance
2. Choisissez le canal :
   - 📱 SMS
   - 📧 Email
   - 💬 WhatsApp
   
3. Sélectionnez le type :
   - Rappel standard (3 jours avant)
   - Rappel urgent (1 jour avant)
   - Rappel de retard
   
4. Prévisualisez le message
5. Envoyez

✅ Le rappel est envoyé et tracké
```

---

## 💰 Instructions de Paiement

### Générer une Instruction

**Fonctionnalité phare de Kredika Core** : instructions enrichies multilingues et multi-canaux.

```
1. Ouvrez une échéance
2. Cliquez sur "Générer instruction"
3. Configurez :
   
   Paramètres :
   - Langue * : Français / Wolof / Anglais
   - Type : Standard / Rappel 3j / Rappel 1j / Urgent / Retard
   - Canal : SMS / Email / WhatsApp / Web
   - Validité : 48h (par défaut)

4. Cliquez sur "Générer"

5. ✅ Instruction créée avec :
   - Référence unique : KRD-202411-ABC123
   - Contenu enrichi avec toutes les méthodes de paiement
   - Instructions détaillées en français/wolof/anglais
   - Codes USSD pré-remplis
   - Coordonnées bancaires
   - Points de paiement cash
```

### Exemple d'Instruction Générée

#### En Français

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 PAIEMENT KREDIKA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Montant à payer : 50 000 FCFA
Date d'échéance : 22/12/2025
Référence : KRD-202411-ABC123

─────────────────────────────────
📱 WAVE (RECOMMANDÉ)
─────────────────────────────────
1. Ouvrez l'application Wave
2. Appuyez sur "Payer"
3. Entrez le numéro : +221 77 123 45 67
4. Montant : 50 000 F
5. Référence : KRD-202411-ABC123
6. Validez avec votre code PIN

⚡ RACCOURCI USSD :
#144#50000*771234567*KRD-202411-ABC123#

Frais : 500 F (1%)
Total à payer : 50 500 F

─────────────────────────────────
🍊 ORANGE MONEY
─────────────────────────────────
1. Composez #144#
2. Choisissez "Transfert"
3. Entrez : 771234567
4. Montant : 50000
5. Validez

⚡ RACCOURCI :
#144*1*1*771234567*50000#

─────────────────────────────────
🏦 VIREMENT BANCAIRE
─────────────────────────────────
Bénéficiaire : KREDIKA TECHNOLOGIES
Banque : CBAO
IBAN : SN08 SN01 0123 4567 8901 2345 67
Motif : KRD-202411-ABC123

─────────────────────────────────
💵 PAIEMENT EN ESPÈCES
─────────────────────────────────
Point de collecte :
📍 Boutique Sandaga
   Marché Sandaga, Dakar
   Lun-Sam : 8h-19h

Instructions :
1. Rendez-vous au point de paiement
2. Dites : "Je veux payer Kredika"
3. Donnez la référence : KRD-202411-ABC123
4. Payez : 50 000 F
5. Gardez le reçu

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❓ Besoin d'aide ?
📧 support@kredika.sn
📱 +221 77 XXX XX XX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### En Wolof

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💳 FAYLU KREDIKA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Xaalis bu war a def : 50 000 FCFA
Bësu fay : 22/12/2025
Reference : KRD-202411-ABC123

─────────────────────────────────
📱 WAVE
─────────────────────────────────
1. Ubbi application Wave bi
2. Bët "Yëf"
3. Dugal nimero yi : +221 77 123 45 67
4. Xaalis : 50 000 F
5. Reference : KRD-202411-ABC123
6. Saytu ak code PIN

⚡ USSD :
#144#50000*771234567*KRD-202411-ABC123#

...
```

### Envoyer l'Instruction

```
1. Après génération, cliquez sur "Envoyer"
2. Choisissez le canal :
   - 📱 SMS : Envoi instantané au +221 7X XXX XX XX
   - 📧 Email : Envoi à client@email.com
   - 💬 WhatsApp : Envoi via WhatsApp Business
   
3. Confirmez
4. ✅ Statut passe à "SENT"
```

### Tracker l'Engagement

```
Métriques disponibles :
- ✅ Instruction générée : timestamp
- 📤 Instruction envoyée : timestamp + canal
- 👁️ Instruction vue : timestamp + délai
- 💰 Instruction utilisée : timestamp (si paiement effectué)
```

### Régénérer une Instruction

```
Si l'instruction a expiré (> 48h) :

1. Cliquez sur "Régénérer"
2. Nouvelle instruction créée avec :
   - Nouvelle référence
   - Nouvelle date d'expiration
   - Même contenu enrichi
   
3. Renvoyez au client
```

---

## 📊 Analytics et Rapports

### Dashboard Principal

```
Accédez au dashboard pour voir :

📈 KPIs Clés
- Total réservations : 243
- Réservations actives : 87
- Volume total : 125 M FCFA
- Taux de remboursement : 94.2%
- Taux de défaut : 3.7%

📊 Graphiques
- Évolution dans le temps (7 derniers jours)
- Performance par méthode de paiement
- Répartition par statut
- Top clients

🔝 Métriques de Performance
- Délai moyen de paiement : 2.3 jours
- Paiements en avance : 23%
- Paiements à temps : 68%
- Paiements en retard : 9%
```

### Filtres de Période

| Période | Description |
|---------|-------------|
| **Aujourd'hui** | Données du jour |
| **Cette semaine** | Lun-Dim en cours |
| **Ce mois** | 1er-dernier jour du mois |
| **Cette année** | Jan-Déc |
| **Personnalisé** | Sélection de dates |

### Exporter les Données

```
1. Cliquez sur "Exporter"
2. Choisissez le format :
   
   📗 Excel (.xlsx)
   - Toutes les données
   - Graphiques inclus
   - Mise en forme automatique
   
   📄 PDF
   - Rapport formaté
   - Graphiques haute résolution
   - Prêt à imprimer
   
   📊 CSV
   - Données brutes
   - Facile à traiter
   
3. Téléchargez le fichier
```

---

## ⚙️ Configuration

### Profil Partenaire

```
1. Allez dans "Paramètres" → "Profil"
2. Modifiez vos informations :
   - Nom de l'entreprise
   - Email de contact
   - Téléphone
   - Adresse
   - Logo (upload)
   
3. Sauvegardez
```

### Limites de Crédit

```
Consultez vos limites actuelles :

💰 Limite de Crédit
- Montant maximum : 10 M FCFA
- Utilisé : 6.2 M FCFA (62%)
- Disponible : 3.8 M FCFA
- Durée max : 12 mois
- Taux de commission : 5%
```

### Régénérer l'API Key

```
⚠️ ATTENTION : Cette action révoque l'ancienne clé !

1. Allez dans "Paramètres" → "Sécurité"
2. Cliquez sur "Régénérer API Key"
3. Confirmez (ancien secret invalidé immédiatement)
4. 🔑 Nouvelle clé générée :
   - Client ID : pk_xxxxx (inchangé)
   - Client Secret : sk_live_NOUVELLE_CLE
   
5. ⚠️ Copiez et sauvegardez immédiatement !
6. Mettez à jour vos intégrations API
```

### Notifications

```
Configurez vos préférences :

📧 Email
- ☑️ Nouvelle réservation créée
- ☑️ Paiement reçu
- ☑️ Échéance en retard (J+3)
- ☑️ Rapport hebdomadaire

📱 SMS
- ☐ Nouvelle réservation
- ☑️ Paiement reçu
- ☑️ Alerte défaut de paiement

🔔 Push (dans l'app)
- ☑️ Toutes les notifications
```

---

## ❓ FAQ

### Questions Générales

**Q : Combien coûte Kredika Core ?**  
R : Consultez notre grille tarifaire sur [kredika.sn/pricing](https://kredika.sn/pricing).

**Q : Puis-je tester gratuitement ?**  
R : Oui ! Contactez sales@kredika.sn pour un compte de démo.

**Q : Kredika gère-t-il l'argent ?**  
R : Non. Kredika fournit uniquement l'infrastructure technique. Vous gérez votre propre argent et risque.

### Réservations

**Q : Quelle est la durée maximum d'un crédit ?**  
R : Cela dépend de votre configuration. Par défaut : 1-12 mois.

**Q : Puis-je modifier une réservation après création ?**  
R : Non. Vous pouvez uniquement annuler et recréer.

**Q : Comment calculer les échéances ?**  
R : Montant total / Nombre d'échéances. Paiements mensuels égaux.

### Paiements

**Q : Le client peut-il payer en avance ?**  
R : Oui ! Le système détecte automatiquement les paiements anticipés.

**Q : Que se passe-t-il en cas de retard ?**  
R : Le statut devient LATE. Vous pouvez envoyer des rappels.

**Q : Puis-je accepter des paiements partiels ?**  
R : Oui. Le système track le montant restant dû.

### Instructions de Paiement

**Q : Combien de temps une instruction est-elle valide ?**  
R : Par défaut 48h. Personnalisable entre 1h et 7 jours.

**Q : Puis-je personnaliser les instructions ?**  
R : Oui, via la configuration des méthodes de paiement.

**Q : Les instructions sont-elles multilingues ?**  
R : Oui : Français, Wolof, Anglais (+ autres sur demande).

---

## 🆘 Support

### Documentation

- 📘 [API Documentation](https://docs.kredika.sn/api)
- 🚀 [Guide d'Intégration](https://docs.kredika.sn/integration)
- 💼 [Guide Business](https://docs.kredika.sn/business)
- 🎥 [Tutoriels Vidéo](https://youtube.com/kredika)

### Contact

**Support Technique**
- 📧 Email : dev@kredika.sn
- 💬 Slack : [kredika-developers.slack.com](https://kredika-developers.slack.com)
- 📞 Téléphone : +221 33 XXX XX XX (Lun-Ven 9h-18h)

**Support Commercial**
- 📧 Email : sales@kredika.sn
- 📱 WhatsApp : +221 77 XXX XX XX

**Urgences**
- 🚨 Hotline 24/7 : +221 77 XXX XX XX
- ⚠️ Uniquement pour problèmes critiques

### Horaires

- Support standard : Lun-Ven 9h-18h GMT
- Hotline urgence : 24/7
- Temps de réponse :
  - Email : < 4h ouvrées
  - Slack : < 1h ouvrée
  - Téléphone : Immédiat

---

## 📝 Glossaire

| Terme | Définition |
|-------|------------|
| **Réservation** | Crédit accordé à un client |
| **Échéance** | Paiement mensuel d'un crédit |
| **Instruction de paiement** | Document enrichi expliquant comment payer |
| **Partner Key** | Identifiant unique du partenaire (pk_xxxxx) |
| **API Key** | Clé secrète pour l'authentification (sk_live_xxxxx) |
| **BNPL** | Buy Now Pay Later (Acheter maintenant, payer plus tard) |
| **CaaS** | Credit-as-a-Service (Crédit en tant que service) |
| **USSD** | Code court pour paiement mobile (*144#) |
| **RBAC** | Role-Based Access Control (Contrôle d'accès par rôle) |

---

## 📄 Annexes

### Statuts des Réservations

| Code | Label | Couleur | Description |
|------|-------|---------|-------------|
| `RESERVED` | Réservée | Jaune | Crédit réservé, en attente |
| `ACTIVE` | Active | Vert | Remboursement en cours |
| `COMPLETED` | Complétée | Vert | Entièrement payée |
| `DEFAULTED` | Défaut | Rouge | > 30 jours de retard |
| `CANCELLED` | Annulée | Gris | Annulation manuelle |

### Statuts des Échéances

| Code | Label | Couleur | Description |
|------|-------|---------|-------------|
| `PENDING` | En attente | Jaune | Non encore payée |
| `PAID` | Payée | Vert | Payée intégralement |
| `PARTIALLY_PAID` | Partielle | Orange | Partiellement payée |
| `LATE` | En retard | Rouge | Date dépassée |
| `CANCELLED` | Annulée | Gris | Échéance annulée |

### Types d'Instructions

| Type | Code | Utilisation |
|------|------|-------------|
| Standard | `STANDARD` | Instruction normale |
| Rappel 3j | `REMINDER_3_DAYS` | 3 jours avant échéance |
| Rappel 1j | `REMINDER_1_DAY` | 1 jour avant échéance |
| Urgent | `URGENT` | Échéance très proche |
| Retard | `OVERDUE` | Paiement en retard |

---

<div align="center">

**Kredika Core — Démocratiser l'accès au crédit en Afrique de l'Ouest** 🌍

Made with ❤️ in Dakar, Senegal

[Website](https://kredika.sn) • [Docs](https://docs.kredika.sn) • [Dashboard](https://app.kredika.sn) • [Support](mailto:support@kredika.sn)

</div>
