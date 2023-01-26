const Discord = require("discord.js")
const db = require("../../models/ticket.model")

module.exports = {
    name: "add",
    description: "[STAFF] Aggiungere un utente al ticket",
    options: [
        {
            name: "user",
            description: "Tag utente da aggiungere",
            type: "USER",
            required: true
        }
    ],
    onlyStaff: true,
    async execute(interaction) {
        const user = interaction.options.getUser("user")
        if(!interaction.channel.topic.startsWith("User ID:")) {
            return interaction.reply({ content: "Non puoi eseguire questo comando qui!", ephemeral: true })
        } else {
            let idUtente = interaction.channel.topic.slice(9)
            if(interaction.user.id == idUtente || interaction.member.roles.cache.has("1041728281021534329")) {
                let haIlPermesso = interaction.channel.permissionsFor(user).has("VIEW_CHANNEL", true)
                if (haIlPermesso) {
                    message.channel.send({ content: "Questo utente ha gia accesso al ticket", ephemeral: true })
                    return
                }
                message.channel.permissionOverwrites.edit(utente, {
                    VIEW_CHANNEL: true
                })
                interaction.reply({ content: `<@${user.id}> è stato aggiunto al ticket` })
            }
        }
    }
}