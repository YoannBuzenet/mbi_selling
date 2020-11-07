const axios = require("axios");

async function refreshTokenAndInfos(refresh_token) {
  let object_refresh_token = { refresh_token: refresh_token };

  return axios
    .post("/authentication/token/refresh", object_refresh_token)
    .then((data) => {
      //Saving the new JWT token in localStorage
      window.localStorage.setItem("authToken", data.data.token);

      //Puting token into axios bearer
      axios.defaults.headers["Authorization"] = "Bearer " + data.data.token;

      return data;
    });
}

module.exports = {
  refreshTokenAndInfos,
};
