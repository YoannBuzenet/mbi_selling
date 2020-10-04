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

async function checkIfUserIsThisOneOrAdmin(jwt, idShop) {
  axios.defaults.headers["Authorization"] = jwt;

  let normalURL = process.env.REACT_APP_MTGAPI_URL + "/users/" + idShop;

  //Removing invisible space that was created by .env
  normalURL = normalURL.replace(/[\u200B-\u200D\uFEFF]/g, "");

  // console.log("url length", normalURL.length);

  const respServ = await axios.get(normalURL).catch((error) => {
    console.log("error when getting admin data from api", error);
    false;
  });

  // console.log("resp after check auth", respServ);

  if (respServ) {
    // console.log("true", respServ);
    return true;
  }
  //   console.log("false", respServ);
  return false;
}

function checkIsJWTThere(req, res) {
  let jwt = req.headers.authorization;
  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
  }
}

//For now the function only check query param as int
//Should be able to do more
function checkQueryParams(req, res, queryParams) {
  //If it's an array, check each of them
  if (Array.isArray(queryParams)) {
    for (let i = 0; i < queryParams.length; i++) {
      if (isNaN(parseInt(req.query[queryParams[i]]))) {
        res.status(406).json(`${queryParams[i]} is missing`);
      }
    }
  } else {
    if (isNaN(parseInt(req.query[queryParams]))) {
      res.status(406).json(`${queryParams} is missing`);
    }
  }
}

function checkType(param, type) {
  //Checking number
  if (type === "number") {
    if (isNaN(parseInt(param))) {
      res.status(406).json(`${param} should be a number.`);
      return;
    }
  }
}

module.exports = {
  checkIfUserIsAdmin,
  checkIfUserIsThisOneOrAdmin,
  checkIsJWTThere,
  checkQueryParams,
  checkType,
};
