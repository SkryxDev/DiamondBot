const mongoose = require("mongoose")

const modSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true,
        default: "No reason"
    }
})

module.exports = new mongoose.model("moderation", modSchema)