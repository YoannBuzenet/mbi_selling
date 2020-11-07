const axios = require("axios");

async function refreshTokenAndInfos(refresh_token) {
  let object_refresh_token = { refresh_token: refresh_token };

  return axios
    .post(
      process.env.REACT_APP_MTGAPI_URL + "/token/refresh",
      object_refresh_token
    )
    .then((data) => {
      //Puting token into axios bearer
      axios.defaults.headers["Authorization"] = "Bearer " + data.data.token;

      return data;
    });
}

module.exports = {
  refreshTokenAndInfos,
};
