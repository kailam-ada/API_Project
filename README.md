# API_Project

- **Langages :** Javascript, HTML, CSS
- **Software :** Postman
- **IDE :** VSCode
- Utilisation de l'[API Géorisques](https://api.gouv.fr/documentation/api-georisques) pour ce projet.
- MAJ du 21/01/2024 utilisation de l'[API Géo](https://api.gouv.fr/documentation/api-geo).

Le but de ce projet est de pouvoir récupérer des données via une API et de les visualiser sur un site html.

## Features

- Liste des types de risques recencés sur le territoire concerné.
- MAJ du 21/01/2024: utilisation de l'API Géo afin de convertir un code postal en code INSEE pour une user experience plus simple.
Récupération du nombre d'habitants correspondant au code postal.

## API Géorisques

Base URL: <www.georisques.gouv.fr>

### Récupérer données risques sur une commune

```http
  GET /api/v1/gaspar/risques?code_insee=${codeInsee}
```

| Parameter    | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `code_insee` | `string` | **Required**. Code INSEE de la commune |

Le code INSEE est récupéré dans l'input.

## Déploiement

[Le project est en ligne !](https://kailam-ada.github.io/API_Project/)

## Auteur

Hello ! Je suis Kai ! Apprenant à Ada Tech School une école inclusive et féministe où je fais des projets en groupe.
Je suis actuellement à la recherche d'une **alternance**.

[![GitHub kailam-ada](https://img.shields.io/github/followers/kailam-ada)](https://github.com/kailam-ada)
[![Linkedin: kai-lam](https://img.shields.io/badge/-kailam-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/kai-lam)](https://linkedin.com/in/kai-lam)