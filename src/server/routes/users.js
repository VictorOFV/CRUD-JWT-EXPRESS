const { Router } = require("express")
const { uploadAvatar, uploadBanner } = require("../middlewares/multerFiles")
const UserControler = require("../../controllers/User.controller")
const authJwt = require("../middlewares/authJwt")

const router = Router()

router.get("/", authJwt, UserControler.index)
router.get("/:id", authJwt, UserControler.show)
router.post("/", UserControler.store)
router.delete("/:id", authJwt, UserControler.delete)
router.put("/:id", authJwt, UserControler.update)
router.post("/upload/avatar/:id", authJwt, uploadAvatar, UserControler.uploadAvatar)
router.post("/upload/banner/:id", authJwt, uploadBanner, UserControler.uploadBanner)

module.exports = router