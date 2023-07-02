const { Router } = require("express");
const { addService, getService, updateService, deleteService, getServiceById } = require("../controllers/service.controller");

const router = Router();

router.post("/add", addService);
router.get("/", getService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);
router.get("/:id", getServiceById);

module.exports = router;