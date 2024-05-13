const jwt = require('jsonwebtoken');

module.exports = {
    async generateJwtToken(userId) {
        return jwt.sign({ userId }, 'secret', { expiresIn: '1d' });
    }
}