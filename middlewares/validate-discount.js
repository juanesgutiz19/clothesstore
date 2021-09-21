const { response } = require("express")

const validateDiscount = (req, res = response, next) => {
    
    const { discountPercentage, sellingCountry } = req.body;
    if ( ((sellingCountry === 'CO' ||  sellingCountry === 'MX') && discountPercentage > 50) || ((sellingCountry === 'CL' ||  sellingCountry === 'PE') && discountPercentage > 30)){
        return res.status(400).json({
            msg: `El porcentaje de descuento ${ discountPercentage }% no es válido para el país con código ${sellingCountry}`
        });
    }
    next();
}

module.exports = {
    validateDiscount
}
