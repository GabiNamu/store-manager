const connection = require('./connection');

const insert = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );
  return insertId;
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT s.id as saleId, s.date, sp.product_id as productId, sp.quantity FROM sales as s 
    INNER JOIN sales_products as sp ON s.id = sp.sale_id ORDER BY s.id, sp.product_id;`,
  );
  return result;
};

const findById = async (id) => {
  const [sale] = await connection.execute(
    `SELECT s.date, sp.product_id as productId, sp.quantity FROM sales as s 
    INNER JOIN sales_products as sp ON s.id = sp.sale_id WHERE s.id = ? ;`,
    [id],
  );
  return sale;
};

module.exports = {
  insert,
  findAll,
  findById,
};
