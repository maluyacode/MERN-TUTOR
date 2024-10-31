const app = require('./app')
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')
const cloudinary = require('cloudinary');

dotenv.config({ path: './.env' });

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server Running: http://localhost:${process.env.PORT}`)
})