# Guide du projet Antily

## 1. Vue d'ensemble

Le dépôt contient trois éléments :

1. [`nestjs/`](./nestjs/) : une API REST écrite en NestJS et TypeScript, qui accède à PostgreSQL avec TypeORM.
2. [`vue-crud/`](./vue-crud/) : une interface Vue 3 qui appelle cette API pour afficher et gérer les données.
3. [`init.sql`](./init.sql) : un script SQL qui crée les tables, les clés étrangères et des index.

Les README de NestJS et Vue indiquent que ces deux dossiers sont des **squelettes générés par MCD Creator**. Ils suivent donc largement le même patron CRUD pour les différentes entités. La documentation ci-dessous explique ce patron, les fichiers particuliers et les divergences constatées. Elle décrit le code présent, sans supposer qu'il s'agit d'une version prête pour la production.

## 2. Arborescence

### Backend — `nestjs/`

```text
nestjs/
├── .env.example                 # Exemple de paramètres de connexion
├── README.md                    # Explique que ce dossier est un squelette généré
├── package.json                 # Dépendances et commandes npm
├── nest-cli.json                # Configuration de la CLI Nest
├── tsconfig.json                # Options TypeScript
├── tsconfig.build.json          # Options de compilation du projet
├── eslint.config.mjs            # Règles ESLint
├── src/
│   ├── main.ts                  # Démarrage HTTP, CORS et port d'écoute
│   ├── app.module.ts            # Assemblage de l'application et connexion TypeORM
│   ├── app.controller.ts        # Route de test GET /
│   ├── app.service.ts           # Réponse de test « Hello World! »
│   ├── app.controller.spec.ts   # Test unitaire de la route racine
│   ├── entities/                # Répertoire réservé aux entités partagées (actuellement vide)
│   ├── branch/
│   │   ├── branch.controller.ts
│   │   ├── branch.module.ts
│   │   ├── branch.service.ts
│   │   ├── dto/{create,update}-branch.dto.ts
│   │   └── entities/branch.entity.ts
│   ├── member/
│   │   ├── member.controller.ts
│   │   ├── member.module.ts
│   │   ├── member.service.ts
│   │   ├── dto/{create,update}-member.dto.ts
│   │   └── entities/member.entity.ts
│   ├── membership/
│   │   ├── membership.controller.ts
│   │   ├── membership.module.ts
│   │   ├── membership.service.ts
│   │   ├── dto/{create,update}-membership.dto.ts
│   │   └── entities/membership.entity.ts
│   ├── membership-fee/
│   │   ├── membership-fee.controller.ts
│   │   ├── membership-fee.module.ts
│   │   ├── membership-fee.service.ts
│   │   ├── dto/{create,update}-membership-fee.dto.ts
│   │   └── entities/membership-fee.entity.ts
│   ├── membership-payment/
│   │   ├── membership-payment.controller.ts
│   │   ├── membership-payment.module.ts
│   │   ├── membership-payment.service.ts
│   │   ├── dto/{create,update}-membership-payment.dto.ts
│   │   └── entities/membership-payment.entity.ts
│   ├── membership-year/
│   │   ├── membership-year.controller.ts
│   │   ├── membership-year.module.ts
│   │   ├── membership-year.service.ts
│   │   ├── dto/{create,update}-membership-year.dto.ts
│   │   └── entities/membership-year.entity.ts
│   ├── role/
│   │   ├── role.controller.ts
│   │   ├── role.module.ts
│   │   ├── role.service.ts
│   │   ├── dto/{create,update}-role.dto.ts
│   │   └── entities/role.entity.ts
│   ├── territory/
│   │   ├── territory.controller.ts
│   │   ├── territory.module.ts
│   │   ├── territory.service.ts
│   │   ├── dto/{create,update}-territory.dto.ts
│   │   └── entities/territory.entity.ts
│   └── territory-level/
│       ├── territory-level.controller.ts
│       ├── territory-level.module.ts
│       ├── territory-level.service.ts
│       ├── dto/{create,update}-territory-level.dto.ts
│       └── entities/territory-level.entity.ts
└── test/
    ├── app.e2e-spec.ts           # Test HTTP de la route racine
    └── jest-e2e.json             # Configuration Jest pour les tests e2e
```

