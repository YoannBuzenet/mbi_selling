const { Sequelize, Model, DataTypes } = require("sequelize");
const axios = require("axios");
const productLegalitiesModel = require("../../models/productlegalities");

const sequelize = new Sequelize(
  "mbi_selling_database_development",
  "root",
  "Musk1977!",
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

function getAllMcmIdAndLegalities(jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/cards")
    .then((resp) => {
      console.log(resp.data);
      console.log("register first page into DB");
      console.log("call X fois pour le nombre de page et upsert");
    })
    .catch((error) => {
      console.log("we're in error");
      // console.log("Here is the error", error);
    });

  const mockProductLegality = { idProduct: 54 };

  const productLegalities = productLegalitiesModel(sequelize, Sequelize);
  productLegalities.create(mockProductLegality);
}

module.exports = { getAllMcmIdAndLegalities };
