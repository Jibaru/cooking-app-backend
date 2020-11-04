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
