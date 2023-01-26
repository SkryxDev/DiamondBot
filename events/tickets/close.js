const discordTranscripts = require('discord-html-transcripts')
const Discord = require("discord.js")
const db = require("../../models/ticket.model")
const moment = require("moment")
const img = require("../../json/img.json")

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if(interaction.customId == "btnclose") {
            const channel = interaction.channel

            const attachment = await discordTranscripts.createTranscript(channel);

            client.channels.cache.get("1049076428005724170").send({
                content: channel.name,
                files: [attachment]
            })
            channel.delete()

            const userId = interaction.channel.topic.slice(9)
            const user = interaction.guild.members.cache.get(userId)

            const data = await db.findOne({ id: interaction.channel.name.slice(7) })
            
            db.updateOne({ id: interaction.channel.name.slice(7) }, {$set: { oraChiusura: moment().format("HH:mm:ss, DD-MM-YYYY")}}).catch(err => console.log(err)).then(async () => {
                let embed = new Discord.MessageEmbed()
                .setTitle("🎫 Ticket")
                .setDescription(`<@${interaction.user.id}> ha chiuso il tuo ticket`)
                .addFields({ name: `🔒 Chiuso da:`, value: `<@${interaction.user.id}>`, inline: true }, { name: `🔓 Ora apertura: `, value: `${data.oraApertura}`, inline: true }, { name: `🙍 Claimato da:  `, value: `${data.claimed == "Non claimato" ? `Non claimato`: `<@${data.claimed}>`}`, inline: false }, { name: "💎 Reason: ", value: `${data.reason}`})
                .setFooter("MoodDiamond Bot", img.logo)
                .setColor("BLURPLE")
                .setThumbnail(img.logo)
                user.user.send({ embeds: [embed] })
            })
        }
    }
}