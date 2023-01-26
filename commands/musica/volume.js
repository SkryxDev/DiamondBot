module.exports = {
    name: "volume",
    description: "Impostare il volume della playlist",
    options: [
        {
            name: "volume",
            description: "Volume da impostare",
            type: "NUMBER",
            required: true
        }
    ],
    async execute(interaction) {
        const queue = distube.getQueue(interaction)
        const volume = interaction.options.getNumber("volume")
        if(volume > 300) interaction.reply({ content: "Non puoi impostare un volume maggiore di 300%", ephemeral: true})
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({content: "Devi essere in un canale vocale", ephemeral: true})
        }

        const voiceChannelBot = interaction.guild.channels.cache.find(x => x.type == "GUILD_VOICE" && x.members.has(client.user.id))
        if (voiceChannelBot && voiceChannel.id != voiceChannelBot.id) {
            return interaction.reply({content: "Qualun'altro sta già ascoltando della musica", ephemeral: true})
        }

        if(!queue) return interaction.reply({ content: "Non ci sono canzoni in riproduzione", ephemeral: true })

        queue.setVolume(volume)

        interaction.reply({ content: `Volume impostato a \`${volume}\`` })
    }
}