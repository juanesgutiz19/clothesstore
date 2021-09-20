const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const GetMostWantedProducts = (req, res = response) => {

    res.json({
        msg: 'get API - GetMostWantedProducts'
    });
}

const createProducts = async(req, res = response) => {

    const { tempFilePath: tempFilePathFrontal } = req.files.urlFrontal;
    const { tempFilePath: tempFilePathBack } = req.files.urlBack;
    const { secure_url: urlFrontal } = await cloudinary.uploader.upload( tempFilePathFrontal );
    const { secure_url: urlBack } = await cloudinary.uploader.upload( tempFilePathBack )

    const picture = new Picture({ urlFrontal, urlBack });

    // const pictureDB = await picture.save();
    await picture.save();

    console.log(req.body);
    const { name, description, price, discountPercentage, sellingCountry } = req.body;

    const product = new Product( { name, description, price, discountPercentage, sellingCountry, picture: picture._id } );

    await product.save();
    res.json({
        msg: 'post API - createProducts',
        product
    });
}

module.exports = {
    GetMostWantedProducts,
    createProducts
}