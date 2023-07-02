const pool = require("../config/db");
const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;

    const newService = await pool.query(
      `
        INSERT INTO service (service_name, service_price)
        values($1, $2) RETURNING *
        `,
      [service_name, service_price]
    );
    console.log(newService);
    res.status(200).json(newService.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

const getService = async (req, res) => {
  try {
    const services = await pool.query(`select * from service`);
    res.status(200).send(services.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const getServiceById = async (req, res) => {
  try {
    const id = req.params.id;
    const service = await pool.query(
      `
            select * from service where id = $1
            `,
      [id]
    );
    res.status(200).send(service.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const services = await pool.query(`DELETE FROM service WHERE id = $1`, [
      id,
    ]);
    res.status(200).json("Successfully deleted");
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};

const updateService = async (req, res) => {
  try {
    const id = req.params.id;
    const { service_name, service_price } = req.body;

    const newService = await pool.query(
      `
        UPDATE service set service_name = $2, service_price = $2
        WHERE id = $3
            RETURNING *
        `,
      [service_name, service_price, id]
    );
    res.status(200).json(newService.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
  }
};

module.exports = {
  addService,
  getService,
  getServiceById,
  updateService,
  deleteService,
};
