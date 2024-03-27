const { Router } = require("express")
const CommentController = require("../../controllers/Comment.controller")

const router = Router()

router.post("/", CommentController)

module.exports = router