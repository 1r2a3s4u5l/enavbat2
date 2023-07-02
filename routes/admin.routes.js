const { Router } = require("express");
const {
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
  getAdminById,
} = require("../controllers/admin.controller");

const router = Router();

router.post("/add", addAdmin);
router.get("/", getAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);
router.get("/:id", getAdminById);

module.exports = router;
