const Discord = require("discord.js")
const db = require("../../models/moderation.model")
const ms = require("ms")
const channels = require("../../json/channels.json")

module.exports = {
    name: "tempban",
    description: "Tempbannare un utente",
    options: [
        {
            name: "user",
            description: "Utente da tempbannare",
            type: "USER",
            required: true
        },
        {
            name: "time",
            description: "Tempo del ban",
            type: "STRING",
            required: true
        },
        {
            name: "reason",
            description: "Reason del tempban",
            type: "STRING",
            required: true
        }
    ],
    onlyStaff: true,
    async execute(interaction) {
        const user = interaction.options.getUser("user")
        const member = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")
        let time = interaction.options.getString("time")
        time = ms(time)

        let embed = new Discord.MessageEmbed()
            .setTitle("⚠️TEMP-BAN⚠️")
            .setDescription(`Hai temp-bannato correttamente ${user.tag}`)
            .addFields({ name: "🛡️ Moderator", value: `<@${interaction.user.id}>` }, { name: "🙍 Utente", value: `<@${user.id}>` }, { name: "Reason", value: reason }, { name: "Time", value: time})
            .setThumbnail(user.displayAvatarURL())
            .setColor("RED")
        interaction.reply({ embeds: [embed] })

        let embedlog = new Discord.MessageEmbed()
            .setTitle("⚠️TEMP-BAN⚠️")
            .setDescription(`L' utente \`${user.tag}\` è stato temp-bannato da \`${interaction.user.tag}\`, per \`${reason}\``)
            .setColor("RED")
            .setThumbnail(user.displayAvatarURL())
        client.channels.cache.get(channels.logs.main).send({ embeds: [embedlog] })

        let userembed = new Discord.MessageEmbed()
            .setTitle("Sei stato tempbannato!")
            .setDescription("Sei stato tempbannato da **" + interaction.guild.name +"**")
            .addFields({ name: "🛡️ Moderator", value: `<@${interaction.user.id}>` }, { name: "🙍 Utente", value: `<@${user.id}>` }, { name: "Reason", value: reason }, { name: "Time", value: time})
        await user.send({ embeds: [userembed] })

        const data = await db.findOne({ userId: user.id })
        if(!data) {
            const newTBan = new db({
                userId: user.id,
                time: time/1000,
                reason: reason
            })
            newTBan.save()
        }
        if(data) return interaction.reply({ content: "L'utente è già tempbannato", ephemeral: true })

        member.ban({ reason: reason })
    }
}