
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const { setDiscountPriceToProducts } = require('../helpers/products-utils');
const { uploadFilesToCloudinary } = require('../helpers/files-utils');

const GetMostWantedProducts = async(req, res = response) => {

    const { limit = 10 } = req.query;

    try {
        const sortedProducts = await Product.find({}, 'price discountPercentage picture name numberOfVisits')
        .populate('picture', 'urlFrontal urlBack')
        .sort( { numberOfVisits: -1 } ).limit(Number(limit)).exec();

        const productsWithDiscount = setDiscountPriceToProducts(sortedProducts);

        res.status(200).json({
            productsWithDiscount
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createProducts = async(req, res = response) => {

    const { tempFilePath: tempFilePathFrontal, size: sizeFrontal } = req.files.urlFrontal;
    const { tempFilePath: tempFilePathBack , size: sizeBack} = req.files.urlBack;

    try {
        let urlBack;
        let urlFrontal;

        urlFrontal = await uploadFilesToCloudinary( tempFilePathFrontal, sizeFrontal );
        urlBack = await uploadFilesToCloudinary( tempFilePathBack, sizeBack );
        
        const picture = new Picture({ urlFrontal, urlBack });

        await picture.save();

        const { name, description, price, discountPercentage, sellingCountry } = req.body;

        const product = new Product( { name, description, price, discountPercentage, sellingCountry, picture: picture._id } );

        await product.save();

        res.status(201).json({
            product
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

module.exports = {
    GetMostWantedProducts,
    createProducts
}