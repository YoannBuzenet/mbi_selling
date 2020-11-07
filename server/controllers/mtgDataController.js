const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require("axios");
const db = require("../../models/index");
const { config } = require("../../config/configApp");

//Getting all formats from API
async function getAllFormatDefinition(jwt) {
  axios.defaults.headers["Authorization"] = jwt;
  await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/formats")
    .then(async (resp) => {
      console.log("getting all formats");
      //On each formats we are going to ask all the cards

      for (let i = 1; i <= resp.data["hydra:totalItems"]; i++) {
        console.log("iteration AVANT FUNCTION", i);
        let dataToClear = await getAllMcmIdAndLegalitiesFromOneFormat(jwt, i);
        console.log("iteration APRES FUNCTION", i);
        dataToClear = null;
      }
    });
}

//Function is async to ask one set after another
async function getAllMcmIdAndLegalitiesFromOneFormat(jwt, idFormat) {
  axios.defaults.headers["Authorization"] = jwt;
  console.log("starting function");

  return await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/formats/" + idFormat)
    .then(async (resp) => {
      console.log("did request one format - before for loop on result");

      for (let i = 0; i < resp.data.legalities.length; i++) {
        console.log("go");

        if (
          resp.data.legalities[i].status === "Legal" &&
          typeof resp.data.legalities[i].cards.mcmid === "number" &&
          resp.data.legalities[i].cards.isonlineonly === 0
        ) {
          console.log("idProduct:", resp.data.legalities[i].cards.mcmid);
          await db.productLegalities.upsert(
            {
              idProduct: resp.data.legalities[i].cards.mcmid,
              [`isLegal${config.formatDefinition[idFormat]}`]: 1,
              updatedAt: Date.now(),
            },
            {
              fields: [
                `isLegal${config.formatDefinition[idFormat]}`,
                "updatedAt",
              ],
            }
          );
        } else {
          console.log("card not legal");
        }
      }
    })
    .catch((error) => {
      console.log("we're in error");
      console.log("Here is the error", error);
    });
}

async function addIdSetToProductLegalities() {
  //ajouter le set au productLegality dictionnary
}

module.exports = {
  getAllMcmIdAndLegalitiesFromOneFormat,
  getAllFormatDefinition,
};
