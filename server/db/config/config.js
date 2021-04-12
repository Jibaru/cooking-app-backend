module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: "0",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      encrypt: true,
      packetSize: 32768,
    },
  },
  test: {
    username: "root",
    password: "root",
    database: "cooking-test-db",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
};
