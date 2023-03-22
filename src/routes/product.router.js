const express = require('express');
const { productController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', validateName, productController.insert);
router.put('/:id', validateName, productController.update);
router.delete('/:id', productController.deleteProduct);

module.exports = router;