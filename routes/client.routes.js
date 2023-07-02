const { Router } = require("express");
const {
  addClient,
  getClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

const router = Router();

router.post("/add", addClient);
router.get("/", getClient);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

module.exports = router;
