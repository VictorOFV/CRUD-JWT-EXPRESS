const { Router } = require("express")
const ChecklistController = require("../../controllers/Checklist.controller")
const authJwt = require("../middlewares/authJwt")
const { uploadChecklistIcon } = require("../middlewares/multerFiles")

const router = Router()

router.get("/", authJwt, ChecklistController.index)
router.get("/:id", authJwt, ChecklistController.show)
router.post("/", authJwt, uploadChecklistIcon, ChecklistController.store)
router.delete("/:id", authJwt, ChecklistController.delete)
router.put("/:id", authJwt, uploadChecklistIcon, ChecklistController.update)

module.exports = router