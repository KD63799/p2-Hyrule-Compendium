# Kokiri — Hyrule Compendium

Encyclopédie de *Breath of the Wild* et *Tears of the Kingdom* construite avec React et
l'[API Hyrule Compendium](https://gadhagod.github.io/Hyrule-Compendium-API) (v3).

## Fonctionnalités

- **Compendium** : créatures, monstres, matériaux, équipements et trésors, avec fiche détaillée
  (lieux, butins cliquables, cœurs rendus, effets de cuisine, attaque/défense, type et effet TOTK,
  puissance de fusion TOTK, badge DLC).
- **BOTW / TOTK** : bascule de jeu dans la barre des catégories (paramètre `game` de l'API).
- **Master Mode** : variantes exclusives affichées sous la liste des monstres (BOTW).
- **Recherche** globale par nom, numéro ou catégorie (requête conservée dans l'URL `?q=`).
- **Tri** par numéro ou par nom, croissant ou décroissant, appliqué à toutes les listes.
- **Favoris** persistés dans le navigateur, ouverts depuis le panneau cœur.
- **Carte d'Hyrule** (Leaflet) avec vues panoramiques (Pannellum) et **régions** de l'API.
- **Ocarina** jouable au clavier ou au doigt, **formulaire** de contact validé avec Formik/Yup.

## Démarrer

Node.js 20.19+ ou 22.12+ requis.

```bash
npm install
npm run dev      # serveur de développement
npm run lint     # ESLint (0 warning toléré)
npm run build    # build de production dans dist/
npm run preview  # sert le build
```

## Architecture

```
src/
├── api/compendium.js      # service API v3 : endpoints, cache mémoire, catégories, tri, favoris
├── hooks/
│   ├── useApi.js          # { data, loading, error, retry } pour une requête du service
│   └── useLocalStorage.js # état persistant (jeu, tri, favoris)
├── composants/
│   ├── EntriesGrid/       # grille de cartes partagée par les listes et la recherche
│   ├── EntryDetail/       # fiche détaillée partagée par les 5 catégories
│   ├── Feedback/          # chargement, erreur réseau, aucun résultat (Makar)
│   ├── Creatures/ Monsters/ Materials/ Equipment/ Treasure/   # listes
│   ├── *Detail/           # fiches (une route par catégorie)
│   ├── AppHeader/ CategorieBar/ overlay/   # en-tête, navigation, recherche, tri, favoris
│   └── Acceuil/ HyruleMap/ Ocarina/ Formulaire/ ComingSoon/
└── App.jsx                # routes et état global (overlay ouvert, jeu, tri, favoris)
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Accueil |
| `/Creatures`, `/Monsters`, `/Materials`, `/Equipment`, `/Treasure` | Listes |
| `/<Catégorie>/:id` | Fiche détaillée |
| `/Monsters/master/:id` | Fiche Master Mode |
| `/Search?q=` | Recherche |
| `/hyrulemap`, `/ocarina`, `/comingsoon` | Pages bonus |
