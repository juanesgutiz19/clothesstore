
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require('express');

const Product = require('../models/product');
const Picture = require('../models/picture');

const { setDiscountPriceToProducts } = require('../helpers/products-utils');
const { fileIsGreaterThan1MB } = require('../helpers/files-utils');

const GetMostWantedProducts = async(req, res = response) => {

    const { limit = 10  } = req.query;

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
        if ( fileIsGreaterThan1MB(sizeFrontal) && fileIsGreaterThan1MB(sizeBack)){
            const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal, { quality: 50 } );
            const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack, { quality: 50 } );
            urlFrontal = frontal;
            urlBack = back;
        } else if (fileIsGreaterThan1MB(sizeFrontal)){
            const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal, { quality: 50 } );
            const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack );
            urlFrontal = frontal;
            urlBack = back;
        } else if(fileIsGreaterThan1MB(sizeBack)){
            const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack, { quality: 50 } );
            const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal);
            urlBack = back;
            urlFrontal = frontal;
        }else {
            const { secure_url: frontal } = await cloudinary.uploader.upload( tempFilePathFrontal );
            const { secure_url: back } = await cloudinary.uploader.upload( tempFilePathBack );
            urlFrontal = frontal;
            urlBack = back;
        }

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