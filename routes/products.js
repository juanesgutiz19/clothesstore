const { Router } = require('express');

const { GetMostWantedProducts, createProducts } = require('../controllers/products');
const { validateFields } = require('../middlewares/validate-fields');
const { check } = require('express-validator');
const router = Router();

router.get('/mostwanted', GetMostWantedProducts );

router.post('/',
    [
        check('name', 'El name es obligatorio').not().isEmpty(),
        validateFields
    ], createProducts );

module.exports = router;