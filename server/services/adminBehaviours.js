const axios = require("axios");

async function retrieveAsAdmin(url, method, parameters) {
  const credentials = {
    email: process.env.LOG_SHOP_ADMIN,
    password: process.env.LOG_SHOP_PWD,
  };
  try {
    const servResp = await axios.post(
      `${process.env.REACT_APP_MTGAPI_URL}/login`,
      credentials
    );

    const temporaryHeader = {
      headers: {
        Authorization: `Bearer ${servResp.data.token}`,
      },
    };
    if (method !== "get") {
      return axios[method](url, parameters, temporaryHeader);
    } else {
      return axios[method](url, temporaryHeader);
    }
  } catch (error) {
    console.log("ERROR during admin login and retriving as admin", error);
    return error;
  }
}

module.exports = {
  retrieveAsAdmin,
};
