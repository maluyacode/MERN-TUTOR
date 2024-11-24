const User = require('../models/User');
const { sendToken } = require('../utils/jwtToken');
const upload = require('../utils/upload')


exports.saveToken = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id);

        user.notificatinToken = req.body.token;

        user.save();

        res.json({
            message: "Notification token saved",
        })

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.register = async (req, res, next) => {
    try {

        req.body.images = await upload.multiple(req.files);

        const user = await User.create(req.body);

        res.json({
            message: "Account created",
            user,
        })

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.login = async (req, res, next) => {

    try {

        const { password, email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.json({
                message: "This email is not registered yet!"
            })
        }

        if (!await user.comparePassword(password)) {
            return res.json({
                message: "Incorrect credentials"
            })
        }

        sendToken(user, res);

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.update = async (req, res, next) => {
    try {

        if (req.files) {
            req.body.images = await upload.multiplev2(req.files);
        } else {
            delete req.body.images
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "successfully updated",
            user: user,
        })

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.resetPassword = async (req, res, next) => {
    try {

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.getSingle = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)

        return res.json({
            message: "successfully updated",
            user: user,
        })

    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
} 