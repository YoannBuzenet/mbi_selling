const axios = require("axios");
const MkmAPI = require("../services/MkmAPI");
const fs = require("fs");

/* ********** */
// Get MKM stock from user and register it on server
/* ********** */
function getShopStock(shopInfo) {
  const header = MkmAPI.buildOAuthHeader(
    "GET",
    MkmAPI.URL_MKM_GET_STOCK,
    shopInfo.appToken,
    shopInfo.appSecret,
    shopInfo.accessToken,
    shopInfo.accessSecret
  );

  axios
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
        var slugify = require("slugify");
        const shopNameSlugified = slugify(shopInfo.legalName, "_");
        /* ******************* */
        //Creating folder if it doesn't exist
        /* ******************* */
        if (!fs.existsSync("./shopStock/" + shopNameSlugified)) {
          fs.mkdirSync("./shopStock/" + shopNameSlugified);
        }

        fs.writeFile(
          "./shopStock/" + shopNameSlugified + "/test.gzip",
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
        fs.readFile(
          "./shopStock/" + shopNameSlugified + "/test.gzip",
          (error, data) => {
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

              const pathFile = "./shopStock/" + shopNameSlugified + "/test.csv";

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
                  fs.unlink(pathFile, (err, success) => {
                    if (err) {
                      return console.log("err", err);
                    }
                    console.log("The CSV was deleted!");
                    return { pathFile: pathFile };
                  });
                }
              );
            });
          }
        );
      });
    })
    .catch((err) => console.log(err));
}

function registerStockFileIntoDB(pathFile) {
  console.log(
    "parse the CSV/Json file // put it in memory // write it in mysql"
  );
}

module.exports = { getShopStock };
