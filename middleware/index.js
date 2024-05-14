const jwt = require('jsonwebtoken');
const db = require('../config');

exports.checkAuth = async (req, res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const user = jwt.verify(token, 'secret');
      const userData = await db.sequelize.query(`select * from user where id = ? and status = "1"`, {
        replacements: [user.userId],
        type: db.sequelize.QueryTypes.SELECT
      });
      req.user = userData[0];
    } else {
      return res.status(400).json({ message: "Authorization required" });
    }
    next();
}