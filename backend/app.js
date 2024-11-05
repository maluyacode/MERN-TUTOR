const express = require('express');
const app = express();
const cors = require('cors');

// configs
app.use(express.json());
app.use(cors()); // to enable other origin to access our data, it's all yours mf

// import routes
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

// use routes
app.use('/category', categoryRoutes)
app.use('/product', productRoutes);
app.use('/user', userRoutes)

module.exports = app;