const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(401);
        } else {
            next();
        }
    });
}