const { Router } = require("express")
const CommentController = require("../../controllers/Comment.controller")
const authJwt = require("../middlewares/authJwt")

const router = Router()

router.post("/:id/reply", authJwt, CommentController.reply)
router.delete("/:id", authJwt, CommentController.delete)

module.exports = router