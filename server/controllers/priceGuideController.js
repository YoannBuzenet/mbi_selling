const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require("axios");
const db = require("../../models/index");
const { config } = require("../../config/configApp");

async function getAllPrices(jwt) {
  axios.defaults.headers["Authorization"] = jwt;

  await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/cards")
    .then(async (resp) => {
      const numberOfPages = parseInt(
        resp.data["hydra:view"]["hydra:last"].substr(12)
      );
      console.log("starting function !");
      console.log("number of pages : ", numberOfPages);

      for (let i = 1; i <= numberOfPages; i++) {
        console.log("page n°: ", i);
        await axios
          .get(process.env.REACT_APP_MTGAPI_URL + "/cards?page=" + i)
          .then(async (respPage) => {
            const cardsToBrowse = respPage.data["hydra:member"];

            for (
              let numberCard = 0;
              numberCard < cardsToBrowse.length;
              numberCard++
            ) {
              console.log("card n° : ", numberCard);
              console.log(
                "card to browse before the if",
                cardsToBrowse[numberCard]
              );

              if (
                cardsToBrowse[numberCard].priceguide !== null &&
                cardsToBrowse[numberCard].priceguide !== undefined
              ) {
                console.log(
                  "card to browse inside the if",
                  cardsToBrowse[numberCard]
                );
                const newPrice = await db.priceguide.upsert(
                  {
                    idProduct: cardsToBrowse[numberCard].mcmid,
                    AvgSellPrice:
                      cardsToBrowse[numberCard].priceguide.AvgSellPrice,
                    lowPrice: cardsToBrowse[numberCard].priceguide.lowPrice,
                    trendPrice: cardsToBrowse[numberCard].priceguide.trendPrice,
                    germanProLow:
                      cardsToBrowse[numberCard].priceguide.germanProLow,
                    suggestedPrice:
                      cardsToBrowse[numberCard].priceguide.suggestedPrice,
                    foilSell: cardsToBrowse[numberCard].priceguide.foilSell,
                    foilLow: cardsToBrowse[numberCard].priceguide.foilLow,
                    foilTrend:
                      cardsToBrowse[numberCard].priceguide.AvgSellPrice,
                    lowPriceEx: cardsToBrowse[numberCard].priceguide.lowPriceEx,
                    avg1: cardsToBrowse[numberCard].priceguide.avg1,
                    avg7: cardsToBrowse[numberCard].priceguide.avg7,
                    avg30: cardsToBrowse[numberCard].priceguide.avg30,
                    foilAvg1: cardsToBrowse[numberCard].priceguide.foilAvg1,
                    foilAvg7: cardsToBrowse[numberCard].priceguide.foilAvg7,
                    foilAvg30: cardsToBrowse[numberCard].priceguide.foilAvg30,
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
                console.log(newPrice);
              }
            }
          })
          .catch((err) => console.log(err));
      }
    });
}

module.exports = {
  getAllPrices,
};
