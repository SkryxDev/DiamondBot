const Discord = require("discord.js")

module.exports = {
    name: "kick",
    description: "Kickare un utente dal server",
    onlyStaff: true,
    options: [
        {
            name: "utente",
            description: "Utente da kickare",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Motivo del kick",
            type: "STRING",
            required: true
        }
    ],
    async execute(interaction) {
        const user = interaction.options.getUser("utente")
        const member = interaction.options.getMember("utente")
        const reason = interaction.options.getString("reason")

        let embed = new Discord.MessageEmbed()
            .setTitle("⚠️Kick⚠️")
            .setDescription(`Hai kickato correttamente ${user.tag}`)
            .addFields({ name: "🛡️ Moderator", value: `<@${interaction.user.id}>` }, { name: "🙍 Utente", value: `<@${user.id}>` }, { name: "Reason", value: reason })
            .setThumbnail(user.displayAvatarURL())
            .setColor("RED")
        interaction.reply({ embeds: [embed] })

        let embedlog = new Discord.MessageEmbed()
            .setTitle("⚠️Kick⚠️")
            .setDescription(`L' utente \`${user.tag}\` è stato kickato da \`${interaction.user.tag}\`, per \`${reason}\``)
            .setColor("RED")
            .setThumbnail(user.displayAvatarURL())
        client.channels.cache.get(channels.logs.main).send({ embeds: [embedlog] })

        let userembed = new Discord.MessageEmbed()
            .setTitle("Sei stato kickato!")
            .setDescription("Sei stato kickato da **" + interaction.guild.name + "**")
            .addFields({ name: "🛡️ Moderator", value: `<@${interaction.user.id}>` }, { name: "🙍 Utente", value: `<@${user.id}>` }, { name: "Reason", value: reason })
        await user.send({ embeds: [userembed] })
        member.kick({ reason: reason })
    }
}