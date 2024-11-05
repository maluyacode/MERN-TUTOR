const Product = require('../models/Product');
const cloudinary = require('cloudinary');
const upload = require('../utils/upload');

exports.create = async (req, res, next) => {

    try {
        req.body.images = await upload.multiple(req.files);

        const product = await Product.create(req.body);

        res.json({
            message: "Product Successfully Created!",
            product: product,
        })

    } catch (error) {

        res.json({
            message: "System error occured"
        })
        console.log(error);

    }
}

exports.update = async (req, res, next) => {

    try {

        const images = req.files;

        req.body.images = await upload.multiple(req.files);

        if (images.length === 0) {
            delete req.body.images
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        return res.json({
            message: "Product successfully updated!",
            product: product,
        })

    } catch (error) {
        console.log(error);
        return res.json({
            message: 'System error occured',
            success: false,
        })
    }

}

exports.getSingle = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate({
                path: 'category',
                model: 'Category'
            });

        return res.json({
            message: 'Product available',
            product: product,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured',
            success: false,
        })

    }

}

exports.all = async (req, res, next) => {

    try {

        const products = await Product.find().populate({
            path: 'category',
            model: 'Category'
        });

        return res.json({
            message: 'All available products',
            products: products,
        })

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured',
            success: false,
        })

    }

}

exports.delete = async (req, res, next) => {
    try {

        await Product.findByIdAndDelete(req.params.id);

        res.json({
            message: "Product deleted successfully!",
        });

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured!',
            success: false,
        })
    }
}

exports.bulkDelete = async (req, res, next) => {
    try {

        await Product.deleteMany({
            _id: {
                $in: req.body.productIds,
            }
        });

        res.json({
            message: "Products deleted successfully!",
        });

    } catch (error) {

        console.log(error);

        return res.json({
            message: 'System error occured!',
            success: false,
        })
    }
}