Dans l'arborescence, `dto/{create,update}-<ressource>.dto.ts` représente deux fichiers distincts : `create-<ressource>.dto.ts` et `update-<ressource>.dto.ts`. Chaque dossier de ressource contient son module, son contrôleur, son service, ces deux DTO et une entité portant le nom de la ressource. Le contenu de `entities/` au niveau de `src/` est réservé ; les entités utilisées sont dans les dossiers propres aux ressources.

### Frontend — `vue-crud/`

```text
vue-crud/
├── .env.example                 # Exemple d'URL pour l'API
├── README.md                    # Explique le rôle du squelette Vue généré
├── package.json                 # Dépendances et commandes npm
├── index.html                   # Page HTML d'entrée de Vite
├── vite.config.ts               # Plugin Vue et configuration Vite
├── tsconfig.json                # Configuration TypeScript racine
├── tsconfig.app.json            # Configuration du code Vue
├── tsconfig.node.json           # Configuration des outils Node/Vite
├── public/
│   └── favicon.svg              # Icône du site
└── src/
    ├── main.ts                  # Création de l'application Vue et montage
    ├── App.vue                  # Point d'entrée visuel, affiche la route active
    ├── App.css                  # Styles des pages et composants CRUD
    ├── index.css                # Styles globaux de base
    ├── api/
    │   └── client.ts            # Client HTTP commun vers l'API
    ├── components/
    │   └── AppLayout.vue        # Menu latéral, barre supérieure et contenu
    ├── router/
    │   └── index.ts             # Correspondance entre URLs et pages
    └── pages/
        ├── Login.vue
        ├── Register.vue
        ├── MemberList.vue
        ├── MemberForm.vue
        ├── MembershipYearList.vue
        ├── MembershipYearForm.vue
        ├── BranchList.vue
        ├── BranchForm.vue
        ├── MembershipFeeList.vue
        ├── MembershipFeeForm.vue
        ├── MembershipPaymentList.vue
        ├── MembershipPaymentForm.vue
        ├── RoleList.vue
        ├── RoleForm.vue
        ├── TerritoryLevelList.vue
        └── TerritoryLevelForm.vue
```

Les pages `*List.vue` présentent généralement une liste avec les actions de modification et suppression. Les pages `*Form.vue` servent à créer ou modifier une ligne et à choisir les références vers d'autres tables. Certaines exceptions et pages manquantes sont détaillées dans la section des problèmes.

## 3. Comment les parties du code travaillent ensemble

### 3.1 Backend NestJS

- [`nestjs/src/main.ts`](./nestjs/src/main.ts) démarre Nest, active CORS et écoute sur `PORT` (3000 par défaut). CORS est actuellement ouvert à toutes les origines.
- [`nestjs/src/app.module.ts`](./nestjs/src/app.module.ts) charge les variables d'environnement, configure PostgreSQL/TypeORM et importe les modules des ressources. La découverte des entités se fait par motif de fichiers. `synchronize` est activé dans tous les environnements autres que `production`.
- [`nestjs/src/app.controller.ts`](./nestjs/src/app.controller.ts) et [`nestjs/src/app.service.ts`](./nestjs/src/app.service.ts) fournissent uniquement la route de test `GET /`, qui répond `Hello World!`.
- Pour chaque ressource, le **module** connecte l'entité à TypeORM (`forFeature`), enregistre le contrôleur et le service, et peut exporter le service.
- Le **contrôleur** déclare les routes HTTP et délègue le travail au service : `POST /<ressource>`, `GET /<ressource>`, `GET /<ressource>/:id`, `PATCH /<ressource>/:id`, `DELETE /<ressource>/:id`.
- Le **service** utilise le dépôt TypeORM pour créer, lire, mettre à jour et supprimer les enregistrements. Les recherches d'un identifiant absent lèvent en général `NotFoundException`. Pour les liens entre tables, certains services convertissent un identifiant reçu en objet relation TypeORM `{ id }`.
- L'**entité** décrit la table, ses colonnes et ses associations. TypeORM s'en sert aussi pour construire les requêtes.
- Les **DTO** décrivent les données attendues en entrée. Les DTO de mise à jour réutilisent le DTO de création en rendant ses propriétés facultatives avec `PartialType`.

