const db = require("../../models/index");

describe("First Script Real", () => {
  it("checks the number of put memories", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 1,
        },
      })
      .then((put_memories) => {
        // Each mkmproduct should generate a put memory. If it doesn't, something has been missed.
        expect(put_memories.count).toEqual(11);
      });
  });

  describe("Card, Article 9, idProduct 16483", () => {
    it("should have an old price of 10", async () => {
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
    it("should have an new price of 1.17", async () => {
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
  describe("Card, Article 159, idProduct 16511", () => {
    it("should have an old price of 7", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(7);
        });
    });
    it("should have an new price of 10.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(10.5);
        });
    });
    it("should have a behaviour chosen of Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual("Set Value");
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
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
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16511", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16511);
        });
    });
    it("should have a lang : Traditional Chinese (11)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(11);
        });
    });
    it("should have isFoil : True", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
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
            idArticle: 159,
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
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(2);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
    });
  });
  describe("Card, Article 160, idProduct 16511 - PriceShield on Set Value", () => {
    it("should have an old price of 60", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(60);
        });
    });
    it("should have an new price of 10.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(10.5);
        });
    });
    it("should have a behaviour chosen of Price Shield Blocked Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Price Shield Blocked Set Value"
          );
        });
    });
    it("should have a priceshield activated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(1);
        });
    });
    it("should have an id Script of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16511", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16511);
        });
    });
    it("should have a lang : Traditional Chinese (11)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(11);
        });
    });
    it("should have isFoil : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
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
            idArticle: 160,
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
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 52", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(52);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
    });
  });
  describe("Card, Article 169, idProduct 16229", () => {
    it("should have an old price of 300", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(300);
        });
    });
    it("should have an new price of 104.66", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(104.66);
        });
    });
    it("should have a behaviour chosen of Price Shield Blocked roundDown50percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Price Shield Blocked roundDown50percents"
          );
        });
    });
    it("should have a priceshield activated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(1);
        });
    });
    it("should have an id Script of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 17851", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(17851);
        });
    });
    it("should have a lang : German (1)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(1);
        });
    });
    it("should have isFoil : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
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
            idArticle: 169,
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
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 87", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(87);
        });
    });
    it("should have an put request id of 1", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(1);
        });
    });
  });
  describe("Card, Article 179, idProduct 16229", () => {
    it("should have a behaviour chosen of Excluded - Signed", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Excluded - Signed"
          );
        });
    });

    it("should have an isSigned : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isSigned).toEqual(1);
        });
    });
    it("should have an is playset : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 11", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(11);
        });
    });
  });
  describe("Card, Article 180, idProduct 16229", () => {
    it("should have a behaviour chosen of Excluded - Playset", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Excluded - Playset"
          );
        });
    });

    it("should have an isSigned : No", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isSigned).toEqual(0);
        });
    });
    it("should have an is playset : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(1);
        });
    });
    it("should have an amount of 14", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(14);
        });
    });
  });
  describe("Card, Article 1820, idProduct 3200", () => {
    it("should have a behaviour chosen of No Corresponding Priceguide", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 1820,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "No Corresponding Priceguide"
          );
        });
    });
  });
  describe("Card, Article 181, idProduct 107", () => {
    it("should have a price of 123.75", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 1,
            idArticle: 181,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(123.75);
        });
    });
  });
});

