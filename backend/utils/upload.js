const cloudinary = require('cloudinary');

const multiple = async (files) => {

    let imagesData = [];

    for (let i = 0; i < files.length; i++) {

        const data = await cloudinary.v2.uploader.upload(files[i].path);

        imagesData.push({

            public_id: data.public_id,

            url: data.url,

        })

    };

    return imagesData;

}

module.exports = {
    multiple,
}