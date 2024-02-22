const { Router } = require("express")
const authJwt = require("../middlewares/authJwt")

const router = Router()

router.get("/", authJwt, (request, response) => {
    response.status(200).json({ message: "Ok" })
})

module.exports = router