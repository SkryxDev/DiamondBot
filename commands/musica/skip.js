const Discord = require("discord.js")

module.exports = {
    name: "skip",
    description: "Skippare la canzone seguente",
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({content: "Devi essere in un canale vocale", ephemeral: true})
        }

        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return interaction.reply({content: "Qualun'altro sta già ascoltando della musica", ephemeral: true})
        }

        try {
            distube.skip(interaction)
                .catch(() => { return interaction.reply({content: "Nessuna canzone in riproduzione o canzone successiva non presente", ephemeral: true}) })
        } catch {
            return interaction.reply({content: "Nessuna canzone in riproduzione o canzone successiva non presente", ephemeral: true})
        }

        interaction.reply({ content: "Canzone skippata", ephemeral: true })
    }
}