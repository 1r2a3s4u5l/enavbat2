const pool = require("../config/db");
const addClient = async (req, res) => {
  try {
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;

    const newClient = await pool.query(
      `
        insert into client (client_last_name,client_first_name,client_phone_number,client_info,client_photo)
        values($1,$2,$3,$4,$5) returning *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
      ]
    );
    console.log(newClient);
    res.status(200).json(newClient.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serverda xatolik");
  }
};
const getClient = async (req, res) => {
  try {
    const client = await pool.query(
      `
        select * from client
        `
    );
    console.log(client);
    res.status(200).json(client.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serverda xatolik");
  }
};
const getClientById = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send({ massage: "invalid id" });
    }
    const client = await pool.query(
      `
        select * from client where id = $1
        `,
      [id]
    );
    if (client.rowCount == 0) {
      return res.status(400).send({ massage: "id is not defined" });
    }
    res.status(200).send(client.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
  }
};
const updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      client_last_name,
      client_first_name,
      client_phone_number,
      client_info,
      client_photo,
    } = req.body;
    if (isNaN(id)) {
      return res.status(400).send({ massage: "invalid id" });
    }
    const client = await pool.query(
      `
        update client set client_last_name=$1,client_first_name=$2,client_phone_number=$3,client_info=$4,client_photo=$5 where id = $6 returning *
        `,
      [
        client_last_name,
        client_first_name,
        client_phone_number,
        client_info,
        client_photo,
        id,
      ]
    );
    if (client.rowCount == 0) {
      return res.status(400).send({ massage: "id is not defined" });
    }
    console.log(client);
    res.status(200).send(client.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json("Serverda xatolik");
  }
};
const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
      return res.status(400).send({ massage: "invalid id" });
    }
    const client = await pool.query(
      `
      delete from client where id = $1
      `,
      [id]
    );
    if (client.rowCount == 0) {
      return res.status(400).send({ massage: "id is not defined" });
    }
    res.status(200).send("Successfully deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("Serverda xatolik");
  }
};

module.exports = {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
};
