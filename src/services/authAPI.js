import axios from "axios";
import jwtDecode from "jwt-decode";
import localStorageAPI from "./localStorageAPI";
import config from "./config";

//When an user logins, if the credentials are rights, we send back data to identify him.
//DATA structure in browser memory : customer, hasShop
//Data strcture in local storage : API like : client, client.hasShop, isShop
//Then we store data into local storage.
function authenticate(credentials) {
  return axios
    .post(process.env.REACT_APP_MTGAPI_URL + "/login", credentials)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then((data) => {
      // console.log(data);
      //Stocking in local storage
      window.localStorage.setItem("authToken", data.token);
      window.localStorage.setItem("refreshToken", data.refresh_token);

      window.localStorage.setItem("userInfos", JSON.stringify(data));

      //Puting token into axios bearer
      axios.defaults.headers["Authorization"] = "Bearer " + data.token;

      //We return an object containing all data relevant to the current user : is he logged, who is he. Of course, every access is checked on the server.
      return transformAPIdataIntoAppData(data);
    });
}

function logout() {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("userInfos");
  delete axios.defaults.headers["Authorization"];
}

function setup() {
  //1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");

  //2. Verifier si le token est valide
  if (token) {
    const jwtData = jwtDecode(token);

    if (jwtData.exp * 1000 > new Date().getTime()) {
      //3. Donner le token à axios
      axios.defaults.headers["Authorization"] = "Bearer " + token;

      return true;
    } else {
      logout();
      return false;
    }
  } else {
    logout();
    return false;
  }
}

//Get user info from Local Storage
function userInfos() {
  //1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");

  //We get back all datas stocked in the browser about the user and put it back in memory.
  const userDatas = JSON.parse(window.localStorage.getItem("userInfos"));

  //Vérifier si la date d'exp du token est bonne, si oui on considère que connecté ( le serveur fait le vrai check derrière)
  if (token && userDatas) {
    return transformAPIdataIntoAppData(userDatas);
  } else {
    return {
      isAuthenticated: false,
      user: {
        id: "",
        email: "",
        roles: [],
        token: "",
      },
      customer: {
        id: "",
        prenom: "",
        nom: "",
        tel: "",
        adress: "",
        postalCode: "",
        town: "",
        SellRequests: [],
      },
      shop: {
        id: "",
        legalName: "",
        SIRET: "",
        vatNumber: "",
        tel: "",
        email: "",
        adress: "",
        postalCode: "",
        town: "",
        shopData: null,
      },
    };
  }
}

//Update User Info in the local storage
function updateUserInfosLocalStorage(allUserInfos) {
  window.localStorage.setItem("userInfos", JSON.stringify(allUserInfos));
}

function refreshTokenAndInfos(refresh_token) {
  let object_refresh_token = { refresh_token: refresh_token };

  return axios
    .post(
      process.env.REACT_APP_MTGAPI_URL + "/token/refresh",
      object_refresh_token
    )
    .then((data) => {
      //Saving the new JWT token in localStorage
      window.localStorage.setItem("authToken", data.data.token);

      //Puting token into axios bearer
      axios.defaults.headers["Authorization"] = "Bearer " + data.data.token;

      return data;
    });
}

function transformAPIdataIntoAppData(data) {
  const token = window.localStorage.getItem("authToken");

  //Vérifier si la date d'exp du token est bonne, si oui on considère que connecté ( le serveur fait le vrai check derrière)
  if (token) {
    var jwtData = jwtDecode(token);
  }
  return {
    isAuthenticated: jwtData.exp * 1000 > new Date().getTime(),
    refresh_token: data.refresh_token,
    token: data.token,
    user: {
      id: data.user.id,
      email: data.user.email,
      roles: data.user.roles,
    },
    customer: {
      id: data.client.id,
      prenom: data.client.prenom,
      nom: data.client.nom,
      tel: data.client.tel,
      adress: data.client.adress,
      postalCode: data.client.postalCode,
      town: data.client.town,
      SellRequests: data.client.SellRequests || [],
    },
    shop: {
      id: data.client.shop.id,
      legalName: data.client.shop.legalName,
      SIRET: data.client.shop.SIRET,
      vatNumber: data.client.shop.vatNumber,
      tel: data.client.shop.tel,
      email: data.client.shop.email,
      adress: data.client.shop.adress,
      postalCode: data.client.shop.postalCode,
      town: data.client.shop.town,
      legalClausesBuying: data.shop
        ? data.shop.legalClausesBuying === null
          ? ""
          : data.shop.legalClausesBuying
        : "",
      shopData: data.shop
        ? {
            baseLang: data.shop.baseLang,
            PercentPerLangs: localStorageAPI.transformPercentPerLangArrayIntoObject(
              data.shop.PercentPerLangs
            ),
            PercentPerConditions: data.shop.PercentPerConditions,
            PercentPerConditionFoils: data.shop.PercentPerConditionFoils,
            PercentPerSigned: data.shop.percentPerSigned,
          }
        : null,

      appToken: data.shop ? data.shop.appToken : null,
      appSecret: data.shop ? data.shop.appSecret : null,
      accessToken: data.shop ? data.shop.accessToken : null,
      accessSecret: data.shop ? data.shop.accessSecret : null,
      ExpirationMkmToken: data.shop ? data.shop.ExpirationMkmToken : null,
      sellRequests: data?.shop?.SellRequests,
    },
  };
}

export default {
  authenticate,
  logout,
  setup,
  userInfos,
  updateUserInfosLocalStorage,
  refreshTokenAndInfos,
  transformAPIdataIntoAppData,
};
