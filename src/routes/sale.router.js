const express = require('express');
const { saleController } = require('../controllers');
const validateSale = require('../middlewares/validateSale');

const router = express.Router();

router.get('/', saleController.findAll);
router.get('/:id', saleController.findById);
router.post('/', validateSale, saleController.insert);
router.delete('/:id', saleController.deleteSale);

module.exports = router;