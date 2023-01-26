const mongoose  = require("mongoose");

const guildSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ticket: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model("guild", guildSchema)