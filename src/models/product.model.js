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

module.exports = {
  findAll,
  findById,
};
