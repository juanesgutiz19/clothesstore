const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const GetMostWantedProducts = async(req, res = response) => {

    const sortedProducts = await Product.find({}, 'picture name numberOfVisits')
    .populate('picture', 'urlFrontal urlBack')
    .sort( { numberOfVisits: -1} ).limit(5).exec();

    const newProducts = sortedProducts.map(function (e) {
        e = e.toJSON(); 
        e.taxAmount = 0;
        return e;
      });

    res.json({
        newProducts
    });
}

const createProducts = async(req, res = response) => {

    console.log(req.files);

    const { tempFilePath: tempFilePathFrontal } = req.files.urlFrontal;
    const { tempFilePath: tempFilePathBack } = req.files.urlBack;
    const { secure_url: urlFrontal } = await cloudinary.uploader.upload( tempFilePathFrontal, {quality: 50} );
    const { secure_url: urlBack } = await cloudinary.uploader.upload( tempFilePathBack )

    const picture = new Picture({ urlFrontal, urlBack });

    await picture.save();

    console.log(req.body);
    const { name, description, price, discountPercentage, sellingCountry } = req.body;

    const product = new Product( { name, description, price, discountPercentage, sellingCountry, picture: picture._id } );

    await product.save();
    res.json({
        product
    });
}

module.exports = {
    GetMostWantedProducts,
    createProducts
}