describe("Second Put request, Script 3 Test", () => {
  it("checks the number of put memories", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 2,
        },
      })
      .then((put_memories) => {
        // Each mkmproduct should generate a put memory. If it doesn't, something has been missed.
        expect(put_memories.count).toEqual(11);
      });
  });

  describe("Card, Article 9, idProduct 16483", () => {
    it("should have an old price of 10", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(10);
        });
    });
    it("should have a behaviour chosen of Excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(8);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });

  describe("Card, Article 10, idProduct 16168", () => {
    it("should have an old price of 0.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(6);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });
  describe("Card, Article 15, idProduct 16168", () => {
    it("should have an old price of 5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
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
            PUT_Request_id: 2,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(4);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });
  describe("Card, Article 159, idProduct 16511", () => {
    it("should have an old price of 7", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(7);
        });
    });
    it("should have an new price of 10.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(10.5);
        });
    });
    it("should have a behaviour chosen of Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual("Set Value");
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
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
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16511", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16511);
        });
    });
    it("should have a lang : Traditional Chinese (11)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(11);
        });
    });
    it("should have isFoil : True", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
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
            PUT_Request_id: 2,
            idArticle: 159,
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
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(2);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 159,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });
  describe("Card, Article 160, idProduct 16511 - PriceShield on Set Value", () => {
    it("should have an old price of 60", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(60);
        });
    });
    it("should have an new price of 10.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(10.5);
        });
    });
    it("should have a behaviour chosen of Price Shield Blocked Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Price Shield Blocked Set Value"
          );
        });
    });
    it("should have a priceshield activated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(1);
        });
    });
    it("should have an id Script of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 16511", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(16511);
        });
    });
    it("should have a lang : Traditional Chinese (11)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(11);
        });
    });
    it("should have isFoil : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
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
            PUT_Request_id: 2,
            idArticle: 160,
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
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 52", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(52);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 160,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });
  describe("Card, Article 169, idProduct 16229", () => {
    it("should have an old price of 300", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(300);
        });
    });
    it("should have an new price of 104.66", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(104.66);
        });
    });
    it("should have a behaviour chosen of Price Shield Blocked roundDown50percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Price Shield Blocked roundDown50percents"
          );
        });
    });
    it("should have a priceshield activated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(1);
        });
    });
    it("should have an id Script of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(3);
        });
    });
    it("should have an id Product of 17851", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idProduct).toEqual(17851);
        });
    });
    it("should have a lang : German (1)", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(1);
        });
    });
    it("should have isFoil : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
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
            PUT_Request_id: 2,
            idArticle: 169,
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
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 87", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(87);
        });
    });
    it("should have an put request id of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 169,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(2);
        });
    });
  });
  describe("Card, Article 179, idProduct 16229", () => {
    it("should have a behaviour chosen of Excluded - Signed", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Excluded - Signed"
          );
        });
    });

    it("should have an isSigned : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isSigned).toEqual(1);
        });
    });
    it("should have an is playset : None", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 11", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 179,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(11);
        });
    });
  });
  describe("Card, Article 180, idProduct 16229", () => {
    it("should have a behaviour chosen of Excluded - Playset", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "Excluded - Playset"
          );
        });
    });

    it("should have an isSigned : No", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isSigned).toEqual(0);
        });
    });
    it("should have an is playset : Yes", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(1);
        });
    });
    it("should have an amount of 14", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 2,
            idArticle: 180,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(14);
        });
    });
  });
});

