"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Scripts",
      [
        {
          idShop: 4,
          name: "Le premier script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idShop: 4,
          name: "Le second script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    // const db = require("../models/index");

    //   //write here to give formats

    //   const script = await db.Script.findOne({
    //     where: {
    //       idShop: 4,
    //     },
    //   });

    //   console.log(script);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Scripts", null, {});
  },
};
