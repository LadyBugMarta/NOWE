const User = require('../Models/user');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require("../Utils/auth");
const { required } = require("../Utils/validation");

exports.signup = async (req, res, next) => {
    let { username, password, password_confirmation } = req.body;
    if (!required(req.body, ['username', 'password', 'password_confirmation'])) {
        return res.sendStatus(400);
    }

    if (password !== password_confirmation) {
        return res.sendStatus(400);
    }

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            return res.sendStatus(409);
        } else {
            const user = new User({
                username: username,
                password: password,
            });

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    const response = await user.save();
                    res.status(200).json({
                        success: true,
                        result: response
                    })
                });
            });
        }
    } catch (err) {
        res.sendStatus(500);
    }
}
exports.signin = async (req, res) => {
    let { username, password } = req.body;
    if (!required(req.body, ['username', 'password'])) {
        return res.sendStatus(400);
    }

    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.sendStatus(404);
        } else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.sendStatus(400);
            }
            let access_token = createJWT(
                user.email,
                user._id,
                3600
            );
            jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
                decoded) => {
                if (err) {
                    res.sendStatus(500);
                }
                if (decoded) {
                    return res.status(200).json({
                        success: true,
                        token: access_token,
                        message: user
                    });
                }
            });
        }
    } catch (err) {
        res.sendStatus(500);
    }
}


