const Sequelize = require("sequelize");
const pkg = require("../../package.json");

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const config = {
  logging: false,
};

if (process.env.LOGGING) {
  delete config.logging;
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
const user = "postgres";
const host = "database-1-instance-1.cgtwy4o8u5lb.us-east-1.rds.amazonaws.com";
const database = "graceshoppernftdatabase";
const password = "Graceshopper5#";
const port = "5432";

const db = new Sequelize(
  // `postgres://database-1-instance-1.cgtwy4o8u5lb.us-east-1.rds.amazonaws.com:5432/graceshoppernftdatabase`,
  // {
  //   dialect: "postgres",
  //   // anything else you want to pass
  // }
  database,
  user,
  password,
  {
    host,
    port,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = db;
