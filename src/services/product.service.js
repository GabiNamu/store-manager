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

const update = async (name, id) => {
  const error = validateNewProduct(name);
  const err = validateId(id);
  if (error.type) return error;
  if (err.type) return error;

  const product = await productModel.findById(id);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productModel.update(name, id);
  const updatedProduct = await productModel.findById(id);
  return { type: null, message: updatedProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};