Les ressources exposées par l'API sont `branch`, `member`, `membership`, `membership-fee`, `membership-payment`, `membership-year`, `role`, `territory` et `territory-level`.

### 3.2 Frontend Vue

- [`vue-crud/src/main.ts`](./vue-crud/src/main.ts) crée l'application Vue, branche le routeur et monte le tout dans `#app`.
- [`vue-crud/src/App.vue`](./vue-crud/src/App.vue) affiche le composant associé à l'URL courante (`RouterView`).
- [`vue-crud/src/router/index.ts`](./vue-crud/src/router/index.ts) définit les routes, les pages sans barre latérale (connexion/inscription) et les pages rendues à l'intérieur de `AppLayout`.
- [`vue-crud/src/components/AppLayout.vue`](./vue-crud/src/components/AppLayout.vue) fournit le cadre commun de gestion : menu, lien de déconnexion et zone centrale.
- [`vue-crud/src/api/client.ts`](./vue-crud/src/api/client.ts) regroupe les appels `fetch` (liste, lecture, création, modification et suppression). Il prend l'URL de l'API dans `VITE_API_URL` et, à défaut, utilise `http://localhost:3000`.
- `src/pages/*List.vue` et `src/pages/*Form.vue` sont les vues de gestion des tables. Elles utilisent le client HTTP, affichent le chargement/les erreurs et envoient les formulaires à l'API.
- [`vue-crud/src/App.css`](./vue-crud/src/App.css) contient les styles du layout, des boutons, tableaux et formulaires ; [`vue-crud/src/index.css`](./vue-crud/src/index.css) définit les styles globaux.
- [`vue-crud/index.html`](./vue-crud/index.html) est le document HTML chargé par Vite ; [`vue-crud/vite.config.ts`](./vue-crud/vite.config.ts) active le plugin Vue.

### 3.3 Le cas particulier de `MemberForm.vue`

[`vue-crud/src/pages/MemberForm.vue`](./vue-crud/src/pages/MemberForm.vue) illustre la forme générale d'un formulaire :

1. Il lit l'identifiant de la route pour distinguer création et modification.
2. En modification, il charge le membre depuis l'API et préremplit le formulaire.
3. Il envoie les champs du membre à `POST` ou `PATCH`.
4. Sur une fiche existante, il affiche aussi les adhésions associées et permet d'en ajouter ou d'en supprimer.
5. Pour les listes déroulantes, il charge les territoires, cotisations et paiements liés.

La vérification de doublon qu'il effectue porte sur la date de naissance seule ; ce contrôle est donc indicatif et ne démontre pas qu'il s'agit de la même personne. Cette page masque aussi certaines erreurs lors du chargement des adhésions/options et ne capture pas explicitement les erreurs de suppression d'adhésion.

### 3.4 Configuration et tests

- [`nestjs/package.json`](./nestjs/package.json) définit notamment `build`, `start:dev`, `lint`, `test` et `test:e2e`. Les dépendances principales sont NestJS, TypeORM, `pg`, `class-validator` et Jest.
- [`vue-crud/package.json`](./vue-crud/package.json) définit `dev`, `build` et `preview`, avec Vue, Vue Router, Vite et `vue-tsc`.
- [`nestjs/.env.example`](./nestjs/.env.example) indique les paramètres PostgreSQL à fournir au backend. [`vue-crud/.env.example`](./vue-crud/.env.example) montre comment configurer `VITE_API_URL`.
- Les tests présents ne couvrent que la réponse de la route d'accueil : [`nestjs/src/app.controller.spec.ts`](./nestjs/src/app.controller.spec.ts) et [`nestjs/test/app.e2e-spec.ts`](./nestjs/test/app.e2e-spec.ts). Ils ne testent pas encore les opérations CRUD, les relations ni l'accès à une base réelle.
- Les fichiers `.env` sont ignorés par les règles Git des deux projets. Garder les mots de passe et clés réels dans ces fichiers locaux et ne pas les copier dans la documentation ou dans le dépôt.

