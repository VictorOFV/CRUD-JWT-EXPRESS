const { Router } = require("express")
const ChecklistController = require("../../controllers/Checklist.controller")

const router = Router()

router.get("/", ChecklistController.index)
router.get("/:id", ChecklistController.show)
router.post("/", ChecklistController.store)
router.delete("/:id", ChecklistController.delete)
router.put("/:id", ChecklistController.update)

module.exports = router