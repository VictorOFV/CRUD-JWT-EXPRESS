const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    done: { type: Boolean, default: false },
    checklist: { type: Schema.Types.ObjectId, ref: "Checklist", required: true },
    createdAt: { type: Date, default: new Date() },
    image: { type: String }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;