## 4. Base de données

Le script de référence présent dans [`init.sql`](./init.sql) vise PostgreSQL. Il active `pgcrypto` pour produire les UUID avec `gen_random_uuid()`. Les identifiants sont des clés primaires UUID, sauf que les problèmes côté entité `membership_fee` rendent la représentation TypeORM incohérente (voir plus bas).

### 4.1 Tables et colonnes

| Table | Colonnes métier | Rôle |
|---|---|---|
| `member` | `id`, `name`, `firstname`, `date_of_birth`, `email`, `phone` | Personne inscrite. Tous les champs autres que `id` sont facultatifs dans le SQL. |
| `territory_level` | `id`, `level`, `name` | Niveau ou catégorie territoriale. |
| `territory` | `id`, `name`, `number`, `territory_dependance_id`, `territory_level_id` | Territoire, avec parent éventuel et niveau éventuel. |
| `membership_year` | `id`, `label` | Année ou période d'adhésion. |
| `branch` | `id`, `name` | Branche/section à laquelle un rôle peut être lié. |
| `role` | `id`, `territory_level_id`, `branch_id`, `is_youth`, `label` | Rôle associé éventuellement à un niveau territorial et à une branche. |
| `membership_fee` | `id`, `membership_year_id`, `fee`, `role_id` | Tarif de cotisation pour une période et éventuellement un rôle. `fee` est un `NUMERIC(10,2)`. |
| `membership_payment` | `id`, `date`, `amount`, `status` | Enregistrement de paiement, avec montant et statut numériques. |
| `membership` | `id`, `territory_id`, `member_id`, `role_detail`, `status`, `membership_fee_id`, `membership_payment_id` | Lien entre un membre, un territoire et son adhésion, avec références de tarif et de paiement facultatives. `territory_id` et `status` sont obligatoires. |

À part les colonnes identifiant, seules `membership.territory_id` et `membership.status` sont déclarées obligatoires dans le script SQL. Les autres informations peuvent donc être absentes. Le script ne définit pas de colonnes de création ou de modification automatiques.

### 4.2 Relations définies dans `init.sql`

```text
territory_level 1 ── * territory
territory       1 ── * territory (parent/enfants, relation récursive)
territory       1 ── * membership
member          1 ── * membership
membership_year 1 ── * membership_fee
role            1 ── * membership_fee
branch          1 ── * role
territory_level 1 ── * role
membership_fee  1 ── * membership
membership_payment 1 ── * membership
```

La table `membership` sert donc de lien d'adhésion rattaché à un membre et un territoire. Une même ligne `membership_fee` ou `membership_payment` peut être référencée par plusieurs adhésions dans le schéma actuel.

Les index de `init.sql` couvrent plusieurs clés étrangères pour accélérer les jointures. Ils ne remplacent pas les règles métier comme l'unicité d'un email ou d'un tarif pour une période et un rôle.

## 5. Ce qui pose problème ou mérite une décision

Les éléments ci-dessous sont constatés dans les fichiers actuels ; certains empêchent probablement le démarrage ou l'enregistrement, d'autres sont des risques de conception à valider selon vos règles métier.

### Bloquants ou susceptibles de casser l'exécution

