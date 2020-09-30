//TODO copy/pasta from mbi_front, to custom for our needs
function checkIfUserIsReallyLogged(sellRequestID, jwt) {
  axios.defaults.headers["Authorization"] = "Bearer " + jwt;
  return axios.get(
    process.env.REACT_APP_MTGAPI_URL + "/sell_requests/" + sellRequestID
  );
}

module.exports = { checkIfUserIsReallyLogged };
