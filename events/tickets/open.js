const Discord = require("discord.js")
const img = require("../../json/img.json")
const db = require("../../models/ticket.model")
const guilddb = require("../../models/guild.model")
const moment = require("moment")

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if(interaction.customId == "btnticket1") {
            const data = await guilddb.findOne({ id: "1037312409058148372" })
            await guilddb.updateOne({ id: "1037312409058148372" }, {$set: { ticket: data.ticket + 1 }}).catch(err => {console.log(err)})
            const newData = new db({
                id: data.ticket,
                userId: interaction.user.id,
                oraApertura: moment().format("HH:mm:ss, DD-MM-YYYY")
            })
            newData.save()

            if (interaction.guild.channels.cache.find(canale => canale.topic == `User ID: ${interaction.user.id}`)) {
                interaction.reply({content: "Hai gia un ticket aperto", ephemeral: true})
                return
            }
            interaction.guild.channels.create("ticket-" + data.ticket, {
                type: "text",
                topic: `User ID: ${interaction.user.id}`,
                parent: "1062108062690836510",
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        deny: ["SEND_MESSAGES"]
                    },
                    {
                        id: "1041728281021534329",
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(canale => {
                let embed = new Discord.MessageEmbed()
                    .setTitle("🎫 Selezione Ticket")
                    .setDescription("Seleziona il tipo di ticket più adatto alla tua esigenza")
                    .addFields({ name: "<a:MD_redcrown:1046893823990706176> Amministrazione", value: "Ticket per supporto amministrativo" }, { name: "<a:MD_crown:1046893554305339512> Supporto DS", value: "Ticket per supporto di Discord, report o altro" }, { name: "<:OH_partnership:1063198918046916700> Partner", value: "Ticket per richiedere partnership" })
                    .setColor("RED")
                    .setThumbnail(img.logo)

                let select = new Discord.MessageSelectMenu()
                    .setCustomId("menuticket")
                    .setPlaceholder("Seleziona il ticket")
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: "Amministrazione",
                            emoji: "<a:MD_redcrown:1046893823990706176>",
                            description: "Supporto per amministrazione",
                            value: "at"
                        },
                        {
                            label: "Supporto DS",
                            emoji: "<a:MD_crown:1046893554305339512>",
                            description: "Supporto per discord",
                            value: "dst"
                        },
                        {
                            label: "Partner",
                            emoji: "<:OH_partnership:1013021360496324628>",
                            description: "Richiesta partnership",
                            value: "partnert"
                        }
                    ])
        
                let row = new Discord.MessageActionRow()
                    .addComponents(select)
                
                canale.send({ embeds: [embed], components: [row] })
                interaction.reply({content: `Ticket: <#${canale.id}>`, ephemeral: true})
            })
        }
    }
}