1. **`membership_fee` n'a pas de clé primaire TypeORM cohérente.** Dans [`nestjs/src/membership-fee/entities/membership-fee.entity.ts`](./nestjs/src/membership-fee/entities/membership-fee.entity.ts), `id` est une simple `@Column`, pas un `@PrimaryColumn` ni un `@PrimaryGeneratedColumn`. TypeORM requiert une clé primaire par entité ; les opérations sur ce dépôt risquent d'échouer avec une erreur de métadonnées.
2. **La relation cotisation ↔ niveau territorial est incohérente.** Cette même entité déclare `territoryLevel` avec `@JoinColumn({ name: 'id' })`, c'est-à-dire en utilisant l'identifiant de la cotisation, tandis que `init.sql` ne déclare aucune colonne ni clé étrangère `territory_level_id` dans `membership_fee`. Le DTO ne fournit pas non plus de `territoryLevelId`. La relation inverse est pourtant déclarée dans [`nestjs/src/territory-level/entities/territory-level.entity.ts`](./nestjs/src/territory-level/entities/territory-level.entity.ts).
3. **Les colonnes SQL en snake_case ne sont pas explicitement mappées en TypeORM pour plusieurs propriétés camelCase.** Exemples : `member.date_of_birth` contre `Member.dateOfBirth`, `membership.role_detail` contre `Membership.roleDetail`, `role.is_youth` contre `Role.isYouth`. Les entités ne précisent pas `name: 'date_of_birth'`, `name: 'role_detail'`, etc. Sans stratégie de nommage snake_case personnalisée, l'entité ne cible pas les mêmes noms de colonnes que le script SQL.
4. **Le script SQL et les entités n'ont pas le même contrat.** Les entités déclarent `createdAt` et `updatedAt` via `@CreateDateColumn`/`@UpdateDateColumn`, mais `init.sql` ne crée pas ces colonnes. Les deux champs de montant sont aussi décrits en TypeORM avec `precision: 255`, tandis que SQL définit `NUMERIC(10,2)`. Il faut choisir une source de vérité et faire évoluer le schéma via des migrations contrôlées.
5. **Les identifiants de relation sont en lecture seule comme colonnes simples.** Plusieurs entités marquent les colonnes de clés étrangères `insert: false, update: false`. Les services `membership`, `role` et `territory` tentent de contourner cela en affectant les objets de relation, mais le mécanisme est fragile et doit être testé avec les opérations réellement utilisées. Le service `membership-fee` affecte en plus la relation mal définie ci-dessus.

### Fonctionnalités et cohérence de l'interface

6. **Deux liens du menu ne pointent vers aucune page déclarée.** [`vue-crud/src/components/AppLayout.vue`](./vue-crud/src/components/AppLayout.vue) contient les liens `/membership` et `/territory`, mais [`vue-crud/src/router/index.ts`](./vue-crud/src/router/index.ts) ne déclare aucune route pour ces chemins et il n'existe pas de pages `Membership*` ou `Territory*`. Les routes API correspondantes existent côté backend ; les liens frontend ne peuvent donc pas offrir ces écrans.
7. **La connexion et l'inscription sont des maquettes, pas une authentification.** [`vue-crud/src/pages/Login.vue`](./vue-crud/src/pages/Login.vue) redirige vers les membres sans vérifier les identifiants ; [`vue-crud/src/pages/Register.vue`](./vue-crud/src/pages/Register.vue) redirige vers la connexion sans créer de compte. Le backend ne déclare pas de mécanisme d'authentification ni de garde d'accès. De plus, le lien « Déconnexion » du layout ne termine aucune session.
8. **La détection de doublon dans la fiche membre est trompeuse.** `MemberForm.vue` compare uniquement les dates de naissance, qui ne sont pas uniques, et charge toute la liste des membres pour le faire. Des personnes différentes nées le même jour déclenchent donc un avertissement ; ce contrôle côté navigateur ne remplace pas une règle d'unicité validée côté serveur.
9. **Certaines erreurs sont silencieuses ou non présentées.** Dans `MemberForm.vue`, plusieurs chargements de listes associées utilisent `.catch(() => {})`; la suppression d'une adhésion n'a pas de gestion d'erreur locale. Cela rend les échecs difficiles à comprendre pour l'utilisateur.

### Validation, données et exploitation

