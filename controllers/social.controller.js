const pool = require("../config/db");
const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;

    const newSocial = await pool.query(
      `
        INSERT INTO social (social_name, social_icon_file)
        values($1, $2) RETURNING *
        `,
      [social_name, social_icon_file]
    );
    console.log(newSocial);
    res.status(200).json(newSocial.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getSocial = async (req, res) => {
  try {
    const social = await pool.query(`select * from social`);
    res.status(200).send(social.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getSocialById = async (req, res) => {
    try {
      const id = req.params.id;
      const social = await pool.query(
        `
                select * from social where id = $1
                `,
        [id]
      );
      res.status(200).send(social.rows);
    } catch (error) {
      res.status(500).json("Serverda xatolik");
    }
  };
const deleteSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const social = await pool.query(`DELETE FROM social WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const { social_name, social_icon_file } = req.body;

    const newSocial = await pool.query(
      `
        UPDATE social set social_name = $1, social_icon_file = $2
            WHERE id = $3
            RETURNING *
        `,
      [
        social_name,
        social_icon_file,
        id,
      ]
    );
    res.status(200).json(newSocial.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addSocial,
  getSocial,
  getSocialById,
  updateSocial,
  deleteSocial,
};