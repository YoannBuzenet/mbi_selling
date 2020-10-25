const axios = require("axios");

async function retrieveAsAdmin(url, method, parameters) {
  const credentials = {
    email: process.env.LOG_SHOP_ADMIN,
    password: process.env.LOG_SHOP_PWD,
  };
  try {
    const servResp = await axios.post(
      process.env.REACT_APP_MTGAPI_URL,
      credentials
    );

    let temporaryHeader = {
      headers: {
        Authorization: servResp.data.token,
      },
    };

    const action = await axios[method](url, parameters, temporaryHeader);
    return action;
  } catch (error) {
    console.log("error during admin login and retriving as admin");
  }
}

module.exports = {
  retrieveAsAdmin,
};