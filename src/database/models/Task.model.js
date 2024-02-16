const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    checklist: { type: Schema.Types.ObjectId, ref: "Checklist" }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;