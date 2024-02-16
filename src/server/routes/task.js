const { Router } = require("express")
const TaskController = require("../../controllers/Task.controller")

const router = Router()

router.get("/", TaskController.index)
router.get("/:id", TaskController.show)
router.post("/", TaskController.store)
router.delete("/:id", TaskController.delete)
router.put("/:id", TaskController.update)

module.exports = router