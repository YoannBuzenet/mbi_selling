var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

router.get(
  "/",
  async (req, res, next) => {
    securityCheckAPI.checkIsJWTThere(req, res);

    securityCheckAPI.checkQueryParams(req, res, ["idUser", "idScript"]);

    /* ************************** */
    /* *****CHECK RIGHTS******** */
    /* ************************ */

    //Check that the requester is who he sayts he is OR is admin
    const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
      req.headers.authorization,
      req.query.idUser
    );
    console.log(userHasRightToAccess);
    if (!userHasRightToAccess) {
      res.status(401).json("User does not have access do this ressource.");
    }

    /* ************************** */
    /* *********PROCESS********* */
    /* ************************ */

    //Check that there is a script for this user
    const isThereAScriptForThisUser = await db.Script.findOne({
      where: {
        idShop: req.query.idUser,
      },
    });

    if (isThereAScriptForThisUser.length === 0) {
      res.status(401).json("User does not have access do this ressource.");
    }

    next();
  },

  async function (req, res) {
    /* ********************* */
    /* *****PROCESS******** */
    /* ******************* */

    const custom_rules = await db.Custom_Rule.findAll({
      where: {
        idScript: idScript,
      },
    });

    res.json(custom_rules);
  }
);

router.post("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("post a custom rule !");
});

router.put("/:id", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("put a custom rule !");
});

module.exports = router;
