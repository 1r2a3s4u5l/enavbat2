const { Router } = require("express");
const {
  // addOtp,
  // getOtp,
  // updateOtp,
  // deleteOtp,
  // getOtpById,
  newOtp, verifyOtp,
} = require("../controllers/otp.controller");

const router = Router();

router.post("/newotp", newOtp);
router.post("/verify", verifyOtp);
// router.delete("/delete/:id", deleteOtp);
// router.get("/:id", getOtpById);

module.exports = router;
