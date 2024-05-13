const Sequelize = require('sequelize');
const _ = require('lodash')
const db = {};

const sequelize = new Sequelize(
    "socialprofile",
    "avnadmin",
    "AVNS_XZjUBEP8_TUUOMRCpZf",
    {
        host: "mysql-ravish-goyalravish2001-276b.c.aivencloud.com",
        port: 25307,
        dialect: 'mysql'
    }
)


module.exports = _.extend(
    {
        sequelize,
        Sequelize
    },
    db
)