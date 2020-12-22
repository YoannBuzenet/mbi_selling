import axios from "axios";
import config from "./config";

function register(credentials) {
  return axios.post("/authentication/register", credentials);
}

function update(id, credentials) {
  return axios.put("api/users/userShop" + id, credentials);
}

/* Are mandatory informations for invoices here ?*/
/* Returns boolean */
function hasGivenMandatoryInformationForInvoices(authContext) {
  return (
    authContext?.shop?.legalName !== "" &&
    authContext?.shop?.legalName &&
    authContext?.shop?.adress !== "" &&
    authContext?.shop?.adress &&
    authContext?.shop?.postalCode !== "" &&
    authContext?.shop?.postalCode &&
    authContext?.shop?.town !== "" &&
    authContext?.shop?.town &&
    authContext?.shop?.vatNumber !== "" &&
    authContext?.shop?.vatNumber
  );
}

export default {
  register,
  update,
  hasGivenMandatoryInformationForInvoices,
};
