const { Router } = require("express")
const LoginControler = require("../../controllers/Login.controller")

const router = Router()

router.post("/", LoginControler.store)

module.exports = router