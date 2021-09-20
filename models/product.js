const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    discountPercentage: {
        type: Number,
        required: [true, 'El porcentaje de descuento es obligatorio']
    },
    numberOfVisits: {
        type: Number,
        required: [true, 'El número de visitas es obligatorio'],
        default: 0
    },
    picture: {
        type: Schema.Types.ObjectId,
        ref: 'Picture',
        required: [true, 'Las imágenes tanto frontal como trasera son obligatorias']
    },
    sellingCountry: {
        type: String,
        required: [true, 'El país de venta es obligatorio']
    }
}, { collection: 'products' });

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.pid = _id;
    return product;
}

module.exports = model( 'Producto', ProductSchema );