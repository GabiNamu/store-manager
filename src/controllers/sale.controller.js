const { saleService } = require('../services');
const errorMap = require('../utils/errorMap');

const insert = async (req, res) => {
  const sales = req.body;

  const { type, message } = await saleService.insert(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const findAll = async (req, res) => {
  const { type, message } = await saleService.findAll();

  if (type) return res.status(errorMap.mapError(type)).json(message);

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.findById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await saleService.deleteSale(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).end();
};

const update = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const { type, message } = await saleService.update(sale, id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  insert,
  findAll,
  findById,
  deleteSale,
  update,
};