10. **Les décorateurs de validation des DTO ne sont pas activés globalement.** `main.ts` ne configure pas de `ValidationPipe`. Les annotations `class-validator` n'assurent donc pas à elles seules la validation des corps HTTP. Une configuration de validation (avec transformation et rejet des champs inconnus si approprié) doit être décidée et testée.
11. **Plusieurs types de statut sont des nombres sans signification explicite.** `membership.status` et `membership_payment.status` sont des entiers, sans enum, contrainte SQL ni documentation de valeurs autorisées. Le sens des valeurs n'est pas garanti et l'interface peut laisser saisir n'importe quel nombre.
12. **Les règles d'unicité et de cohérence métier sont absentes du SQL.** Par exemple, `member.email` n'est pas unique ; `membership_year.label`, `territory_level.level` ou le couple rôle/année d'un tarif ne sont pas contraints. Ce n'est pas forcément incorrect, mais il faut le décider selon les règles de gestion voulues.
13. **Les suppressions en cascade peuvent effacer beaucoup de données.** Plusieurs clés étrangères de `init.sql` utilisent `ON DELETE CASCADE`. Supprimer un territoire ou un membre peut ainsi supprimer les adhésions correspondantes ; supprimer un rôle ou une période peut supprimer des tarifs, puis les adhésions liées à ces tarifs. Ce choix mérite d'être validé, notamment pour l'historique financier.
14. **La synchronisation automatique du schéma est risquée.** `app.module.ts` utilise `synchronize: true` dès que `NODE_ENV` n'est pas exactement `production`. Une valeur d'environnement mal renseignée peut activer des modifications automatiques en dehors du développement. Pour une base conservant des données, préférer des migrations versionnées et tester la configuration avec le véritable schéma.
15. **CORS est ouvert sans restriction.** `app.enableCors()` autorise les appels depuis n'importe quelle origine. C'est pratique en développement local, mais l'origine devrait être restreinte avant déploiement.
16. **Les listes de données sont chargées sans pagination.** Les services font des `repository.find()` et les pages demandent les listes complètes. Avec un volume croissant, cela peut ralentir la base, l'API et le navigateur.
17. **La couverture de test est trop limitée pour les risques identifiés.** Les tests actuels ne vérifient ni les ressources CRUD, ni les relations, ni les validations, ni la connexion TypeORM à un schéma créé par `init.sql`.

## 6. Ordre conseillé pour fiabiliser le projet

1. Corriger la clé primaire et les relations TypeORM de `membership_fee`, puis vérifier que les entités peuvent toutes être chargées par TypeORM.
2. Décider si `init.sql` ou les entités sont la source de vérité ; harmoniser noms snake_case, timestamps, types numériques et clés étrangères. Ajouter des migrations versionnées.
3. Ajouter des tests d'intégration pour créer/lire/modifier/supprimer une adhésion et ses références, ainsi que pour les tarifs.
4. Activer et tester la validation des DTO côté NestJS ; définir les valeurs autorisées pour chaque statut.
5. Définir les règles de suppression et de conservation de l'historique, puis vérifier les `ON DELETE CASCADE`.
6. Ajouter les écrans/routes `membership` et `territory`, ou retirer les liens qui ne doivent pas être proposés.
7. Remplacer les pages d'authentification fictives par une authentification réelle avant d'exposer l'API ; restreindre CORS et protéger les routes.
8. Lorsque les tables grossissent, ajouter pagination, filtres et index fondés sur les requêtes réellement utilisées.

## 7. Conclusion

La structure générale est facile à suivre et le patron NestJS CRUD / Vue CRUD est cohérent pour un prototype généré. Les difficultés principales ne viennent pas du découpage des dossiers, mais de la synchronisation entre le modèle SQL et TypeORM, de l'entité `membership_fee`, de l'absence de validation globale, et du fait que les écrans d'authentification et certaines entrées de navigation ne sont pas fonctionnels. Il est préférable de traiter ces points avant de mettre l'application en production ou d'y conserver des données importantes.
