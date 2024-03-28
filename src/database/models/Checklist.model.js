const mongoose = require("mongoose")
const Schema = mongoose.Schema

const checklistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    priority: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: new Date() },
    icon: { type: String, default: null },
    createdAt: { type: Date, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
});

checklistSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        ret.icon = ret.icon ? `${process.env.BACKEND_DOMAIN}/${ret.icon}` : ret.icon
        return ret;
    }
});

const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;