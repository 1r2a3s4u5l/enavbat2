const { Router } = require("express");
const {
  addQueue,
  getQueue,
  updateQueue,
  deleteQueue,
  getQueueById,
} = require("../controllers/queue.controllers");

const router = Router();

router.post("/add", addQueue);
router.get("/", getQueue);
router.put("/:id", updateQueue);
router.delete("/:id", deleteQueue);
router.get("/:id", getQueueById);

module.exports = router;
