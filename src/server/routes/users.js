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
router.patch("/changePassword/:id", authJwt, UserControler.changePassword)
router.post("/:id/follow", authJwt, UserControler.followUser)
router.post("/:id/unfollow", authJwt, UserControler.unfollowUser)

module.exports = router