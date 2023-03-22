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
    'SELECT product_id as productId, quantity FROM sales_products WHERE sale_id = ?',
    [id],
  );
  return product;
};

const deleteSale = async (id) => {
  await connection.execute('DELETE FROM sales_products WHERE sale_id = ?',
    [id]);
};

const update = async (sale, id) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ? ',
    [sale.quantity, id, sale.productId],
  );
  return insertId;
};

module.exports = {
  insert,
  findById,
  deleteSale,
  update,
};