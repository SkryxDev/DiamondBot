const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    cooldownXp: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model("userstat", userSchema)