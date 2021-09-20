const { Router } = require('express');
const { check } = require('express-validator');

const { GetMostWantedProducts, createProducts } = require('../controllers/products');
const { validateFields } = require('../middlewares/validate-fields');
const { validateFiles } = require('../middlewares/validate-files');

const router = Router();

router.get('/mostwanted', GetMostWantedProducts );

router.post('/',
    [
        validateFiles,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('description', 'La descripción es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check('discountPercentage', 'El porcentaje de descuento es obligatorio').not().isEmpty(),
        check('sellingCountry', 'El país de venta es obligatorio').not().isEmpty(),
        validateFields
    ], createProducts );

module.exports = router;