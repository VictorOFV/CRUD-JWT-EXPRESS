const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, default: null },
    gender: { type: String, default: null },
    bio: { type: String, default: null },
    avatar: { type: String, default: null },
    banner: { type: String, default: null },
    createdAt: { type: Date }
})

userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password; // Remove o campo password ao serializar para JSON
        ret.avatar = ret.avatar ? `${process.env.BACKEND_DOMAIN}/${ret.avatar}` : ret.avatar;
        ret.banner = ret.banner ? `${process.env.BACKEND_DOMAIN}/${ret.banner}` : ret.banner;
        return ret;
    }
});

const User = mongoose.model("User", userSchema)

module.exports = User