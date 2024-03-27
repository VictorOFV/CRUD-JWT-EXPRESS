const { Router } = require("express")
const { uploadAvatarAndBanner } = require("../middlewares/multerFiles")
const UserControler = require("../../controllers/User.controller")
const authJwt = require("../middlewares/authJwt")

const router = Router()

router.get("/", authJwt, UserControler.index)
router.get("/:username", authJwt, UserControler.show)
router.post("/", UserControler.store)
router.delete("/:id", authJwt, UserControler.delete)
router.put("/:id", authJwt, uploadAvatarAndBanner, UserControler.update)
router.patch("/:id/changePassword", authJwt, UserControler.changePassword)
router.post("/:id/follow", authJwt, UserControler.followUser)
router.delete("/:id/unfollow", authJwt, UserControler.unfollowUser)
router.post("/:id/comment", authJwt, UserControler.createComment)

module.exports = router