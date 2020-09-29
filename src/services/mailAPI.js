import axios from "axios";

function sendMail(action) {
  console.log(process.env.REACT_APP_EXPRESSAPI + "/api/mail");
  return axios.post(process.env.REACT_APP_EXPRESSAPI + "/api/mail", action);
}

function mailRequestCreator(action) {
  return { mailRequest: { action: action } };
}

export default { sendMail, mailRequestCreator };
