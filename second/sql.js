
const config = require('./config');

const knex = require('knex')({
    client: config.client,//配置哪个类型的数据库 如MySql
    connection: {
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    },
    pool: {
        min: 0,
        max: 8,
        acquireTimeoutMillis: 100000,
        evictionRunIntervalMillis: 120000,
        maxWaitingClients: 100,
        idleTimeoutMillis: 100000
    }
});
module.exports = knex;
