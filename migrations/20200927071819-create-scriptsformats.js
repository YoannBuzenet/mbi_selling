module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ScriptsFormats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      script_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Scripts",
          key: "id",
        },
      },
      format_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Formats",
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
    return queryInterface.dropTable("ScriptsFormats");
  },
};
