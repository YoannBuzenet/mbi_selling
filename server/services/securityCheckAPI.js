const axios = require("axios");
const url = require("url");

async function checkIfUserIsAdmin(jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;

  let normalURL = process.env.REACT_APP_MTGAPI_URL + "/shops";

  //Removing invisible space that was created by .env
  normalURL = normalURL.replace(/[\u200B-\u200D\uFEFF]/g, "");

  const respServ = await axios.get(normalURL).catch((error) => {
    // console.log("error when getting admin data from api", error);
    false;
  });

  //   console.log("resp before checking it", respServ);

  if (respServ) {
    // console.log("true", respServ);
    return true;
  }
  //   console.log("false", respServ);
  return false;
}

module.exports = { checkIfUserIsAdmin };
