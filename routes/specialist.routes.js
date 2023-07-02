const { Router } = require("express");
const {
  addSpecialist,
  getSpecialist,
  updateSpecialist,
  deleteSpecialist,
  getSpecialistById,
} = require("../controllers/specialist.controller");

const router = Router();

router.post("/add", addSpecialist);
router.get("/", getSpecialist);
router.put("/:id", updateSpecialist);
router.delete("/:id", deleteSpecialist);
router.get("/:id", getSpecialistById);

module.exports = router;
