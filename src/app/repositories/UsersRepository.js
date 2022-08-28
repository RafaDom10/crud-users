const db = require('../../database');

class UsersRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
      SELECT users.*
      FROM users
      ORDER BY users.name ${direction}
    `);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT users.*
      FROM users
      WHERE users.id = $1`, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query(`
      SELECT * FROM users WHERE email = $1`, [email]);
    return row;
  }

  async create({
    name, email, phone, cpf, birthDate, genre,
  }) {
    const [row] = await db.query(`
      INSERT INTO users(name, email, phone, cpf, birthDate, genre)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, email, phone, cpf, birthDate, genre]);

    return row;
  }

  async update(id, {
    name, email, phone, cpf, birthDate, genre,
  }) {
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, email = $2, phone = $3, cpf = $4, birthDate = $5, genre = $6
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, cpf, birthDate, genre, id]);

    return row;
  }

  async delete(id) {
    const deleteOp = await db.query(`
      DELETE FROM users
      WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new UsersRepository();
