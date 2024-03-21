const Checklist = require("../database/models/Checklist.model");
const Task = require("../database/models/Task.model");
const { NotFoundApiError } = require("../utils/ApiErrors");
const deleteFile = require("../utils/deleteFile");
const checklistValidation = require("../validations/checklistValidation");
const idValidation = require("../validations/idValidation");
const imageValidation = require("../validations/imagesValidation");

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
        const checklistData = checklistValidation.parse(request.body)

        if (request.files) {
            const files = request.files;

            for (let file in files) {
                files[file].map(fileInfo => {
                    const { path } = imageValidation.parse(fileInfo)
                    checklistData[file] = path
                })
            }
        }

        checklistData.createdAt = new Date()

        const checklist = await (await new Checklist(checklistData).save()).populate("author")
        response.status(201).json({ checklist })
    }

    static async update(request, response) {
        const { id } = idValidation.parse(request.params)
        const { name, description, priority } = checklistValidation.parse(request.body)
        const checklistData = { name, description, priority }

        if (request.files) {
            const files = request.files

            for (let file in files) {
                await Promise.all(files[file].map(async fileInfo => {
                    const { path } = imageValidation.parse(fileInfo)
                    checklistData[file] = path;
                    const checklist = await Checklist.findById(id)

                    if (checklist && checklist[file]) {
                        await deleteFile(checklist[file])
                    }
                }))
            }
        }

        const checklist = await Checklist.findByIdAndUpdate(id, checklistData, { new: true }).populate("author")

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