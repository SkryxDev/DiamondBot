const Discord = require("discord.js")

module.exports = {
    name: "stop",
    description: "Fermare la queue",
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
            distube.stop(interaction)
                .catch(() => { return interaction.reply({content: "Nessuna canzone in riproduzione", ephemeral: true}) })
        } catch {
            return interaction.reply({content: "Nessuna canzone in riproduzione", ephemeral: true})
        }

        interaction.reply({content: "Queue fermata", ephemeral: true})
    }
}