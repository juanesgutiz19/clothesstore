const { response, request } = require('express');

const GetMostWantedProducts = (req, res = response) => {

    res.json({
        msg: 'get API - GetMostWantedProducts'
    });
}

const createProducts = (req, res = response) => {

    //TODO: Queda pendiente ver cómo se reciben las dos imágenes (BACK y FRONT)
    const { name, description, price, discountPercentage, sellingCountry } = req.body;

    res.json({
        msg: 'post API - createProducts',
        name, 
        description,
        price,
        discountPercentage,
        sellingCountry
    });
}

module.exports = {
    GetMostWantedProducts,
    createProducts
}