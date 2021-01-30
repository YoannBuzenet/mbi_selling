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
    await db.shop_params.upsert({
      idShop: idShop,
      percentPerExcellentFoil: req.body.percentPerExcellentFoil,
      percentPerExcellentRegular: req.body.percentPerExcellentRegular,
      percentPerGoodFoil: req.body.percentPerGoodFoil,
      percentPerGoodRegular: req.body.percentPerGoodRegular,
      percentPerLangEnglish: req.body.percentPerLangEnglish,
      percentPerLangFrench: req.body.percentPerLangFrench,
      percentPerLangGerman: req.body.percentPerLangGerman,
      percentPerLangItalian: req.body.percentPerLangItalian,
      percentPerLangJapanese: req.body.percentPerLangJapanese,
      percentPerLangKorean: req.body.percentPerLangKorean,
      percentPerLangPortuguese: req.body.percentPerLangPortuguese,
      percentPerLangRussian: req.body.percentPerLangRussian,
      percentPerLangSimplifiedChinese: req.body.percentPerLangSimplifiedChinese,
      percentPerLangSpanish: req.body.percentPerLangSpanish,
      percentPerLangTraditionalChinese:
        req.body.percentPerLangTraditionalChinese,
      percentPerLightPlayedFoil: req.body.percentPerLightPlayedFoil,
      percentPerLightPlayedRegular: req.body.percentPerLightPlayedRegular,
      percentPerMintFoil: req.body.percentPerMintFoil,
      percentPerMintRegular: req.body.percentPerMintRegular,
      percentPerNearMintFoil: req.body.percentPerNearMintFoil,
      percentPerNearMintRegular: req.body.percentPerNearMintRegular,
      percentPerPlayedFoil: req.body.percentPerPlayedFoil,
      percentPerPlayedRegular: req.body.percentPerPlayedRegular,
      percentPerPoorFoil: req.body.percentPerPoorFoil,
      percentPerPoorRegular: req.body.percentPerPoorRegular,
      percentPerSigned: req.body.percentPerSigned,
    });
    res.status(200).json("Shop params updated");
    return;
  } catch (e) {
    res.status(500).json("Could not update shop params.");
    return;
  }
});

module.exports = router;
