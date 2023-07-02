const pool = require("../config/db");
const addOtp = async (req, res) => {
  try {
    const { id,otp, expiration_time, verified } = req.body;

    const newOtp = await pool.query(
      `
        INSERT INTO otp (id,otp,expiration_time,verified)
        values($1, $2, $3, $4) RETURNING *
        `,
      [id, otp, expiration_time, verified]
    );
    console.log(newOtp);
    res.status(200).json(newOtp.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getOtp = async (req, res) => {
  try {
    const otps = await pool.query(`select * from otp`);
    res.status(200).send(otps.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getOtpById = async (req, res) => {
    try {
      const id = req.params.id;
      const otp = await pool.query(
        `
            select * from otp where id = $1
            `,
        [id]
      );
      res.status(200).send(otp.rows);
    } catch (error) {
      res.status(500).json("Serverda xatolik");
    }
  };
const deleteOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const otps = await pool.query(`DELETE FROM otp WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateOtp = async (req, res) => {
  try {
    const id = req.params.id;
    const { otp, expiration_time, verified } = req.body;

    const newOtp = await pool.query(
      `
        UPDATE otp set otp = $1,expiration_time = $2,verified = $3
            WHERE id = $4
            RETURNING *
        `,
      [otp, expiration_time, verified, id]
    );
    res.status(200).json(newOtp.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addOtp,
  getOtp,
  getOtpById,
  updateOtp,
  deleteOtp,
};