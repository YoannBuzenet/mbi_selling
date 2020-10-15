var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO : LOGIN
  // PUIS SURCHARGER AVEC NOTRE DATA
  // GERER LES ERREURS
  const jwt = req.headers.authorization;

  res.json("la réponse surchargée !");
});

module.exports = router;
