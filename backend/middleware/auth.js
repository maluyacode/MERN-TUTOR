const User = require('../models/User');
const jwt = require('jsonwebtoken');
const admin = require('../utils/firebase')

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

const isAuthenticatedV2 = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        const { email } = decodedToken;

        req.user = await User.findOne({ email: email });

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }


}


module.exports = {
    isAuthenticated,
    isAuthenticatedV2,
}
