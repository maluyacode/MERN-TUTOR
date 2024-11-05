const User = require('../models/User');
const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {

    if (req.headers.authorization) {
        // Bearer 092u3j0ineg[n4-9]
        req.cookies = {
            token: req.headers.authorization.split(" ")[1]
        }
    }

    const token = req.cookies?.token


    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(data.id);

    next()

}

module.exports = {
    isAuthenticated,
}
