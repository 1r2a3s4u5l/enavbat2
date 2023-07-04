const { Router } = require("express");
const {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");
const ClientPolice = require("../middleware/ClientPolice");

const router = Router();

router.post("/add", addClient);
router.get("/", getClient);
router.get("/:id", ClientPolice, getClientById);
router.put("/:id", ClientPolice, updateClient);
router.delete("/:id", ClientPolice, deleteClient);

module.exports = router;
