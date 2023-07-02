const pool = require("../config/db");
const addSpecialist = async (req, res) => {
  try {
    const {
      spec_last_name,
      spec_first_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_photo_number,
      spec_info,
      spec_is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_birth_day,
      show_photo,
      show_social,
      show_info,
      show_phone_number,
    } = req.body;

    const newSpecialist = await pool.query(
      `
        INSERT INTO specialist (spec_last_name,spec_first_name,spec_middle_name,spec_birth_day,spec_photo,spec_photo_number,spec_info,spec_is_active,show_position,show_last_name,show_first_name,show_middle_name,show_birth_day,show_photo,show_social,show_info,show_phone_number)
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *
        `,
      [
        spec_last_name,
        spec_first_name,
        spec_middle_name,
        spec_birth_day,
        spec_photo,
        spec_photo_number,
        spec_info,
        spec_is_active,
        show_position,
        show_last_name,
        show_first_name,
        show_middle_name,
        show_birth_day,
        show_photo,
        show_social,
        show_info,
        show_phone_number,
      ]
    );
    console.log(newSpecialist);
    res.status(200).json(newSpecialist.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getSpecialist = async (req, res) => {
  try {
    const specialists = await pool.query(`select * from specialist`);
    res.status(200).send(specialists.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getSpecialistById = async (req, res) => {
  try {
    const id = req.params.id;
    const specialist = await pool.query(
      `
              select * from specialist where id = $1
              `,
      [id]
    );
    res.status(200).send(specialist.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const deleteSpecialist = async (req, res) => {
  try {
    const id = req.params.id;
    const specialists = await pool.query(
      `DELETE FROM specialist WHERE id = $1`,
      [id]
    );
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateSpecialist = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      spec_last_name,
      spec_first_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_photo_number,
      spec_info,
      spec_is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_birth_day,
      show_photo,
      show_social,
      show_info,
      show_phone_number,
    } = req.body;

    const newSpecialist = await pool.query(
      `
        UPDATE specialist set spec_last_name = $1,
        spec_first_name = $2,
        spec_middle_name = $3,
        spec_birth_day = $4,
        spec_photo = $5,
        spec_photo_number = $6,
        spec_info = $7,
        spec_is_active = $8,
        show_position = $9,
        show_last_name = $10,
        show_first_name = $11,
        show_middle_name = $12,
        show_birth_day = $13,
        show_photo = $14,
        show_social = $15,
        show_info = $16,
        show_phone_number = $17,
            RETURNING *
        `,
      [
        spec_last_name,
        spec_first_name,
        spec_middle_name,
        spec_birth_day,
        spec_photo,
        spec_photo_number,
        spec_info,
        spec_is_active,
        show_position,
        show_last_name,
        show_first_name,
        show_middle_name,
        show_birth_day,
        show_photo,
        show_social,
        show_info,
        show_phone_number,
        id,
      ]
    );
    res.status(200).json(newSpecialist.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addSpecialist,
  getSpecialist,
  getSpecialistById,
  updateSpecialist,
  deleteSpecialist,
};
