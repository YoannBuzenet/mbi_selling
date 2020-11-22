const axios = require("axios");
const MkmAPI = require("../services/MkmAPI");
const fs = require("fs");
var slugify = require("slugify");
const csv = require("csvtojson");
const db = require("../../models/index");

/* ********** */
// Get MKM stock from user and register it on server
/* ********** */
function getShopStock(shopInfo, idShop) {
  const header = MkmAPI.buildOAuthHeader(
    "GET",
    MkmAPI.URL_MKM_GET_STOCK,
    shopInfo.appToken,
    shopInfo.appSecret,
    shopInfo.accessToken,
    shopInfo.accessSecret
  );

  return axios
    .get(MkmAPI.URL_MKM_GET_STOCK, {
      headers: {
        Authorization: header,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
      },
    })
    .then((resp) => {
      /* ******************* */
      //Transform XML into JS object
      /* ******************* */
      var parseString = require("xml2js").parseString;
      parseString(resp.data, function (err, result) {
        console.log("xml is :", result);
        /* ******************* */
        //Transforming base 64 string into binary
        /* ******************* */
        var atob = require("atob");
        // console.log("stock", result.response.stock[0]);

        const binaryFile = atob(result.response.stock[0]);
        console.log("binary", binaryFile);
        /* ******************* */
        //Save the file
        /* ******************* */

        /* ******************* */
        //Creating folder if it doesn't exist
        /* ******************* */
        if (!fs.existsSync("./shopStock/" + idShop)) {
          fs.mkdirSync("./shopStock/" + idShop);
        }

        fs.writeFile(
          "./shopStock/" + idShop + "/stock.gzip",
          binaryFile,
          { encoding: "binary" },
          function (err) {
            if (err) {
              return console.log("err", err);
            }
            console.log("The file was saved!");
          }
        );

        /* ******************* */
        //Read the file to get buffer
        /* ******************* */
        fs.readFile("./shopStock/" + idShop + "/stock.gzip", (error, data) => {
          if (error) {
            console.log(error);
          }

          /* ******************* */
          //Transforming the GZIP into CSV
          /* ******************* */
          const zlib = require("zlib");
          zlib.gunzip(data, (error, fileUnzipped) => {
            if (error) {
              console.log(error);
            }

            const pathFile = "./shopStock/" + idShop + "/stock.csv";
            const pathFileWithoutExtension = "./shopStock/" + idShop + "/test";

            console.log(fileUnzipped);
            fs.writeFile(
              pathFile,
              fileUnzipped,
              { encoding: "binary" },
              function (err) {
                if (err) {
                  return console.log("err", err);
                }
                console.log("The file was saved!");
                /* ******************* */
                // Deleting the gzip file
                /* ******************* */
                fs.unlink(
                  pathFileWithoutExtension + ".gzip",
                  (err, success) => {
                    if (err) {
                      return console.log("err", err);
                    }
                    console.log(
                      "The GZIP was deleted! CSV is ready to be read in another function."
                    );
                    return true;
                  }
                );
              }
            );
          });
        });
      });
    })
    .catch((err) => console.log("error when loggin to MKM", err));
}

async function registerStockFileIntoDB(shopId) {
  console.log(
    "parse the CSV/Json file // put it in memory // write it in mysql"
  );

  console.log("we're looking for the stock of shop id: ", shopId);

  const path = "./shopStock/" + shopId + "/stock.csv";

  //Parameters customized for our CSV : separator is ; and there are dots in columns names that we don't want to interpret
  csv({ delimiter: ";", flatKeys: true })
    .fromFile(path)
    .then(async (arrayOfCards) => {
      console.log(arrayOfCards);

      for (let i = 0; i < arrayOfCards.length; i++) {
        await db.MkmProduct.upsert(
          {
            idArticle: arrayOfCards[i].idArticle,
            idProduct: arrayOfCards[i].idProduct,
            englishName: arrayOfCards[i]["English Name"],
            localName: arrayOfCards[i]["Local Name"],
            Exp: arrayOfCards[i]["Exp."],
            expName: arrayOfCards[i]["Exp. Name"],
            price: arrayOfCards[i].Price,
            language: arrayOfCards[i].Language,
            condition: arrayOfCards[i].Condition,
            isFoil: arrayOfCards[i]["Foil?"] || 0,
            isSigned: arrayOfCards[i]["Signed?"] || 0,
            isPlayset: arrayOfCards[i]["Playset?"] || 0,
            isAltered: arrayOfCards[i]["Altered?"] || 0,
            comments: arrayOfCards[i].Comments || 0,
            amount: arrayOfCards[i].Amount,
            onSale: arrayOfCards[i].onSale,
            idCurrency: arrayOfCards[i].idCurrency,
            currencyCode: arrayOfCards[i]["Currency Code"],
            idShop: shopId,
          },
          {
            field: [
              "Price",
              "Condition",
              "Foil?",
              "Signed?",
              "Playset?",
              "Altered?",
              "Comments",
            ],
          }
        );
      }
    });
}

// MKM Doc
// PUT https://api.cardmarket.com/ws/v2.0/stock

// <?xml version="1.0" encoding="UTF-8" ?>
// <request>
//     <article>
//         <idArticle>14449120</idArticle>
//         <idLanguage>1</idLanguage>
//         <comments>Edited through the API</comments>
//         <count>4</count>
//         <price>4</price>
//         <condition>EX</condition>
//         <isFoil>true</isFoil>
//         <isSigned>false</isSigned>
//         <isPlayset>false</isPlayset>
//     </article>
//     <article>
//         <idArticle>42914990</idArticle>
//         <idLanguage>1</idLanguage>
//         <comments>Edited through the API</comments>
//         <count>3</count>
//         <price>4</price>
//         <condition>EX</condition>
//         <isFoil>true</isFoil>
//         <isSigned>false</isSigned>
//         <isPlayset>false</isPlayset>
//     </article>
// </request>

function transformChunkOfCardsAndActionsIntoXML(ArrayOfCardActionObjects) {
  const xml_start = '<?xml version="1.0" encoding="UTF-8" ?><request>';
  const xml_end = "</request>";
  const xml_body = arrayOfSellRequestCards.reduce(
    (accumulator, currentValue) => {
      const priceForSale = currentValue.newPrice;

      const article =
        "<article> <idArticle>" +
        currentValue.idProduct +
        "</idArticle><idLanguage>" +
        MkmAPI.MKM_MTG_API_LANG_TRANSLATION[currentValue.lang] +
        "</idLanguage><comments>" +
        "" + //Optional comment to post
        "</comments><count>" +
        currentValue.amount +
        "</count><price>" +
        priceForSale +
        "</price><condition>" +
        MkmAPI.MKM_MTG_API_CONDITION_TRANSLATION[currentValue.condition] +
        "</condition><isFoil>" +
        currentValue.isFoil +
        "</isFoil><isSigned>" +
        "false" +
        "</isSigned><isPlayset>false</isPlayset></article>";

      return article + accumulator;
    },
    ""
  );
  const xml_to_send = xml_start + xml_body + xml_end;

  console.log(xml_to_send);

  return xml_to_send;
}

//TO DO one day :d
//Delete the shop from shop X
function deleteStockShopInLocalDB(shopId) {
  console.log("Deleting local stock of shop ", shopId);
}

module.exports = {
  getShopStock,
  registerStockFileIntoDB,
  transformChunkOfCardsAndActionsIntoXML,
};
