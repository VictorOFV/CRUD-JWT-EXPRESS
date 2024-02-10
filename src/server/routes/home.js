const express = require("express")

const router = express.Router()

router.get("/", (request, response) => {
    response.status(200).json({ message: "Ok" })
})

module.exports = router