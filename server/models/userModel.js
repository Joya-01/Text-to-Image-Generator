// models/UserModel.js
import client from "../config/postgre.js";

const User = {
  create: async ({ name, email, password, creditBalance = 5 }) => {
    const query = `
      INSERT INTO users (name, email, password, credit_balance)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const values = [name, email, password, creditBalance];
    const res = await client.query(query, values);
    return res.rows[0];
  },

  findAll: async () => {
    const res = await client.query("SELECT * FROM users");
    return res.rows;
  },

  findByEmail: async (email) => {
    const res = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    return res.rows[0];
  },

  findById: async (id) => {
    const res = await client.query("SELECT * FROM users WHERE id = $1", [id]);
    return res.rows[0];
  },

  updateCreditBalance: async (userId, amount) => {
    const query = `
      UPDATE users
      SET credit_balance = credit_balance + $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [amount, userId];
    const res = await client.query(query, values);
    return res.rows[0];
  }
};

export default User;
