const { saleProductModel, saleModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputValues');
const { validateId } = require('./validations/validationsInputValues');

const insert = async (sales) => {
  const error = await validateNewSale(sales);
  if (error.type) return error;

  const saleId = await saleModel.insert();
  await Promise.all(
    sales.map(async (sale) => saleProductModel.insert(sale, saleId)),
  );

  const newSale = await saleProductModel.findById(saleId);
  console.log(newSale);

  return { type: null, message: { id: saleId, itemsSold: newSale } };
};

const findAll = async () => {
  const products = await saleModel.findAll();
  return { type: null, message: products };
};

const findById = async (id) => {
  const error = validateId(id);

  if (error.type) return error;

  const sale = await saleModel.findById(id);
  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  return { type: null, message: sale };
};

const deleteSale = async (id) => {
  const error = validateId(id);
  if (error.type) return error;

  const sale = await saleModel.findById(id);

  if (sale.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  await saleModel.deleteSale(id);
  await saleProductModel.deleteSale(id);
  return { type: null, message: '' };
};

const update = async (sale, id) => {
  const error = await validateNewSale(sale);
  const err = validateId(id);

  if (error.type) return error;
  if (err.type) return error;

  const saleExists = await saleModel.findById(id);
  if (saleExists.length === 0) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
   await Promise.all(
    sale.map(async (s) => saleProductModel.update(s, id)),
   );
  const updatedSale = await saleProductModel.findById(id);

  return { type: null, message: { saleId: id, itemsUpdated: updatedSale } };
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteSale,
  update,
};