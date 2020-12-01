const axios = require("axios");
const MkmAPI = require("../services/MkmAPI");
const fs = require("fs");
const csv = require("csvtojson");
const db = require("../../models/index");

/* ********** */
// Get MKM stock from user and save it in CSV file
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
        // console.log("binary", binaryFile);

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
              console.log("err", err);
              throw new Error("error while opening file", err);
            }
            console.log("The file was saved!");
          }
        );

        /* ******************* */
        //Read the file to get buffer
        /* ******************* */
        fs.readFile("./shopStock/" + idShop + "/stock.gzip", (error, data) => {
          if (error) {
            console.log("error while reading file", error);
            throw new Error("error while reading file", error);
          }

          /* ******************* */
          //Transforming the GZIP into CSV
          /* ******************* */
          const zlib = require("zlib");
          zlib.gunzip(data, (error, fileUnzipped) => {
            if (error) {
              console.log("error while unzipping file", error);
            }

            const pathFile = "./shopStock/" + idShop + "/stock.csv";
            const pathFileWithoutExtension = "./shopStock/" + idShop + "/stock";

            console.log(fileUnzipped);
            fs.writeFile(
              pathFile,
              fileUnzipped,
              { encoding: "binary" },
              function (err) {
                if (err) {
                  console.log("error while writing file", err);
                  throw new Error("error while writing file", err);
                }
                console.log("The file was saved!");
                /* ******************* */
                // Deleting the gzip file
                /* ******************* */
                fs.unlink(
                  pathFileWithoutExtension + ".gzip",
                  (err, success) => {
                    if (err) {
                      console.log("error while deleting file", err);
                      throw new Error("error while deleting file", err);
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
    .catch((err) => {
      console.log("error when logging to MKM", err);
      throw new Error("error when logging to MKM", err);
    });
}

async function registerStockFileIntoDB(shopId) {
  const path = "./shopStock/" + shopId + "/stock.csv";

  //Parameters customized for our CSV : separator is ; and there are dots in columns names that we don't want to interpret
  csv({ delimiter: ";", flatKeys: true })
    .fromFile(path)
    .then(async (arrayOfCards) => {
      console.log(arrayOfCards);

      for (let i = 0; i < arrayOfCards.length; i++) {
        // Getting the Product Legality Id because of the One To Many relation
        const productLegality = await db.productLegalities.findOne({
          where: {
            idProduct: arrayOfCards[i].idProduct,
          },
        });

        const upsertedLine = await db.MkmProduct.upsert(
          {
            idArticle: arrayOfCards[i].idArticle,
            idProduct: arrayOfCards[i].idProduct,
            productLegalityId: productLegality.dataValues.id,
            englishName: arrayOfCards[i]["English Name"],
            localName: arrayOfCards[i]["Local Name"],
            Exp: arrayOfCards[i]["Exp."],
            expName: arrayOfCards[i]["Exp. Name"],
            price: arrayOfCards[i].Price,
            language: MkmAPI.translateMKMLangIDIntoMTG_APILangId(
              arrayOfCards[i].Language
            ),
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

        console.log("upserted line :", upsertedLine);
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

// object structure in the array : {dataValues : {}, productLegality: {dataValues : {}}, action : {}}

function transformChunkOfCardsAndActionsIntoXML(ArrayOfCardActionObjects) {
  const xml_start = '<?xml version="1.0" encoding="UTF-8" ?><request>';
  const xml_end = "</request>";
  const xml_body = ArrayOfCardActionObjects.reduce(
    (accumulator, currentValue) => {
      const priceForSale = currentValue.newPrice;
      const isFoilBool = currentValue.isFoil === 0 ? "false" : "true";

      const article =
        "<article> <idArticle>" +
        currentValue.idArticle +
        "</idArticle><idLanguage>" +
        MkmAPI.translateMTG_APILangIDIntoMKMLangId(currentValue.language) +
        "</idLanguage><comments>" +
        "" + //Optional comment to post
        "</comments><count>" +
        currentValue.amount +
        "</count><price>" +
        priceForSale +
        "</price><condition>" +
        currentValue.condition +
        "</condition><isFoil>" +
        isFoilBool +
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

// To do
function rewindScriptFromPutMemories(shopId) {
  console.log(
    "Put old price of each put memory on the stock of the shop " + shopId
  );
}

module.exports = {
  getShopStock,
  registerStockFileIntoDB,
  transformChunkOfCardsAndActionsIntoXML,
};
