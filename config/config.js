const path = require("path");
const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  throw result.error;
}

module.exports = {
  development: {
    username: process.env.LOGIN_DB,
    password: process.env.PWD_DB,
    database: process.env.DB_DEV,
    host: "127.0.0.1",
    dialect: "mysql",
    pool: {
      max: 50,
      min: 0,
      idle: 10000,
      acquire: 500000,
    },
  },
  test: {
    username: "root",
    password: null,
    database: "mbi_selling_database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    use_env_variable: "NOM ENV VARIABLE",
  },
  production: {
    username: process.env.LOGIN_DB,
    password: process.env.PWD_DB,
    database: process.env.DB_PROD,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
