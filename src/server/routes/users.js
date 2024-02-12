const express = require("express")
const UserControler = require("../../controllers/user.controller")

const router = express.Router()

router.get("/", UserControler.index)
router.get("/:id", UserControler.show)

module.exports = router