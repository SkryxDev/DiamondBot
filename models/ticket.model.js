const mongoose = require("mongoose")

const ticketSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    claimed: {
        type: String,
        required: true,
        default: "Non claimato"
    },
    oraApertura: {
        type: String,
        required: true
    },
    oraChiusura: {
        type: String,
        required: true,
        default: "Ancora non chiuso"
    },
    reason: {
        type: String,
        required: true,
        default: "Nessuna ragione"
    }
})

module.exports = new mongoose.model("ticket", ticketSchema)