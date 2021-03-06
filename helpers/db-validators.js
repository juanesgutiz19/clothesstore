const Country = require('../models/country');

const isCountryValid = async(code = '') => {

    const existsCountry = await Country.findOne({ code });
    if ( !existsCountry ) {
        throw new Error(`El país con código ${ code } no está registrado en la base de datos, revise ISO 3166-1`);
    }
}

module.exports = { isCountryValid }