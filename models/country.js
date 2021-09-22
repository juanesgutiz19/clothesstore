const { Schema, model } = require('mongoose');

const CountrySchema = Schema({
    code: {
        type: String,
        required: true,
        unique: true
    }
}, { collection: 'countries' });

module.exports = model( 'Country', CountrySchema );