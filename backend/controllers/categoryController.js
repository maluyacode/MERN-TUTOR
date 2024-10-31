const Category = require('../models/Category');

exports.create = async (req, res, next) => {

    try {

        const category = await Category.create(req.body);

        res.json({
            message: "Category successfully created!",
            category: category,
        })

    } catch (error) {

        console.log(error);

    }

}

exports.getCategory = async (req, res, next) => {

    try {

        const category = await Category.findById(req.params.id);

        res.json({
            message: "Category retrieved",
            category: category,
        })

    } catch (error) {

        console.log(error);

    }

}

exports.getAllCategory = async (req, res, next) => {

    try {

        const categories = await Category.find();

        res.json({
            message: "Categories retrieved",
            categories: categories,
        })

    } catch (error) {

        console.log(error);

    }
}

exports.update = async (req, res, next) => {

    try {

        const category = await Category
            .findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Category updated!",
            category: category,
        });

    } catch (error) {

        console.log(error);

    }
}

exports.deleteCategory = async (req, res, next) => {

    try {

        await Category.findByIdAndDelete(req.params.id);

        res.json({
            message: "Category deleted successfully!",
        });

    } catch (error) {

        console.log(error);

    }

}


