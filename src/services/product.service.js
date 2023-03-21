const { productModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationsInputValues');

const findAll = async () => {
  const products = await productModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const passenger = await productModel.findById(id);
  if (!passenger) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: passenger };
};

const insert = async (name) => {
const error = validateNewProduct(name);
if (error.type) return error;

const newProductId = await productModel.insert({ name });
const newProduct = await productModel.findById(newProductId);

return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};