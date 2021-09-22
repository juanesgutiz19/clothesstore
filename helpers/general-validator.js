

const isNumeric = ( attribute, value ) => {
    if ( isNaN(parseInt(value)) ) {
        throw new Error(`El valor de ${attribute} solo puede ser numérico`);
    }
    return true;
}

const discountPercentageInBounds = ( discountPercentage ) => {
    if ( discountPercentage  < 0 || discountPercentage >= 100) {
        throw new Error(`El porcentaje de descuento debe estar en el intervalo [0, 100)`);
    }
    return true;
}

const isPositive = ( attribute, value ) => {
    if ( Number(value) < 0 ) {
        throw new Error(`El valor de ${attribute} debe ser positivo`);
    }
    return true;
}

module.exports = { isNumeric, discountPercentageInBounds, isPositive }