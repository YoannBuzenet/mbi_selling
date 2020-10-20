import axios from "axios";
import hmacSHA1 from "crypto-js/hmac-sha1";
//https://api.cardmarket.com/ws/documentation/API_2.0:Stock

//MKM template

// <?xml version="1.0" encoding="UTF-8" ?>
// <request>
//     <article>
//         <idProduct>100569</idProduct>
//         <idLanguage>1</idLanguage>
//         <comments>Inserted through the API</comments>
//         <count>1</count>
//         <price>4</price>
//         <condition>EX</condition>
//         <isFoil>true</isFoil>
//         <isSigned>false</isSigned>
//         <isPlayset>false</isPlayset>
//     </article>
// </request>

const URL_MKM_ADD_STOCK = "https://api.cardmarket.com/ws/v2.0/stock";
const URL_MKM_SANDBOX_ADD_STOCK =
  "https://sandbox.cardmarket.com/ws/v2.0/stock";

//Real Link
const MKM_AUTHENTICATION_URL_BASE =
  "https://api.cardmarket.com/ws/v2.0/authenticate/";
//Sandbox
// const MKM_AUTHENTICATION_URL_BASE =
//"https://sandbox.cardmarket.com/ws/v2.0/authenticate/";

const MKM_LANG_DEFINITION = {
  English: 1,
  French: 2,
  German: 3,
  Spanish: 4,
  Italian: 5,
  "Simplified Chinese": 6,
  Japanese: 7,
  Portuguese: 8,
  Russian: 9,
  Korean: 10,
  "Traditional Chinese": 11,
};

const MKM_MTG_API_LANG_TRANSLATION = {
  1: MKM_LANG_DEFINITION.German,
  2: MKM_LANG_DEFINITION.Spanish,
  3: MKM_LANG_DEFINITION.French,
  4: MKM_LANG_DEFINITION.Italian,
  5: MKM_LANG_DEFINITION.Japanese,
  6: MKM_LANG_DEFINITION.Portuguese,
  7: MKM_LANG_DEFINITION.Russian,
  8: MKM_LANG_DEFINITION["Simplified Chinese"],
  9: MKM_LANG_DEFINITION.English,
  10: MKM_LANG_DEFINITION.Korean,
  11: MKM_LANG_DEFINITION["Traditional Chinese"],
};

const MKM_MTG_API_CONDITION_TRANSLATION = {
  1: "MT",
  2: "NM",
  3: "EX",
  4: "GD",
  5: "LP",
  6: "PL",
  7: "PO",
};

function calculateSigningKey(appSecret, accessTokenSecret) {
  const signingKey =
    encodeURIComponent(appSecret) + "&" + encodeURIComponent(accessTokenSecret);

  return signingKey;
}

//TODO : Create a function thats takes an URL to reach and return an object with
// Raw URL, and parameters (key/value)

