const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");
const db = require("../../models/index");

// Global variable
// This doesnt work : we need to pass the root of the app in this variable
// However, it is not important : it just allows to find the right mail template. Without that, mail arrive empty, just with the PDF.
global.__basedir = __dirname;

// beforeAll(async () => {
//   // axios base URL
//   axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

//   // This data has been arbitrarily defined in the seed files
//   const idShopTest = 57;
//   const idScriptTest = 3;
//   const isTest = false;
//   const locale = "fr-FR"; // en-US
//   const formats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

//   const apiResp = await retrieveAsAdmin(
//     `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
//     "get",
//     {}
//   );
//   const shopData = apiResp.data;
//   const jwt = apiResp.config.headers.Authorization;

//   const scriptExecuted = await startScript(
//     idShopTest,
//     idScriptTest,
//     isTest,
//     shopData,
//     locale,
//     formats,
//     jwt
//   );
// });

describe("First Script", () => {
  it("checks the number of put memories", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 1,
        },
      })
      .then((put_memories) => {
        // Each mkmproduct should generate a put memory. If it doesn't, something has been missed.
        expect(put_memories.count).toEqual(10);
      });
  });

  describe("Card, Article 9, idProduct 16483", () => {
    it("should have an old price of 5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(10);
        });
    });
    it("should have an new price of Null because was excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(null);
        });
    });
    it("should have a behaviour chosen of Excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual("Excluded");
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16483", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16483);
        });
    });
    it("should have a lang : Portuguese (6)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(6);
        });
    });
    it("should have isFoil : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isFoil).toEqual(0);
        });
    });
    it("should have an isSigned : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isSigned).toEqual(0);
        });
    });
    it("should have an is playset : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 8", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(8);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
    });
  });
  describe("Card, Article X", () => {
    it("should have an old price of X", async () => {});
    it("should have an new price of X", async () => {});
    it("should have a bavhiour chosen of X", async () => {});
    it("should have a priceshield deactivated", async () => {});
    it("should have an id Script of X", async () => {});
    it("should have an id Product of X", async () => {});
    it("should have a lang : X", async () => {});
    it("should have isFoil : X", async () => {});
    it("should have an isSigned : X", async () => {});
    it("should have an is playset : X", async () => {});
    it("should have an amount of X", async () => {});
    it("should have an put request id of X", async () => {});
  });
  describe("Card, Article X", () => {
    it("should have an old price of X", async () => {});
    it("should have an new price of X", async () => {});
    it("should have a bavhiour chosen of X", async () => {});
    it("should have a priceshield deactivated", async () => {});
    it("should have an id Script of X", async () => {});
    it("should have an id Product of X", async () => {});
    it("should have a lang : X", async () => {});
    it("should have isFoil : X", async () => {});
    it("should have an isSigned : X", async () => {});
    it("should have an is playset : X", async () => {});
    it("should have an amount of X", async () => {});
    it("should have an put request id of X", async () => {});
  });
  describe("Card, Article X", () => {
    it("should have an old price of X", async () => {});
    it("should have an new price of X", async () => {});
    it("should have a bavhiour chosen of X", async () => {});
    it("should have a priceshield deactivated", async () => {});
    it("should have an id Script of X", async () => {});
    it("should have an id Product of X", async () => {});
    it("should have a lang : X", async () => {});
    it("should have isFoil : X", async () => {});
    it("should have an isSigned : X", async () => {});
    it("should have an is playset : X", async () => {});
    it("should have an amount of X", async () => {});
    it("should have an put request id of X", async () => {});
  });
  describe("Card, Article X", () => {
    it("should have an old price of X", async () => {});
    it("should have an new price of X", async () => {});
    it("should have a bavhiour chosen of X", async () => {});
    it("should have a priceshield deactivated", async () => {});
    it("should have an id Script of X", async () => {});
    it("should have an id Product of X", async () => {});
    it("should have a lang : X", async () => {});
    it("should have isFoil : X", async () => {});
    it("should have an isSigned : X", async () => {});
    it("should have an is playset : X", async () => {});
    it("should have an amount of X", async () => {});
    it("should have an put request id of X", async () => {});
  });
});
