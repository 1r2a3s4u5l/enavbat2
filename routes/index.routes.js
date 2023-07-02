const { Router } = require("express");

const clientRouter = require("./client.routes");
const otpRouter = require("./otp.routes");
const serviceRouter = require("./service.routes");
const specialistRouter = require("./specialist.routes");
const adminRouter = require("./admin.routes");
const queueRouter = require("./queue.routes");
const socialRouter = require("./social.routes");
const router = Router();

router.use("/client", clientRouter);
router.use("/otp", otpRouter);
router.use("/service", serviceRouter);
router.use("/spec", specialistRouter);
router.use("/admin", adminRouter);
router.use("/queue", queueRouter);
router.use("/social", socialRouter);

module.exports = router;
