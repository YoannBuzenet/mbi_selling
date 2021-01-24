const axios = require("axios");

async function getShopData(idShop, jwt) {
  if (idShop === undefined) {
    throw "idShop is missing in getShopData function";
  }

  let idShopInt = parseInt(idShop);

  //To do if problem, parse jwt and make sure Bearer is precised (sometimes it is splitted or added twice, this way it will be sure)

  const axiosConfigShopHeader = {
    headers: {
      Authorization: jwt,
    },
  };

  let normalURL = process.env.REACT_APP_MTGAPI_URL + "/shops/" + idShopInt;

  //Removing invisible space that was created by .env
  normalURL = normalURL.replace(/[\u200B-\u200D\uFEFF]/g, "");

  const respServ = await axios
    .get(normalURL, axiosConfigShopHeader)
    .catch((error) => {
      console.log("error when getting SHOP data from api", error);
    });

  return respServ.data;
}

module.exports = {
  getShopData,
};
