const express = require("express");
const router = express.Router();

const diskonController = require("../controllers/diskon.controller");

router.get("/", diskonController.getAllDiskon);
router.post("/", diskonController.addDiskon);

module.exports = router;