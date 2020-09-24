const { Sequelize } = require("sequelize");

async function connect() {
  // Option 1: Passing a connection URI
  const sequelize = new Sequelize(
    `mysql://${process.env.LOGIN_DB}:${process.env.PWD_DB}@localhost:3306/blogbackend`
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  // const { User, Blogpost } = require("./models/index");
  // const users = await User.findAll();
  // console.log("hey", users);

  // const shouldBeYoann = await User.findOne({
  //   where: {
  //     id: 1,
  //   },
  // });
}

module.exports = { connect };
