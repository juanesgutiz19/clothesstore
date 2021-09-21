
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const { setDiscountPriceToProducts } = require('../helpers/products-utils');

const GetMostWantedProducts = async(req, res = response) => {

    const { limit = 10  } = req.query;
    const sortedProducts = await Product.find({}, 'price discountPercentage picture name numberOfVisits')
    .populate('picture', 'urlFrontal urlBack')
    .sort( { numberOfVisits: -1 } ).limit(Number(limit)).exec();

    const productsWithDiscount = setDiscountPriceToProducts(sortedProducts);

    res.json({
        productsWithDiscount
    });
}

const createProducts = async(req, res = response) => {

    const { tempFilePath: tempFilePathFrontal } = req.files.urlFrontal;
    const { tempFilePath: tempFilePathBack } = req.files.urlBack;
    const { secure_url: urlFrontal } = await cloudinary.uploader.upload( tempFilePathFrontal, { quality: 50 } );
    const { secure_url: urlBack } = await cloudinary.uploader.upload( tempFilePathBack )

    const picture = new Picture({ urlFrontal, urlBack });

    await picture.save();

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