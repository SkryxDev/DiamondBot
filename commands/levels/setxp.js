const Discord = require("discord.js")
const db = require("../../models/userstats.model")

module.exports = {
    name: "setxp",
    description: "Settare XP ad un utente",
    onlyStaff: true,
    options: [
        {
            name: "remove",
            description: "Rimuovi xp a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi rimuovere l'xp",
                    type: "USER",
                    required: true
                },
                {
                    name: "xp",
                    description: "Punti xp da rimuovere",
                    type: "NUMBER",
                    required: true
                }
            ]
        },
        {
            name: "set",
            description: "Settare xp a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi settare l'xp",
                    type: "USER",
                    required: true,
                },
                {
                    name: "xp",
                    description: "Punti xp da settare",
                    type: "NUMBER",
                    required: true
                }
            ]
        },
        {
            name: "add",
            description: "Aggiungere xp a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi aggiungere l'xp",
                    type: "USER",
                    required: true,
                },
                {
                    name: "xp",
                    description: "Punti xp da aggiungere",
                    type: "NUMBER",
                    required: true
                }
            ]
        }
    ],
    async execute(interaction) {
        const user = interaction.options.getUser("user")
        const xp = interaction.options.getNumber("xp")
        const data = await db.findOne({ userId: user.id })

        if(interaction.options.getSubcommand() == "remove") {
            db.updateOne({ userId: user.id }, {$set: { xp: data.xp - xp }}).catch(function(error) {console.log(error)})

            interaction.reply({ content: `Hai rimosso \`${xp}\` a \`${user.username}\``})
        }
        if(interaction.options.getSubcommand() == "add") {
            db.updateOne({ userId: user.id }, {$set: { xp: data.xp + xp }}).catch(function(error) {console.log(error)})

            interaction.reply({ content: `Hai aggiunto \`${xp}\` a \`${user.username}\``})
        }
        if(interaction.options.getSubcommand() == "set") {
            db.updateOne({ userId: user.id }, {$set: { xp: xp }}).catch(function(error) {console.log(error)})

            interaction.reply({ content: `Hai impostato \`${xp}\` a \`${user.username}\``})
        }
    }
}