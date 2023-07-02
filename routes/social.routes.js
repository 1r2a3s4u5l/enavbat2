const { Router } = require("express");
const {
  addSocial,
  getSocial,
  updateSocial,
  deleteSocial,
  getSocialById,
} = require("../controllers/social.controller");

const router = Router();

router.post("/add", addSocial);
router.get("/", getSocial);
router.put("/:id", updateSocial);
router.delete("/:id", deleteSocial);
router.get("/:id", getSocialById);

module.exports = router;
