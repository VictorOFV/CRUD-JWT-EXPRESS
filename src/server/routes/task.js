const { Router } = require("express")
const TaskController = require("../../controllers/Task.controller")
const authJwt = require("../middlewares/authJwt")

const router = Router()

router.get("/", authJwt, TaskController.index)
router.get("/:id", authJwt, TaskController.show)
router.post("/", authJwt, TaskController.store)
router.delete("/:id", authJwt, TaskController.delete)
router.put("/:id", authJwt, TaskController.update)

module.exports = router