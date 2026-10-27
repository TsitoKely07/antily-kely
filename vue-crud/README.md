# Template Vue CRUD — généré depuis un MCD

Ce projet est un **squelette** consommé par le service de génération de MCD Creator : il est copié
tel quel, puis une page liste + un formulaire (création/édition) sont générés dans `src/pages/`
pour chaque table du MCD de l'utilisateur, avec le routeur (`src/router/index.ts`) et la
navigation (`src/App.vue`) mis à jour en conséquence.

- Génération **à usage unique** : pas de synchronisation. Si le MCD change plus tard, l'utilisateur
  regénère un projet complet et neuf.
- Parle à l'API REST générée par le backend (NestJS) via `src/api/client.ts` — configure
  `VITE_API_URL` dans `.env` (voir `.env.example`) si le backend ne tourne pas sur `localhost:3000`.
- N'installe pas `node_modules` ici (le squelette reste versionné sans dépendances).

Pour tester ce squelette manuellement : `npm install` puis `npm run dev`.
