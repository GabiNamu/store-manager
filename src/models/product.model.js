const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return result; 
};

const findById = async (id) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );
  return passenger;
};

const insert = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );
  return insertId;
};

const update = async (name, id) => {
  const [{ insertId }] = await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?', [name, id],
  );
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};
