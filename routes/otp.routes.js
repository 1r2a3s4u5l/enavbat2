const { Router } = require("express");
const {
  newOtp, verifyOtp, deleteOTP, getOTPByID,
} = require("../controllers/otp.controller");

const router = Router();

router.post("/newotp", newOtp);
router.post("/verify", verifyOtp);
router.delete("/delete/:id", deleteOTP);
router.get("/:id", getOTPByID);

module.exports = router;
