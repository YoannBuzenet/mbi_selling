const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require("axios");
const productLegalitiesModel = require("../../models/productlegalities");
const db = require("../../models/index");
const { config } = require("../../config/config");

//TODO ajout controle  security level ?

function getAllMcmIdAndLegalities(jwt) {
  axios.defaults.headers["Authorization"] = jwt;
  console.log("starting function");

  //for each format
  const format = 2;

  axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/formats/" + format)
    .then((resp) => {
      console.log("before .map");
      // console.log(resp.data);
      // console.log("register first page into DB");
      // console.log("call X fois pour le nombre de page et upsert");
      // console.log("nombre délement", resp.data.legalities);

      resp.data.legalities.map((card) => {
        console.log("go");

        if (card.status === "Legal") {
          db.productLegalities.upsert(
            {
              idProduct: card.cards.mcmid,
              [`isLegal${config.formatDefinition[format]}`]: 1,
              updatedAt: Date.now(),
            },
            {
              fields: [
                `isLegal${config.formatDefinition[format]}`,
                "updatedAt",
              ],
            }
          );
        } else {
          console.log("card not legal");
        }
      });
    })
    .catch((error) => {
      console.log("we're in error");
      console.log("Here is the error", error);
    });
}

module.exports = { getAllMcmIdAndLegalities };
