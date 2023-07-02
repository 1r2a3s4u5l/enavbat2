const pool = require("../config/db");
const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_photo_number,
      admin_hashed_password,
      admin_is_active,
      admin_is_creater,
    } = req.body;

    const newAdmin = await pool.query(
      `
        INSERT INTO admin (admin_name,admin_photo_number, admin_hashed_password,admin_is_active,admin_is_creater)
        values($1, $2, $3, $4, $5) RETURNING *
        `,
      [
        admin_name,
        admin_photo_number,
        admin_hashed_password,
        admin_is_active,
        admin_is_creater,
      ]
    );
    console.log(newAdmin);
    res.status(200).json(newAdmin.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await pool.query(`select * from admin`);
    res.status(200).send(admin.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await pool.query(
      `
          select * from admin where id = $1
          `,
      [id]
    );
    res.status(200).send(admin.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      admin_name,
      admin_photo_number,
      admin_hashed_password,
      admin_is_active,
      admin_is_creater,
    } = req.body;

    const newAdmin = await pool.query(
      `
            UPDATE admin set admin_name = $1,admin_photo_number = $2,admin_hashed_password = $3,admin_is_active = $4, admin_is_creater = $5
            WHERE id = $6
            RETURNING *
        `,
      [
        admin_name,
        admin_photo_number,
        admin_hashed_password,
        admin_is_active,
        admin_is_creater,
        id,
      ]
    );
    res.status(200).json(newAdmin.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};
const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await pool.query(`DELETE FROM admin WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
