const { Schema, model } = require('mongoose');

const PictureSchema = Schema({
    urlFrontal: {
        type: String,
        required: [true, 'La imagen frontal es obligatoria']
    },
    urlBack: {
        type: String,
        required: [true, 'La imagen trasera es obligatoria']
    }
}, { collection: 'pictures' });

module.exports = model( 'Picture', PictureSchema );