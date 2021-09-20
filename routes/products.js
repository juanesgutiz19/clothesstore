const { Router } = require('express');

const { GetMostWantedProducts, createProducts } = require('../controllers/products');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.get('/mostwanted' ,GetMostWantedProducts );

router.post('/', createProducts );

module.exports = router;