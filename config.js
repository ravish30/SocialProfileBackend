const Sequelize = require('sequelize');
const _ = require('lodash')
const mysql2 = require('mysql2');
const db = {};

const sequelize = new Sequelize(
    "socialprofile",
    "avnadmin",
    "AVNS_XZjUBEP8_TUUOMRCpZf",
    {
        host: "mysql-ravish-goyalravish2001-276b.c.aivencloud.com",
        port: 25307,
        dialect: 'mysql',
        dialectModule: mysql2
    }
)


module.exports = _.extend(
    {
        sequelize,
        Sequelize
    },
    db
)