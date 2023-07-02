const { Router } = require("express");
const {
  addOtp,
  getOtp,
  updateOtp,
  deleteOtp,
  getOtpById,
} = require("../controllers/otp.controller");

const router = Router();

router.post("/add", addOtp);
router.get("/", getOtp);
router.put("/:id", updateOtp);
router.delete("/:id", deleteOtp);
router.get("/:id", getOtpById);

module.exports = router;
