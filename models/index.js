"use strict";
const path = require("path");

const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  throw result.error;
} else {
  console.log(
    "in local : DATABASE_URL_PROD=mysql://root:mbi_selling_prod@127.0.0.1/mbi_selling_database_production",
    process.env.DATABASE_URL_PROD
  );
  console.log(
    "in .env : DATABASE_URL_PROD=mysql://root:mbi_selling_prod@localhost/mbi_selling_database_production",
    process.env.DATABASE_URL_PROD
  );
}

const fs = require("fs");

const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
