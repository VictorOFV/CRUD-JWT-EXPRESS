const mongoose = require("mongoose")
const Schema = mongoose.Schema

const checklistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: new Date() },
    icon: { type: String, default: null }
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;