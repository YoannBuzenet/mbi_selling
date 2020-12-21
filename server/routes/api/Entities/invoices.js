var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const {
  checkIfUserIsThisOneOrAdmin,
  checkQueryParams,
} = require("../../../services/securityCheckAPI");

/* Private Route */
router.get("/getForShop", async (req, res) => {
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

  // Auth delegation - checking if the account is this shop (or a ROLE_ADMIN)
  const isTheRightUser = await checkIfUserIsThisOneOrAdmin(jwt, idShop);
  if (!isTheRightUser) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  // Get all invoices for one shop
  const shopInvoices = await db.Invoice.getAllInvoicesForOneShop(idShop);

  res.status(200).json(shopInvoices);
});

module.exports = router;
