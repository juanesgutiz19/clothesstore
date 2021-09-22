const { Router } = require('express');
const { check } = require('express-validator');

const { GetMostWantedProducts, createProducts } = require('../controllers/products');
const { validateFields } = require('../middlewares/validate-fields');
const { validateFiles } = require('../middlewares/validate-files');
const { validateLimit } = require('../middlewares/validate-limit');
const { validateDiscount } = require('../middlewares/validate-discount');

const { isCountryValid } = require('../helpers/db-validators');
const { isNumeric, discountPercentageInBounds, isPositive } = require('../helpers/general-validator');

const router = Router();

router.get('/mostwanted', validateLimit, GetMostWantedProducts );

router.post('/',
    [
        validateFiles,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('price').custom( p => isNumeric('precio', p) ),
        check('price').custom( p => isPositive('precio', p) ),
        check('discountPercentage', 'El porcentaje de descuento es obligatorio').not().isEmpty(),
        check('discountPercentage').custom( d => isNumeric('discountPercentage', d) ),
        check('discountPercentage').custom(  discountPercentageInBounds ),
        check('sellingCountry', 'El país de venta es obligatorio').not().isEmpty(),
        check('sellingCountry').custom( isCountryValid ),
        validateFields,
        validateDiscount
    ], createProducts );

module.exports = router;