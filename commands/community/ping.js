module.exports = {
    name: "ping",
    description: "Ping del bot",
    execute(interaction) {
        let embed = new Discord.MessageEmbed()
            .setTitle("🤖 Ping del bot")
            .setDescription(`Il ping attuale del bot è: ${client.ws.ping}`)
        interaction.reply({embeds: [embed]})
    }
}