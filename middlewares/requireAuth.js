const jwt = require('jsonwebtoken');
const config = require('config');

function requireAuth(req, res, next) {
    const token = req.cookies.portfolioJWT;
    if (!token) return res.status(401).send('Access denied. No token provided...');

    try {
        req.currentUser = jwt.verify(token, config.get('jwtPrivateKey'));
        next();

    } catch (e) {
        res.status(400).send('Invalid token..');
    }
}

module.exports = requireAuth;