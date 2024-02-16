const mongoose = require("mongoose")
const Schema = mongoose.Schema

const checklistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;