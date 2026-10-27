# Template NestJS — généré depuis un MCD

Ce projet est un **squelette** consommé par le service de génération de MCD Creator : à chaque génération,
il est copié tel quel dans un dossier temporaire, puis complété avec les ressources (module/controller/
service/entity/DTO) dérivées du MCD de l'utilisateur, avant d'être zippé pour téléchargement.

- Génération **à usage unique** : pas de synchronisation. Si le MCD change plus tard, l'utilisateur
  regénère un projet complet et neuf — la fusion avec un projet déjà personnalisé à la main lui revient.
- N'installe pas `node_modules` ici (le squelette reste versionné sans dépendances).

Pour tester ce squelette manuellement : `npm install` puis `npm run start:dev` (nécessite une base
Postgres, voir `.env.example`).
