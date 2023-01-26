const Discord = require("discord.js")
const img = require("../../json/img.json")

module.exports = {
    name: "ticket",
    description: "[STAFF] Creare un pannello ticket",
    onlyOwner: true,
    async execute(interaction) {
        let embed = new Discord.MessageEmbed()  
            .setTitle("💎 | MoodDiamond Ticket")
            .setDescription("Clicca il bottone sottostante\nper aprire un ticket")
            .setColor("BLUE")
            .setFooter(img.logo, "MoodDiamond Ticket Bot")
        let button = new Discord.MessageButton()
            .setTitle("Apri un Ticket")
            .setCustomId("btnticket1")
            .setStyle("PRIMARY")
            .setEmoji("🎫")
        let row = new Discord.MessageActionRow()
            .addComponents(button)
        await interaction.deferUpdate()
        interaction.reply({ embeds: [embed], components: [row] })
    }
}