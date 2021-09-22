const { response } = require("express")
const Product = require('../models/product');

const validateLimit = async(req, res = response, next ) => {
    const { limit = 10 } = req.query;
    const totalProducts = await Product.countDocuments();
    if(limit < 1) {
        return res.status(400).json({
            msg: 'El query param limit debe ser un número mayor a cero'
        });
    }
    if (limit > totalProducts) {
        return res.status(400).json({
            msg: 'El query param limit es mayor que el número de productos totales'
        });
    } 

    next();
}

module.exports = {
    validateLimit
}
