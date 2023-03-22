const { saleProductModel, saleModel } = require('../models');
const { validateNewSale } = require('./validations/validationsInputValues');

const insert = async (sales) => {
  const error = await validateNewSale(sales);
  console.log(error);
  console.log(error.type);
  console.log(error.message);
  if (error.type) return error;

  const saleId = await saleModel.insert();
   await Promise.all(
    sales.map(async (sale) => saleProductModel.insert(sale, saleId)),
  );
  
  const newSale = await saleProductModel.findById(saleId);
  const formatNewSale = newSale
    .map((sale) => ({ productId: sale.product_id, quantity: sale.quantity }));

  return { type: null, message: { id: saleId, itemsSold: formatNewSale } };
};

module.exports = {
  insert,
};