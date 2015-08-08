/*
 * config_template.js
 * 
 * Use this file to fill in your own server's info.
 *
 */
exports.APP_PORT = process.env.OPENSHIFT_NODEJS_PORT || 3000;
exports.APP_IP = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";

exports.DB_CONNECTIONS = 10;
exports.DB_HOST = "";
exports.DB_NAME = "";
exports.DB_USER = "";
exports.DB_PASS = "";

exports.HIGHSCORE_SIZE = 10;