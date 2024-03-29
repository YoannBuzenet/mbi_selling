const { getAllFormatDefinition } = require("../controllers/mtgDataController");
const path = require("path");
const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  throw result.error;
}

const axios = require("axios");

// axios base URL
axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

async function getMTGData() {
  if (process.env.LOG_SHOP_ADMIN === undefined) {
    throw new Error(
      "LOG_SHOP_ADMIN not defined in env var. Did you define it ?"
    );
  } else if (process.env.LOG_SHOP_PWD === undefined) {
    throw new Error("LOG_SHOP_PWD not defined in env var. Did you define it ?");
  }
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

    await getAllFormatDefinition(bearerToken, refresh_token);
  } catch (e) {
    console.log("Error while calling price from CLI script", e);
  }
}

getMTGData();
