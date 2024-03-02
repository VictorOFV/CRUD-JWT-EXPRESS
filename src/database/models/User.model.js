const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date },
    gender: { type: String },
    bio: { type: String },
    avatar: { type: String },
    banner: { type: String }
})

userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password; // Remove o campo password ao serializar para JSON
        return ret;
    }
});

const User = mongoose.model("User", userSchema)

module.exports = User