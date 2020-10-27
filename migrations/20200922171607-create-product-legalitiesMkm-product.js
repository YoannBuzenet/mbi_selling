module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ProductLegalitiesMkmProducts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      productLegalities_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "productLegalities",
          key: "id",
        },
      },
      MkmProduct_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "MkmProducts",
          key: "id",
        },
      },
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ProductLegalitiesMkmProducts");
  },
};
