const { productService } = require('../services');

const findAll = async (req, res) => {
  const { type, message } = await productService.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productService.findById(id);

  if (type) return res.status(404).json({ message });

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};