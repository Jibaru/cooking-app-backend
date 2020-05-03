﻿// ====================
//  Port
// ====================
process.env.PORT = process.env.PORT || 3000;


// ====================
// Enviroment
// ====================
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// ====================
// Token Expire
// ====================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.TOKEN_EXPIRES = '48h';

// ====================
// Auth Seed
// ====================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ====================
// DB
// ====================
// let urlDB = (process.env.NODE_ENV === 'dev')
//    ? 'mongodb://localhost:27017/cafe'
//    : process.env.MONGO_URI;

//process.env.URLDB = urlDB;

// ====================
// Google Client Id
// ====================
// process.env.CLIENT_ID = '474558847469-ihbpniq9vnll1j2262pn5brpqts7hbe7.apps.googleusercontent.com';

// ESTABLECER EN HEROKU
// heroku config:set VARIABLE_ENTORNO="valor"