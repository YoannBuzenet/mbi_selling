const axios = require("axios");

async function returnAdminJWT() {
  const credentials = {
    email: process.env.LOG_SHOP_ADMIN,
    password: process.env.LOG_SHOP_PWD,
  };
  try {
    const servResp = await axios.post(
      process.env.REACT_APP_MTGAPI_URL,
      credentials
    );

    return servResp.data.token;
  } catch (error) {
    console.log("error during admin login");
  }
}

module.exports = {
  returnAdminJWT,
};
