"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("snapshot_params", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shopId: {
        type: Sequelize.INTEGER,
      },
      percentPerSigned: {
        type: Sequelize.INTEGER,
      },
      percentPerMintRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerNearMintRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerGoodRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerLightPlayedRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerPlayedRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerPoorRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerMintFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerNearMintFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerGoodFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerLightPlayedFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerPlayedFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerPoorFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerLangGerman: {
        type: Sequelize.INTEGER,
      },
      percentPerLangSpanish: {
        type: Sequelize.INTEGER,
      },
      percentPerLangFrench: {
        type: Sequelize.INTEGER,
      },
      percentPerLangItalian: {
        type: Sequelize.INTEGER,
      },
      percentPerLangJapanese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangPortuguese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangRussian: {
        type: Sequelize.INTEGER,
      },
      percentPerLangSimplifiedChinese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangEnglish: {
        type: Sequelize.INTEGER,
      },
      percentPerLangKorean: {
        type: Sequelize.INTEGER,
      },
      percentPerLangTraditionalChinese: {
        type: Sequelize.INTEGER,
      },
      // priceRange0And0Point25: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange0Point25And0Point5: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange0Point5And1: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange1And1Point5: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange1Point5And2: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange2And2Point5: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange2Point5And3: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange3And3Point5: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange3Point5And4: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange4Point5And5: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange5And6: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange6And7: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange7And8: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange8And9: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange9And10: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange10And11: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange11And12: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange12And13: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange13And14: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange14And15: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange15And16: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange16And17: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange17And18: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange18And19: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange19And20: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange20And21: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange21And22: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange22And23: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange23And24: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange24And25: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange25And26: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange26And27: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange27And28: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange28And29: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange29And30: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange30And32: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange32And34: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange34And36: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange36And38: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange38And40: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange40And42: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange42And44: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange44And46: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange46And48: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange48And50: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange50And52: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange52And54: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange56And58: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange58And60: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange60And63: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange63And66: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange66And69: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange69And72: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange72And75: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange75And78: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange78And81: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange81And84: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange84And87: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange87And90: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange90And93: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange93And96: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange96And100: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange100And105: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange105And110: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange110And115: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange115And125: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange125And130: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange135And140: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange140And145: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange145And150: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange150And155: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange155And160: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange160And165: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange165And170: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange170And175: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange175And180: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange180And185: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange185And190: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange190And195: {
      //   type: Sequelize.INTEGER,
      // },
      // priceRange195And200: {
      //   type: Sequelize.INTEGER,
      // },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("snapshot_params");
  },
};
