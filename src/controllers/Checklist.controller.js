const Checklist = require("../database/models/Checklist.model");
const Task = require("../database/models/Task.model");
const { NotFoundApiError } = require("../utils/ApiErrors");
const checklistValidation = require("../validations/checklistValidation");
const idValidation = require("../validations/idValidation");

class ChecklistController {

    static async index(request, response) {
        const checklists = await Checklist.find({}).populate(["author"])
        response.status(200).json({ checklists })
    }

    static async show(request, response) {
        const { id } = idValidation.parse(request.params)
        const checklist = await Checklist.findById(id).populate(["tasks", "author"])

        if (!checklist) throw new NotFoundApiError("Checklist não encontrado.")
        response.status(200).json({ checklist })
    }

    static async store(request, response) {
        const { name, description, author } = checklistValidation.parse(request.body)
        const checklist = await new Checklist({ name, description, author }).save()
        response.status(201).json({ checklist })
    }

    static async update(request, response) {
        const { id } = idValidation.parse(request.params)
        const { name, description } = checklistValidation.parse(request.body)
        const checklist = await Checklist.findByIdAndUpdate(id, { name, description }, { new: true })

        if (!checklist) throw new NotFoundApiError("Checklist não encontrado.")
        response.status(200).json({ checklist })
    }

    static async delete(request, response) {
        const { id } = idValidation.parse(request.params)
        const checklist = await Checklist.findByIdAndDelete(id)

        if (!checklist) throw new NotFoundApiError("Checklist não encontrado.")
        
        await Task.deleteMany({ checklist: id })
        response.status(200).json({ checklist })
    }
}

module.exports = ChecklistController