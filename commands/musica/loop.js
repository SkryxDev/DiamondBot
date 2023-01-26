module.exports = {
    name: "loop",
    description: "Loop music",
    async execute(interaction) {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({content: "Devi essere in un canale vocale", ephemeral: true})
        }

        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return interaction.reply({content: "Qualun'altro sta già ascoltando della musica", ephemeral: true})
        }
        const mode = distube.setRepeatMode(interaction)
        interaction.reply({ content: "Loop mode impostata, mode: " + mode, ephemeral: true })
    }
}