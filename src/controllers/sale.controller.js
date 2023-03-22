const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const sales = req.body;

  const { type, message } = await saleService.insert(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insert,
};