function buildOAuthHeader(
  method,
  URLToReach,
  appToken,
  app_secret,
  accessToken,
  access_token_secret
) {
  const timestamp = Date.now();
  const nonce =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  //Handling potentential parameters in the URL
  let urlworking = URLToReach.split("&");
  let urlWithoutParam = urlworking[0];

  //0. Prepare the header
  //1. Prepare the signature
  //2. Create the string header

  //0. Preparing Header

  //Table that will be used for the FINAL HEADER
  const params_header = {
    realm: urlWithoutParam,
    oauth_consumer_key: appToken,
    oauth_token: accessToken,
    oauth_nonce: nonce,
    oauth_timestamp: timestamp,
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
    oauth_signature: "",
  };

  //1. Preparing the signature

  //BaseString
  let baseString = method.toUpperCase() + "&";
  baseString += encodeURIComponent(urlWithoutParam) + "&";

  // console.log("baseString before adding parameters", baseString);

  //Initializing params that will be used for signature calculation. Other params may be added if there are query strings in the url.
  const signatureParams = {
    oauth_consumer_key: appToken,
    oauth_token: accessToken,
    oauth_nonce: nonce,
    oauth_timestamp: timestamp,
    oauth_signature_method: "HMAC-SHA1",
    oauth_version: "1.0",
  };

  //Adding the potential query string parameters in the signature params that will be added to baseString
  if (urlworking.length > 0) {
    for (let i = 1; i < urlworking.length; i++) {
      let keyAndValue = urlworking[i].split("=");
      let key = keyAndValue[0];
      let value = keyAndValue[1];
      signatureParams[key] = value;
    }
  }

  //Sorting signature params properties alphabetically (MKM requires it)
  const params_ordered = {};
  Object.keys(signatureParams)
    .sort()
    .forEach(function (key) {
      params_ordered[key] = signatureParams[key];
    });

  //Encoding all params, and adding them to baseString
  var i = 1;
  var keyValuePair;
  for (const prop in params_ordered) {
    if (i < Object.keys(params_ordered).length) {
      keyValuePair = prop + "=" + params_ordered[prop] + "&";
    } else {
      keyValuePair = prop + "=" + params_ordered[prop];
    }
    baseString = baseString + encodeURIComponent(keyValuePair);
    i++;
  }

  const signingKey = calculateSigningKey(app_secret, access_token_secret);

  // console.log(baseString);
  // console.log(params_ordered);
  // console.log(signingKey);

  //https://stackoverflow.com/questions/12099092/javascript-equivalent-of-phps-hash-hmac-with-raw-binary-output
  var CryptoJS = require("crypto-js");
  const raw_signature = hmacSHA1(baseString, signingKey);
  const signature = raw_signature.toString(CryptoJS.enc.Base64);
  // console.log(signature);

  //Update signature in params_ordered
  params_header.oauth_signature = signature;

  //Prepare the Header
  // let header = "Authorization: OAuth ";
  let header = "OAuth ";

  var j = 1;
  for (const prop in params_header) {
    if (j === 1) {
      let keyValuePair = prop + '="' + params_header[prop] + '"';
      header += keyValuePair;
    } else {
      let keyValuePair = ", " + prop + '="' + params_header[prop] + '"';
      header += keyValuePair;
    }
    j++;
  }
  // console.log("header", header);

  return header;
}

function transformSellRequestIntoXML(arrayOfSellRequestCards) {
  // console.log(arrayOfSellRequestCards);
  const xml_start = '<?xml version="1.0" encoding="UTF-8" ?><request>';
  const xml_end = "</request>";
  const xml_body = arrayOfSellRequestCards.reduce(
    (accumulator, currentValue) => {
      const priceForSale =
        currentValue.mkmSellPrice || currentValue.AutomaticSellingPrice;

      const article =
        "<article> <idProduct>" +
        currentValue.mcmId +
        "</idProduct><idLanguage>" +
        MKM_MTG_API_LANG_TRANSLATION[currentValue.lang] +
        "</idLanguage><comments>" +
        "" + //Optional comment to post
        "</comments><count>" +
        currentValue.quantity +
        "</count><price>" +
        priceForSale +
        "</price><condition>" +
        MKM_MTG_API_CONDITION_TRANSLATION[currentValue.condition] +
        "</condition><isFoil>" +
        currentValue.isFoil +
        "</isFoil><isSigned>" +
        currentValue.isSigned +
        "</isSigned><isPlayset>false</isPlayset></article>";

      return article + accumulator;
    },
    ""
  );
  const xml_to_send = xml_start + xml_body + xml_end;

  console.log(xml_to_send);

  return xml_to_send;
}

function AddCardsToStock(XMLObject, header) {
  return axios.post(URL_MKM_ADD_STOCK, XMLObject, {
    headers: {
      Authorization: header,
    },
  });
}

export default {
  URL_MKM_ADD_STOCK,
  URL_MKM_SANDBOX_ADD_STOCK,
  MKM_AUTHENTICATION_URL_BASE,
  AddCardsToStock,
  transformSellRequestIntoXML,
  buildOAuthHeader,
};
