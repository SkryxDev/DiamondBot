const Discord = require("discord.js")
const db = require("../../models/userstats.model")

module.exports = {
    name: "rank",
    description: "Rank di un utente",
    options: [
        {
            name: "utente",
            description: "Utente da visualizzare il rank",
            required: false,
            type: "USER"
        }
    ],
    async execute(interaction) {
        let user = interaction.options.getUser("utente")
        if(!user) user = interaction.user
        const data = await db.findOne({ userId: user.id })

        let embed = new Discord.MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL())
            .setTitle("⭐ RANK ⭐")
            .setColor("AQUA")
            .setDescription("Ecco a te il ranking di " + user.tag)
            .addFields({ name: "🍪 XP", value: `${data.xp}`, inline: true }, { name: "🌟 Level", value: `${data.level}`, inline: true })

        interaction.reply({ embeds: [embed] })
    }
}