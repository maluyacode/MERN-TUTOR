const Order = require('../models/Order');
const Product = require('../models/Product')
const notify = require('../utils/notify')

exports.create = async (req, res, next) => {

    try {

        req.body.user = req.user._id;

        const order = await Order.create(req.body);

        const orderItems = order.order_items;

        for (index in orderItems) {

            const product = await Product.findById(orderItems[index].product)

            const updatedStock = product.stock_quantity - orderItems[index].quantity;

            product.stock_quantity = updatedStock;

            product.save();

        }

        res.json({
            message: "Order created!",
        })

    } catch (err) {
        console.log(err)
    }

}

exports.all = async (req, res, next) => {
    try {

        const orders = await Order.find()
            .populate({
                path: 'order_items.product',
                select: 'name images sell_price'
            })
            .populate({
                path: 'user',
                select: 'username email images',
            });

        res.json({
            message: "Orders list!",
            orders: orders,
        })

    } catch (err) {
        console.log(err)
    }
}

exports.updateStatus = async (req, res, next) => {
    try {

        const newStatus = req.body.status;

        const order = await Order.findById(req.params.id);
        order.status = newStatus;
        order.save();

        await order.populate('user');

        console.log(order.user.notificatinToken);

        notify.sendMessage({
            user: req.user,
            title: 'Order Updated',
            body: `${order.status} Order ID: ${order._id}`,
            tokens: [order.user.notificatinToken],
        })

        // TODO: send email when status is updated

        res.json({
            message: "Order status updated!",
            order: order,
        })

    } catch (err) {
        console.log(err)
    }
}