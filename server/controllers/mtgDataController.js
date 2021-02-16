const axios = require("axios");
const db = require("../../models/index");
const { config } = require("../../config/configApp");
const { refreshTokenOnServer } = require("../controllers/authController");
const { sleep } = require("../services/utils");

// Axios base URL
axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

//Getting all formats from API
async function getAllFormatDefinition(jwt, refreshToken) {
  axios.defaults.headers["Authorization"] = jwt;
  await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/formats")
    .then(async (resp) => {
      console.log("getting all formats");
      //On each formats we are going to ask all the cards

      for (let i = 1; i <= resp.data["hydra:totalItems"]; i++) {
        // Reseting JWT every 5 formats to make it lasts until the end
        if (i % 5 === 0) {
          await refreshTokenOnServer(refreshToken);
        }

        console.log("iteration AVANT FUNCTION", i);
        let dataToClear = await getAllMcmIdAndLegalitiesFromOneFormat(i);
        console.log("iteration APRES FUNCTION", i);
        dataToClear = null;

        // we wait to let MTGAPI empty the serv RAM with fpm
        await sleep(6000);
      }
    });
}

//Function is async to ask one set after another
async function getAllMcmIdAndLegalitiesFromOneFormat(idFormat) {
  console.log("starting function");

  return await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/formats/" + idFormat)
    .then(async (resp) => {
      console.log("did request one format - before for loop on result");

      for (let i = 0; i < resp.data.legalities.length; i++) {
        console.log("go");

        if (
          typeof resp.data.legalities[i].cards.mcmid === "number" &&
          resp.data.legalities[i].cards.isonlineonly === 0
        ) {
          console.log("idProduct:", resp.data.legalities[i].cards.mcmid);
          console.log("card:", resp.data.legalities[i].cards);

          const isCardLegal =
            resp.data.legalities[i].status === "Legal" ? 1 : 0;

          await db.productLegalities.upsert(
            {
              idProduct: resp.data.legalities[i].cards.mcmid,
              rarity: resp.data.legalities[i].cards.rarity,
              [`isLegal${config.formatDefinition[idFormat]}`]: isCardLegal,
              expansion: resp.data.legalities[i]?.cards?.edition?.mcmname || "",
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
          console.log("card doesnt have any mcmId or is online only");
        }
      }
    })
    .catch((error) => {
      console.log("we're in error");
      console.log("Here is the error", error);
    });
}

module.exports = {
  getAllMcmIdAndLegalitiesFromOneFormat,
  getAllFormatDefinition,
};
