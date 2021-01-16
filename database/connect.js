const { Sequelize } = require("sequelize");

async function connect() {
  // Option 1: Passing a connection URI
  const sequelize = new Sequelize(
    `mysql://${process.env.LOGIN_DB}:${process.env.PWD_DB}@localhost:3306/mbi_selling_database_development`
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { connect };
