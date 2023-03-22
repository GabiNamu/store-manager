const connection = require('./connection');

const insert = async (sale, id) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [id, sale.productId, sale.quantity],
  );
  return insertId;
};

const findById = async (id) => {
  const [product] = await connection.execute(
    'SELECT product_id, quantity FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return product;
};

module.exports = {
  insert,
  findById,
};