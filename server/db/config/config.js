module.exports = {
  development: {
    username: "root",
    password: "root",
    database: "cooking-dev-db",
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
    username: "root",
    password: "root",
    database: "cooking-prod-db",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
};