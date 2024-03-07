const Checklist = require("../database/models/Checklist.model")
const Task = require("../database/models/Task.model")
const { NotFoundApiError } = require("../utils/ApiErrors")
const idValidation = require("../validations/idValidation")
const taskValidation = require("../validations/taskValidation")

class TaskController {

    static async index(request, response) {
        const tasks = await Task.find({})
        response.status(200).json({ tasks })
    }

    static async show(request, response) {
        const { id } = idValidation.parse(request.params)
        const task = await Task.findById(id)

        if (!task) throw new NotFoundApiError("Task não encontrada.")
        response.status(200).json({ task })
    }

    static async store(request, response) {
        const taskData = taskValidation.parse(request.body)
        const checkListExist = await Checklist.findById(taskData.checklist)

        if (!checkListExist) throw new NotFoundApiError("Checklist não encontrada.")

        taskData.createdAt = new Date()

        const task = await new Task(taskData).save()
        checkListExist.tasks.push(task._id)
        await checkListExist.save()

        response.status(201).json({ task })
    }

    static async update(request, response) {
        const { id } = idValidation.parse(request.params)
        const { name, description, done } = taskValidation.parse(request.body)
        const task = await Task.findByIdAndUpdate(id, { name, description, done }, { new: true })

        if (!task) throw new NotFoundApiError("A task não foi encontrada.")
        response.status(200).json({ task })
    }

    static async delete(request, response) {
        const { id } = idValidation.parse(request.params)
        const task = await Task.findByIdAndDelete(id)

        if (!task) throw new NotFoundApiError("Task não encontrada.")

        await Checklist.updateMany({ tasks: id }, { $pull: { tasks: id } });
        response.status(200).json({ task })
    }
}

module.exports = TaskController