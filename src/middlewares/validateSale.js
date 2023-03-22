module.exports = async (req, res, next) => {
  const sales = req.body;

  const validationP = sales.some((sale) => !sale.productId);
  const validationQ = sales.some(
    (sale) => sale.quantity === undefined && sale.quantity !== Number('0'),
  );
  
  if (validationP) return res.status(400).json({ message: '"productId" is required' });
  if (validationQ) return res.status(400).json({ message: '"quantity" is required' });
  return next();
};