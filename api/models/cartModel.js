// Trabajamos todo lo que tiene que ver con los datos de people en la base de datos
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "e-commerce",
  connectionLimit: 5,
});

const getCart = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query("SELECT * FROM carrito");

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const addToCart = async (product) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query(
      "INSERT INTO carrito(id, unitCost, currency, name, count, image) VALUE(?, ?, ?, ?, ?,?)",
      [
        product.id,
        product.unitCost,
        product.currency,
        product.name,
        product.count,
        product.image,
      ]
    );

    return { id: parseInt(response.insertId), ...product };
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const updateCart = async (count, id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query("UPDATE carrito SET count=? WHERE id=?", [
      count,
      id,
    ]);

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

const deleteCartProduct = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const response = await conn.query("DELETE FROM carrito WHERE id=?", [id]);

    return response;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release(); //release to pool
  }

  return false;
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  deleteCartProduct,
};
