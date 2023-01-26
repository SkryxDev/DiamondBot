const Discord = require("discord.js")
const img = require("../../json/img.json")

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.customId == "menuticket") {
            await interaction.deferUpdate()
    
            switch (interaction.values[0]) {
                case "at": {
                    interaction.channel.permissionOverwrites.edit(interaction.user, {
                        SEND_MESSAGES: true
                    }).catch(() => {})
                    let embed = new Discord.MessageEmbed()
                        .setTitle("<a:MD_redcrown:1046893823990706176> Amministrazione")
                        .setDescription("Hai selezionato un ticket per amministrazione\nAttendi la risposta di qualcuno.")
                        .setColor("RED")
                    let button = new Discord.MessageButton()
                        .setLabel("Close")
                        .setEmoji("🔒")
                        .setCustomId("btnclose")
                        .setStyle("DANGER")
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.message.edit({ embeds: [embed], components: [row], content: "<@&1037318156332564520> <@&1063205721275121705> <@&1037318058651426856>" })
                } break
                case "dst": {
                    interaction.channel.permissionOverwrites.edit(interaction.user, {
                        SEND_MESSAGES: true
                    }).catch(() => {})
                    let embed = new Discord.MessageEmbed()
                        .setTitle("<a:MD_crown:1046893554305339512> Supporto")
                        .setDescription("Hai selezionato un ticket per supporto\nAttendi uno staffer.")
                        .setColor("AQUA")
                    let button = new Discord.MessageButton()
                        .setLabel("Close")
                        .setEmoji("🔒")
                        .setCustomId("btnclose")
                        .setStyle("DANGER")
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.message.edit({ embeds: [embed], components: [row], content: "<@&1041728281021534329>" })
                } break
                case "partnert": {
                    interaction.channel.permissionOverwrites.edit(interaction.user, {
                        SEND_MESSAGES: true
                    }).catch(() => {})
                    let embed = new Discord.MessageEmbed()
                        .setTitle("<:OH_partnership:1063198918046916700> Partner")
                        .setDescription("Hai selezionato un ticket per partnership\nAppena un partner manager ti risponde,\nmandagli in dm il link del server.")
                        .setColor("AQUA")
                    let button = new Discord.MessageButton()
                        .setLabel("Close")
                        .setEmoji("🔒")
                        .setCustomId("btnclose")
                        .setStyle("DANGER")
                    let row = new Discord.MessageActionRow()
                        .addComponents(button)
                    interaction.message.edit({ embeds: [embed], components: [row], content: "<@&1039264399258554520>" })
                } break
            }
        }
    }
}