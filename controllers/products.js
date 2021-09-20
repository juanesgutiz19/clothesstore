const path = require('path');
const fs   = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const GetMostWantedProducts = async(req, res = response) => {

    // const products = await Product.find();

    const sortedProducts = await Product.find({}, 'picture name numberOfVisits')
    .populate('picture', 'urlFrontal urlBack')
    .sort({ numberOfVisits: -1}).limit(5).exec();


    console.log(sortedProducts);
    // console.log(typeof sortedProducts);

    // const newProducts = sortedProducts.map( obj=> ({ ...obj.name }))

    const newProducts = sortedProducts.map(function (e) {
        e = e.toJSON(); // toJSON() here.
        e.taxAmount = 0;
        return e;
      });

    res.json({
        newProducts
    });
}

const createProducts = async(req, res = response) => {

    const { tempFilePath: tempFilePathFrontal } = req.files.urlFrontal;
    const { tempFilePath: tempFilePathBack } = req.files.urlBack;
    const { secure_url: urlFrontal } = await cloudinary.uploader.upload( tempFilePathFrontal );
    const { secure_url: urlBack } = await cloudinary.uploader.upload( tempFilePathBack )


    // const [ cloud1, cloud2 ] = await Promise.all([
    //     cloudinary.uploader.upload( tempFilePathFrontal ),
    //     cloudinary.uploader.upload( tempFilePathBack )
    // ]);

    // console.log(cloud1.secure_url);
    // console.log(cloud2.secure_url);


    const picture = new Picture({ urlFrontal, urlBack });

    // const picture = new Picture( cloud1.secure_url, cloud2.secure_url );

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