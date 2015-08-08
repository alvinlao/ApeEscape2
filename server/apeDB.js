var mysql   = require("mysql2");
var config  = require("./config/config");

var connectionPool = mysql.createPool({
    host            : config.DB_HOST,
    database        : config.DB_NAME,
    user            : config.DB_USER,
    password        : config.DB_PASS,
    connectionLimit : config.CONNECTION_LIMIT
});


exports.getConnection = connectionPool.getConnection;
