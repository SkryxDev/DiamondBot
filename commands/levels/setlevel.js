const Discord = require("discord.js")
const db = require("../../models/userstats.model")

module.exports = {
    name: "setlevel",
    description: "Modificare i livelli di un utente",
    options: [
        {
            name: "remove",
            description: "Rimuovi livelli a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi rimuovere i livelli",
                    type: "USER",
                    required: true
                },
                {
                    name: "levels",
                    description: "Livelli da rimuovere",
                    type: "NUMBER",
                    required: true
                }
            ]
        },
        {
            name: "set",
            description: "Settare livelli a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi settare i livelli",
                    type: "USER",
                    required: true
                },
                {
                    name: "levels",
                    description: "Livelli da settare",
                    type: "NUMBER",
                    required: true
                }
            ]
        },
        {
            name: "add",
            description: "Aggiungere livelli a un utente",
            type: "SUB_COMMAND",
            required: false,
            options: [
                {
                    name: "user",
                    description: "Utente a cui vuoi aggiungere i livelli",
                    type: "USER",
                    required: true
                },
                {
                    name: "levels",
                    description: "Livelli da aggiungere",
                    type: "NUMBER",
                    required: true
                }
            ]
        }
    ],
    onlyStaff: true,
    async execute(interaction) {
        const user = interaction.options.getUser("user")
        const data = await db.findOne({ userId: user.id })
        const levels = interaction.options.getNumber("levels")

        if (interaction.options.getSubcommand() == "remove") {
            db.updateOne({ userId: user.id }, {$set: { level: data.level - levels }}).catch(function(error) {console.log(error)})
            db.updateOne({ userId: user.id }, {$set: { xp: calcoloXpNecessario(data.level - levels) }}).catch(function(error) {console.log(error)})
            interaction.reply({ content: `Hai rimosso \`${levels}\` a \`${user.username}\`` })
        }
        if (interaction.options.getSubcommand() == "add") {
            db.updateOne({ userId: user.id }, {$set: { level: data.level + levels }}).catch(function(error) {console.log(error)})
            db.updateOne({ userId: user.id }, {$set: { xp: calcoloXpNecessario(data.level + levels) }}).catch(function(error) {console.log(error)})
            interaction.reply({ content: `Hai aggiunto \`${levels}\` a \`${user.username}\`` })
        }
        if (interaction.options.getSubcommand() == "set") {
            db.updateOne({ userId: user.id }, {$set: { level: levels }}).catch(function(error) {console.log(error)})
            db.updateOne({ userId: user.id }, {$set: { xp: calcoloXpNecessario(levels) }}).catch(function(error) {console.log(error)})
            interaction.reply({ content: `Hai impostato \`${levels}\` a \`${user.username}\`` })
        }
    }
}
function calcoloXpNecessario(level) {
    let xp = 0
    for (let i = 0; i <= level; i++) {
        xp += 50 * i
        if (i > 15)
            xp += 40 * (i - 15)
    }
    return xp
}