const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");
const db = require("../../models/index");

// Global variable
// This doesnt work : we need to pass the root of the app in this variable
// However, it is not important : it just allows to find the right mail template. Without that, mail arrive empty, just with the PDF.
global.__basedir = __dirname;

beforeAll(async () => {
  // axios base URL
  axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

  // This data has been arbitrarily defined in the seed files
  const idShopTest = 57;
  const idScriptTest = 3;
  const isTest = false;
  const locale = "fr-FR"; // en-US
  const formats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const apiResp = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
    "get",
    {}
  );
  const shopData = apiResp.data;
  const jwt = apiResp.config.headers.Authorization;

  const scriptExecuted = await startScript(
    idShopTest,
    idScriptTest,
    isTest,
    shopData,
    locale,
    formats,
    jwt
  );
});

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

  describe("Card, Article 10, idProduct 16168", () => {
    it("should have an old price of 0.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(0.5);
        });
    });
    //to check after first try, yoann
    it("should have an new price of 1.17 because was excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(1.17);
        });
    });

    it("should have a behaviour chosen of roundUp15percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundUp15percents"
          );
        });
    });

    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
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
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16168", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16168);
        });
    });
    it("should have a lang : Italian (4)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(4);
        });
    });
    it("should have isFoil : 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isFoil).toEqual(1);
        });
    });
    it("should have an isSigned : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
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
            idArticle: 10,
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
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(6);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
    });
  });
  describe("Card, Article 15, idProduct 16168", () => {
    it("should have an old price of 5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(1.3);
        });
    });
    it("should have an new price of 0.72", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(0.73);
        });
    });
    it("should have a behaviour chosen of roundDown10percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundDown10percents"
          );
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
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
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16168", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16168);
        });
    });
    it("should have a lang : Simplified Chinese (8)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(8);
        });
    });
    it("should have isFoil : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
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
            idArticle: 15,
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
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(4);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
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
});
