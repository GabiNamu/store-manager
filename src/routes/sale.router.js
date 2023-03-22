const express = require('express');
const { saleController } = require('../controllers');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.post('/', validateSale, saleController.insert);

module.exports = router;