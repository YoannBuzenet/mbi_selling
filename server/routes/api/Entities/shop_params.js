var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const {
  checkIfUserIsThisOneOrAdmin,
  checkQueryParams,
} = require("../../../services/securityCheckAPI");

/* Private Route */
router.put("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  checkQueryParams(req, res, ["idShop"]);

  let idShop = req.query.idShop;

  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
    return;
  }

  // Checking every shop_params is in the request
  if (
    req.body.percentPerExcellentFoil === undefined ||
    req.body.percentPerExcellentRegular === undefined ||
    req.body.percentPerGoodFoil === undefined ||
    req.body.percentPerGoodRegular === undefined ||
    req.body.percentPerLangEnglish === undefined ||
    req.body.percentPerLangFrench === undefined ||
    req.body.percentPerLangGerman === undefined ||
    req.body.percentPerLangItalian === undefined ||
    req.body.percentPerLangJapanese === undefined ||
    req.body.percentPerLangKorean === undefined ||
    req.body.percentPerLangPortuguese === undefined ||
    req.body.percentPerLangRussian === undefined ||
    req.body.percentPerLangSimplifiedChinese === undefined ||
    req.body.percentPerLangSpanish === undefined ||
    req.body.percentPerLangTraditionalChinese === undefined ||
    req.body.percentPerLightPlayedFoil === undefined ||
    req.body.percentPerLightPlayedRegular === undefined ||
    req.body.percentPerMintFoil === undefined ||
    req.body.percentPerMintRegular === undefined ||
    req.body.percentPerNearMintFoil === undefined ||
    req.body.percentPerNearMintRegular === undefined ||
    req.body.percentPerPlayedFoil === undefined ||
    req.body.percentPerPlayedRegular === undefined ||
    req.body.percentPerPoorFoil === undefined ||
    req.body.percentPerPoorRegular === undefined ||
    req.body.percentPerSigned === undefined
  ) {
    res.status(406).json("One shop_param is mising in parameters..");
    return;
  }

  // Auth delegation - checking if the account is this shop (or a ROLE_ADMIN)
  const isTheRightUser = await checkIfUserIsThisOneOrAdmin(jwt, idShop);
  if (!isTheRightUser) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  try {
    // enregistrer ces shops params et renvoyer une putain de 200
    // to do de la petite mif des familles qui mif la mif des shtroumpf de la mif
    // yoann
    res.status(200);
  } catch (e) {
    res.status(500).json("Could not update shop params.");
  }

  return;
});

module.exports = router;
