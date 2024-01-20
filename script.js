const axios = require("axios");
axios
  .get("www.georisques.gouv.fr/api/v1/gaspar/risques?code_insee=")
  .then((response) => {
    console.log(response.data); // Affichera la réponse du serveur
  })
  .catch(error => {
    console.log(error); // Affichera d'éventuelles erreurs, notamment en cas de problème de connexion Internet.
  });