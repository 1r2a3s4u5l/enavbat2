const pool = require("../config/db");
const addQueue = async (req, res) => {
  try {
    const { spec_service_id, queue_date_time, queue_number, client_id } =
      req.body;

    const newQueue = await pool.query(
      `
        INSERT INTO queue (spec_service_id,queue_date_time,queue_number,client_id)
        values($1, $2, $3, $4) RETURNING *
        `,
      [spec_service_id, queue_date_time, queue_number, client_id]
    );
    console.log(newQueue);
    res.status(200).json(newQueue.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getQueue = async (req, res) => {
  try {
    const queue = await pool.query(`select * from queue`);
    res.status(200).send(queue.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getQueueById = async (req, res) => {
    try {
      const id = req.params.id;
      const queue = await pool.query(
        `
            select * from queue where id = $1
            `,
        [id]
      );
      res.status(200).send(queue.rows);
    } catch (error) {
      res.status(500).json("Serverda xatolik");
    }
  };
const deleteQueue = async (req, res) => {
  try {
    const id = req.params.id;
    const queue = await pool.query(`DELETE FROM queue WHERE id = $1`, [id]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateQueue = async (req, res) => {
  try {
    const id = req.params.id;
    const { spec_service_id, queue_date_time, queue_number, client_id } =
      req.body;

    const newQueue = await pool.query(
      `
        UPDATE queue set spec_service_id = $1,queue_date_time = $2,queue_number = $3,client_id = $4
            WHERE id = $5
            RETURNING *
        `,
      [spec_service_id, queue_date_time, queue_number, client_id, id]
    );
    res.status(200).json(newQueue.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addQueue,
  getQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
};