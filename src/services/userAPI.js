import axios from "axios";
import config from "./config";

function register(credentials) {
  return axios.post(
    process.env.REACT_APP_MTGAPI_URL + "/Register",
    credentials
  );
}

function update(id, credentials) {
  // console.log(id, credentials);
  return axios.put(
    process.env.REACT_APP_MTGAPI_URL + "/users/" + id,
    credentials
  );
}

export default {
  register,
  update,
};
