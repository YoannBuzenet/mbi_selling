const { getAllPrices } = require("../controllers/priceGuideController");
const axios = require("axios");

async function getMTGPrices() {
  const credentials = {
    email: process.env.LOG_SHOP_ADMIN,
    password: process.env.LOG_SHOP_PWD,
  };
  try {
    const servResp = await axios.post(
      `${process.env.REACT_APP_MTGAPI_URL}/login`,
      credentials
    );

    const { token, refresh_token } = servResp.data;

    const bearerToken = "Bearer " + token;

    await getAllPrices(bearerToken, refresh_token);
  } catch (e) {
    console.log("Error while calling price from CLI script", e);
  }
}

getMTGPrices();