describe("Script Old Price Test - Keyword : ignores", () => {
  it("checks the number of put memories", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 3,
        },
      })
      .then((put_memories) => {
        // Each mkmproduct should generate a put memory. If it doesn't, something has been missed.
        expect(put_memories.count).toEqual(11);
      });
  });

  // checker les cartes qui se font 1,2 (2),3
  describe("Card, Article 9, idProduct 16483", () => {
    it("should have an old price of 10", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(10);
        });
    });
    it("should have a behaviour chosen of roundUp15percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundUp15percents"
          );
        });
    });
    it("should have an new price of 11.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(11.5);
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
    it("should have an id Product of 16483", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(8);
        });
    });
    it("should have an put request id of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(3);
        });
    });
  });

  // Testing ruletype 2 with behaviour SET VALUE

  describe("Card, Article 10, idProduct 16168", () => {
    it("should have an old price of 0.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(0.5);
        });
    });

    it("should have an new price of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(2);
        });
    });

    it("should have a behaviour chosen of Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual("Set Value");
        });
    });

    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
    it("should have an id Product of 16168", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 6", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
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
            PUT_Request_id: 3,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(3);
        });
    });
  });

  describe("Card, Article 182, idProduct 16229", () => {
    it("should have an old price of 12", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(12);
        });
    });

    it("should have a behaviour chosen of Excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 182,
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
            PUT_Request_id: 3,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });

    it("should have a lang : 10", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(10);
        });
    });

    it("should have an amount of 105", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(105);
        });
    });
  });

  // Behaviour 8 : Rounddown 10% (/1.1)
  describe("Card, Article 15, idProduct 16168", () => {
    it("should have an old price of 1.3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(1.3);
        });
    });

    it("should have a behaviour chosen of roundDown10percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundDown10percents"
          );
        });
    });

    // 1/3 / 1.11 rounded
    it("should have an new price of 1.18", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(1.18);
        });
    });

    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
  });
  describe("Card, Article 181, idProduct 107", () => {
    it("should have a price of 123.75", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 3,
            idArticle: 181,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(190);
        });
    });
  });
});
describe("Script Old Price REAL - Keyword : ignores", () => {
  it("checks the number of put memories", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 4,
        },
      })
      .then((put_memories) => {
        // Each mkmproduct should generate a put memory. If it doesn't, something has been missed.
        expect(put_memories.count).toEqual(11);
      });
  });

  // checker les cartes qui se font 1,2 (2),3
  describe("Card, Article 9, idProduct 16483", () => {
    it("should have an old price of 10", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(10);
        });
    });
    it("should have a behaviour chosen of roundUp15percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundUp15percents"
          );
        });
    });
    it("should have an new price of 11.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(11.5);
        });
    });
    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
    it("should have an id Product of 16483", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(8);
        });
    });
    it("should have an put request id of 3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 9,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(4);
        });
    });
  });

  // Testing ruletype 2 with behaviour SET VALUE

  describe("Card, Article 10, idProduct 16168", () => {
    it("should have an old price of 0.5", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(0.5);
        });
    });

    it("should have an new price of 2", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(2);
        });
    });

    it("should have a behaviour chosen of Set Value", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual("Set Value");
        });
    });

    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
    it("should have an id Product of 16168", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.isPlayset).toEqual(0);
        });
    });
    it("should have an amount of 6", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
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
            PUT_Request_id: 4,
            idArticle: 10,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.PUT_Request_id).toEqual(4);
        });
    });
  });

  describe("Card, Article 182, idProduct 16229", () => {
    it("should have an old price of 12", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(12);
        });
    });

    it("should have a behaviour chosen of Excluded", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 182,
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
            PUT_Request_id: 4,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });

    it("should have a lang : 10", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.lang).toEqual(10);
        });
    });

    it("should have an amount of 105", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 182,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.amount).toEqual(105);
        });
    });
  });

  // Behaviour 8 : Rounddown 10% (/1.1)
  describe("Card, Article 15, idProduct 16168", () => {
    it("should have an old price of 1.3", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.oldPrice).toEqual(1.3);
        });
    });

    it("should have a behaviour chosen of roundDown10percents", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.behaviourChosen).toEqual(
            "roundDown10percents"
          );
        });
    });

    // 1/3 / 1.11 rounded
    it("should have an new price of 1.18", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.newPrice).toEqual(1.18);
        });
    });

    it("should have a priceshield deactivated", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.priceShieldBlocked).toEqual(0);
        });
    });
    it("should have an id Script of 4", async () => {
      return db.put_memory
        .findOne({
          where: {
            PUT_Request_id: 4,
            idArticle: 15,
          },
        })
        .then((put_memory) => {
          expect(put_memory.dataValues.idScript).toEqual(4);
        });
    });
  });
});

describe("Script Targets keywords", () => {
  it("checks the number of put memories : should be 2", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 5,
        },
      })
      .then((put_memories) => {
        expect(put_memories.count).toEqual(2);
      });
  });
});

describe("Script Avoids keywords", () => {
  it("checks the number of put memories : should be 10", async () => {
    return db.put_memory
      .findAndCountAll({
        where: {
          PUT_Request_id: 6,
        },
      })
      .then((put_memories) => {
        expect(put_memories.count).toEqual(10);
      });
  });
});
