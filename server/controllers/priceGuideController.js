const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require("axios");
const db = require("../../models/index");
const { config } = require("../../config/config");

async function getAllPrices(jwt) {
  axios.defaults.headers["Authorization"] = jwt;

  axios.get(process.env.REACT_APP_MTGAPI_URL + "/cards").then(async (resp) => {
    console.log(resp);
    const numberOfPages = resp.data["hydra:view"]["hydra:last"];

    for (let i = 1; i <= numberOfPages; i++) {
      console.log("page n°: ", i);
      axios
        .get(process.env.REACT_APP_MTGAPI_URL + "/cards?page=" + i)
        .then(async (respPage) => {
          const cardsToBrowse = respPage.data["hydra:member"];

          for (let card = 0; card < cardsToBrowse.length; card++) {
            console.log("card n° : ", card);

            await db.priceguide.upsert(
              {
                idProduct: card.mcmid,
                AvgSellPrice: card.priceguide.AvgSellPrice,
                lowPrice: card.priceguide.lowPrice,
                trendPrice: card.priceguide.trendPrice,
                germanProLow: card.priceguide.germanProLow,
                suggestedPrice: card.priceguide.suggestedPrice,
                foilSell: card.priceguide.foilSell,
                foilLow: card.priceguide.foilLow,
                foilTrend: card.priceguide.AvgSellPrice,
                lowPriceEx: card.priceguide.lowPriceEx,
                avg1: card.priceguide.avg1,
                avg7: card.priceguide.avg7,
                avg30: card.priceguide.avg30,
                foilAvg1: card.priceguide.foilAvg1,
                foilAvg7: card.priceguide.foilAvg7,
                foilAvg30: card.priceguide.foilAvg30,
                updatedAt: Date.now(),
              },
              {
                fields: [
                  "AvgSellPrice",
                  "lowPrice",
                  "trendPrice",
                  "germanProLow",
                  "suggestedPrice",
                  "foilSell",
                  "foilLow",
                  "foilTrend",
                  "lowPriceEx",
                  "avg1",
                  "avg7",
                  "avg30",
                  "foilAvg1",
                  "foilAvg7",
                  "foilAvg30",
                ],
              }
            );
          }
        });
    }
  });
}

module.exports = {
  getAllPrices,
};
