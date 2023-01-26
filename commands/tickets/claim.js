const Discord = require("discord.js")
const db = require("../../models/ticket.model")

module.exports = {
    name: "claim",
    description: "[STAFF] Claimare un ticket",
    onlyStaff: true,
    async execute(interaction) {
        const data = await db.findOne({ userId: interaction.channel.topic.slice(9) })

        db.updateOne({ id: interaction.channel.name.slice(7) }, {$set: { claimed: interaction.user.id }}).catch(err => {console.log(err)})

        interaction.reply({ content: "Ticket claimato da <@" + interaction.user.id + ">"})
    }
}